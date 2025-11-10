/* LEEWAY HEADER
TAG: HOOKS.TTS
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: mic
ICON_SIG: CD534113
5WH: WHAT=Browser text-to-speech hook with Azure and Gemini fallbacks;
WHY=Provide reliable narration for Agent Lee using local voices first, then cloud voices when the browser engine fails;
WHO=Leeway Industries;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\useTTS.ts;
WHEN=2025-11-09;
HOW=Detect silent SpeechSynthesis failures, then use Azure or Gemini TTS via REST and Web Audio;
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { filterCuratedVoices } from '../utils/voiceCurated';

/**
 * Supported engines for text-to-speech. The hook will attempt to use the
 * browser SpeechSynthesis API first. If that fails, it can fall back to
 * Azure Cognitive Services or Google Gemini TTS depending on configuration.
 * Optionally integrates Orpheus TTS via a backend API.
 */
export type Engine = 'browser' | 'azure' | 'gemini' | 'orpheus';

/**
 * Configuration options for the useTTS hook. Users may supply callbacks for
 * completion or error events, specify a preferred local voice, and override
 * cloud voice selections. Azure and Gemini configuration objects allow
 * selecting different voices or models at runtime.
 */
export interface UseTTSOptions {
  onEnded?: () => void;
  /** Called when an internal error occurs (API/network failure). */
  onError?: (e: unknown) => void;
  /**
   * Called when the browser SpeechSynthesis API fails to start speaking. In
   * prior versions this was named onFailure; both callbacks will be invoked
   * when a local TTS failure is detected. Use onError for network/cloud
   * errors.
   */
  onFailure?: () => void;
  /**
   * A user-selected local voice name. Use this instead of preferredVoice to
   * align with existing consumers (e.g. Chatbot). Both properties are
   * equivalent; if both are provided, selectedVoice takes precedence.
   */
  selectedVoice?: string;
  /**
   * Preferred local voice name. Superseded by selectedVoice if provided.
   */
  preferredVoice?: string;
  azure?: {
    /** Azure voice short name, e.g. "en-US-JennyNeural" */
    voice?: string;
    /** Azure expressive style if supported by the selected voice */
    style?: string;
  };
  gemini?: {
    /** Gemini prebuilt voice name, e.g. "Kore" */
    voice?: string;
    /** Gemini model name, e.g. "gemini-2.5-flash-preview-tts" */
    model?: string;
  };
  orpheus?: {
    /** Orpheus backend model id, e.g. "canopylabs/orpheus-tts-0.1-finetune-prod" */
    model?: string;
    /** Orpheus voice name, e.g. "tara" | "leah" | "jess" | "leo" | "dan" | "mia" | "zac" | "zoe" */
    voice?: string;
  };
}

/**
 * Primary hook that exposes text-to-speech functionality. It returns
 * `play` and `stop` functions, along with state flags and the active engine
 * selector. When called, it attempts to speak via the browser first; if
 * speech fails to start properly, it automatically falls back to Azure or
 * Gemini depending on available credentials. Developers can also force
 * a particular engine by calling `setEngine`.
 */
export function useTTS(opts: UseTTSOptions = {}) {
  const { onEnded, onError } = opts;

  // Default engine from env if provided
  const envDefaultEngine = ((import.meta as any).env?.VITE_TTS_DEFAULT_ENGINE || 'browser') as Engine;
  const validEngines = new Set<Engine>(['browser','azure','gemini','orpheus']);
  const initialEngine: Engine = validEngines.has(envDefaultEngine) ? envDefaultEngine : 'browser';
  const engineLock = String((import.meta as any).env?.VITE_TTS_ENGINE_LOCK || '').toLowerCase() === 'true';
  const voiceLock = String((import.meta as any).env?.VITE_TTS_VOICE_LOCK || '').toLowerCase() === 'true';
  const [engine, setEngineState] = useState<Engine>(initialEngine);
  const setEngine = (e: Engine) => {
    if (engineLock) return; // ignore external attempts when locked
    setEngineState(e);
  };
  // Whether audio is currently playing.
  const [isPlaying, setIsPlaying] = useState(false);
  // Whether audio is currently loading (cloud fetch in progress).
  const [isLoading, setIsLoading] = useState(false);

  // Web Audio context and nodes for cloud playback.
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const srcRef = useRef<AudioBufferSourceNode | null>(null);

  // Cancellation flag for async playback. When true, playback loops should abort.
  const cancelRef = useRef<boolean>(false);
  // Marks that a user gesture occurred; browsers require this to start audio.
  const userGestureRef = useRef<boolean>(false);

  // ---------------------------------------------------------------------------
  // SpeechSynthesis voice management
  // ---------------------------------------------------------------------------
  /**
   * List of available voices on the client. Populated asynchronously when
   * voices become available. Consumers can use this to present voice choices.
   */
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  /** Flag that becomes true once voices have loaded. */
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load voices on mount. When voices change, update our state.
  useEffect(() => {
    const loadVoices = () => {
      try {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        const vs = window.speechSynthesis.getVoices();
        if (vs && vs.length > 0) {
          setAvailableVoices(vs);
          setVoicesLoaded(true);
        }
      } catch {
        // ignore
      }
    };
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  /** Ensure that an AudioContext exists and is running. */
  const ensureAudioContext = () => {
    if (!audioCtxRef.current) {
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
      audioCtxRef.current = new Ctx();
      gainRef.current = audioCtxRef.current.createGain();
      gainRef.current.gain.value = 1.0;
      gainRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current!.state === 'suspended') {
      audioCtxRef.current!.resume?.();
    }
  };

  /** Stop any ongoing speech or cloud playback. */
  const stop = useCallback(() => {
    cancelRef.current = true;
    // Cancel browser TTS if available
    try {
      window.speechSynthesis?.cancel();
    } catch {}
    // Stop cloud playback
    try {
      srcRef.current?.stop();
    } catch {}
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  // --------------------------------------------------------------------------------------
  // Browser SpeechSynthesis API
  // --------------------------------------------------------------------------------------
  /**
   * Attempt to speak using the browser SpeechSynthesis API. If the utterance
   * fails to start (onstart never fires or onend fires immediately), this
   * function resolves with `false` to signal failure. Otherwise it resolves
   * with `true` after the utterance completes.
   *
   * @param text Text to speak.
   */
  const speakWithBrowser = useCallback(async (text: string): Promise<boolean> => {
    // Sanitize input: remove markdown symbols, emoji, asterisks, colons wrapping emoji codes, and most punctuation that harms natural prosody.
    const sanitizeForTTS = (raw: string) => {
      let s = raw;
      // Remove markdown emphasis markers * _ ~ backticks
      s = s.replace(/[\*_~`]+/g, '');
      // Remove :emoji_code: patterns
      s = s.replace(/:[a-zA-Z0-9_+-]+:/g, ' ');
      // Remove standalone unicode emoji (basic range + presentation modifiers)
      s = s.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, ' ');
      // Collapse multiple punctuation runs like "!!!" or "...?" to a single period
      s = s.replace(/[.!?]{2,}/g, '.');
      // Remove stray periods at line starts
      s = s.replace(/\n\./g, '\n');
      // Remove repeated spaces
      s = s.replace(/\s{2,}/g, ' ');
      // Trim residual punctuation at start/end
      s = s.replace(/^[\s.,;:!?-]+|[\s.,;:!?-]+$/g, '');
      return s.trim();
    };
    text = sanitizeForTTS(text);
    // Split into small, safe chunks to avoid onerror on long utterances
    const sentenceChunks = (() => {
      const maxLen = 280; // conservative to avoid engine glitches
      const parts: string[] = [];
      const sentences = text
        .replace(/\s+/g, ' ')
        .split(/([.!?]\s)/) // keep delimiters
        .reduce<string[]>((acc, cur, i, arr) => {
          if (/([.!?]\s)/.test(cur)) {
            if (acc.length === 0) acc.push(arr[i - 1] + cur);
            else acc[acc.length - 1] = (acc[acc.length - 1] || '') + cur;
          } else if (cur.trim()) {
            acc.push(cur);
          }
          return acc;
        }, [])
        .filter(s => s.trim());
      // Re-chunk to maxLen
      for (const s of sentences) {
        if (s.length <= maxLen) { parts.push(s); continue; }
        let i = 0;
        while (i < s.length) { parts.push(s.slice(i, i + maxLen)); i += maxLen; }
      }
      return parts;
    })();

    return new Promise<boolean>((resolve) => {
      try {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
          resolve(false);
          return;
        }
        const synth = window.speechSynthesis;
        // Cancel any existing utterances
        synth.cancel();
        cancelRef.current = false;

        // Choose a voice. Prefer the selectedVoice from options if provided,
        // otherwise fall back to preferredVoice. Then choose a local English
        // voice or any English voice if nothing matches. Finally pick the
        // default voice.
  const voices = synth.getVoices();
  const curated = filterCuratedVoices(voices);
        let voice: SpeechSynthesisVoice | null = null;
  const envSelectedVoice = (import.meta as any).env?.VITE_TTS_SELECTED_VOICE || (window as any).TTS_SELECTED_VOICE;
  const lsSelectedVoice = (() => { try { return window.localStorage?.getItem('agentLee.voice') || ''; } catch { return ''; } })();
  // If voiceLock is enabled, we ignore runtime/local selections and force env voice.
  const desiredName: string | undefined = voiceLock ? envSelectedVoice : (opts.selectedVoice || opts.preferredVoice || lsSelectedVoice || envSelectedVoice);
        if (desiredName) {
          // Try exact match first
          voice = voices.find((v) => v.name === desiredName) || null;
          // Fuzzy match if exact not found (case-insensitive contains)
          if (!voice) {
            const needle = desiredName.toLowerCase();
            voice = voices.find((v) => v.name.toLowerCase().includes(needle)) || null;
          }
        }
        // Prefer curated Microsoft Natural Online voices if available
        if (!voice && curated.length > 0) {
          voice = curated[0];
        }
        if (!voice) {
          // Prefer local English voices
          voice = voices.find((v) => v.localService && /en-/i.test(v.lang)) || null;
        }
        if (!voice) {
          voice = voices.find((v) => /en-/i.test(v.lang)) || null;
        }
        if (!voice && voices.length > 0) voice = voices[0];

        // Helper to speak a single chunk and await its completion
        const speakChunk = (chunk: string) => new Promise<boolean>((res) => {
          const utter = new SpeechSynthesisUtterance(chunk);
          if (voice) utter.voice = voice;
          utter.rate = 1.0; utter.pitch = 1.0; utter.volume = 1.0;
          let started = false;
          const startTime = performance.now();
          utter.onstart = () => { started = true; setIsPlaying(true); };
          utter.onend = () => {
            setIsPlaying(false);
            const elapsed = performance.now() - startTime;
            res(started && elapsed >= 50);
          };
          utter.onerror = (e) => { setIsPlaying(false); onError?.(e); res(false); };
          synth.speak(utter);
          // Guard for slow starts
          const startGuardMs = 1500;
          setTimeout(() => {
            if (!started) { try { if (!synth.speaking && !synth.pending) synth.cancel(); } catch {} res(false); }
          }, startGuardMs);
        });

        // Many browsers require a user gesture to initiate speech
        if (!userGestureRef.current) { resolve(false); return; }

        (async () => {
          let anyStarted = false;
          for (const chunk of sentenceChunks) {
            if (cancelRef.current) break;
            const ok = await speakChunk(chunk);
            if (ok) anyStarted = true; else { /* continue with next chunk */ }
          }
          if (!anyStarted) { opts.onFailure?.(); resolve(false); }
          else { onEnded?.(); resolve(true); }
        })();
      } catch (e) {
          onError?.(e);
          resolve(false);
      }
    });
  }, [opts.preferredVoice, onEnded, onError]);

  // --------------------------------------------------------------------------------------
  // Azure Cognitive Services TTS
  // --------------------------------------------------------------------------------------
  /** Retrieve Azure TTS configuration from environment or overrides. */
  const getAzureConfig = () => {
    const keyRaw = (import.meta as any).env?.VITE_AZURE_TTS_KEY || (window as any).AZURE_TTS_KEY;
    const key = (keyRaw && typeof keyRaw === 'string' && !/^REPLACE_/i.test(keyRaw)) ? keyRaw : '';
    const region = (import.meta as any).env?.VITE_AZURE_TTS_REGION || (window as any).AZURE_TTS_REGION;
    const voice = opts.azure?.voice || (import.meta as any).env?.VITE_AZURE_TTS_VOICE || 'en-US-JennyNeural';
    const style = opts.azure?.style || (import.meta as any).env?.VITE_AZURE_TTS_STYLE || 'general';
    return { key, region, voice, style };
  };

  /**
   * Build SSML for Azure. Azure voices accept SSML with expressive styles.
   */
  const buildAzureSSML = (text: string, voice: string, style: string) => {
    const escape = (s: string) =>
      s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    return `<?xml version="1.0"?>\n<speak version="1.0" xml:lang="en-US">\n  <voice name="${voice}">\n    <prosody rate="0%" pitch="0%">\n      <mstts:express-as style="${style}" xmlns:mstts="https://www.w3.org/2001/mstts">\n        ${escape(text)}\n      </mstts:express-as>\n    </prosody>\n  </voice>\n</speak>`;
  };

  /**
   * Fetch a single chunk of audio from Azure in MP3 format. Throws on error.
   */
  const fetchAzure = async (text: string): Promise<ArrayBuffer> => {
    const { key, region, voice, style } = getAzureConfig();
    if (!key || !region) throw new Error('Missing Azure TTS configuration');
    const ssml = buildAzureSSML(text, voice, style);
    const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      },
      body: ssml,
    });
    if (!res.ok) throw new Error(`Azure TTS HTTP ${res.status}`);
    return await res.arrayBuffer();
  };

  /** Split long text into chunks that fit within Azure and Gemini limits. */
  const chunkify = (text: string, maxLen: number = 2800) => {
    const chunks: string[] = [];
    let i = 0;
    while (i < text.length) {
      chunks.push(text.slice(i, i + maxLen));
      i += maxLen;
    }
    return chunks;
  };

  /**
   * Play an ArrayBuffer of audio data using Web Audio. Uses decodeAudioData for MP3
   * from Azure and manual PCM conversion for Gemini. The sampleRate argument
   * should reflect the audio's true sample rate; for MP3 decodeAudioData will
   * infer this automatically.
   */
  const playAudioData = async (buf: ArrayBuffer, sampleRate?: number) => {
    ensureAudioContext();
    const ctx = audioCtxRef.current!;
    let audioBuf: AudioBuffer;
    if (sampleRate) {
      // Raw PCM data: convert Int16 → Float32
      const int16 = new Int16Array(buf);
      audioBuf = ctx.createBuffer(1, int16.length, sampleRate);
      const channel = audioBuf.getChannelData(0);
      for (let i = 0; i < int16.length; i++) {
        channel[i] = int16[i] / 32768;
      }
    } else {
      // Use decodeAudioData for compressed formats (MP3)
      audioBuf = await ctx.decodeAudioData(buf.slice(0));
    }
    if (cancelRef.current) return;
    const src = ctx.createBufferSource();
    src.buffer = audioBuf;
    srcRef.current = src;
    src.connect(gainRef.current!);
    return new Promise<void>((resolve) => {
      src.onended = () => resolve();
      src.start();
    });
  };

  /**
   * Speak text via Azure. Splits long text into chunks. Returns true on success
   * or false on cancellation or error.
   */
  const speakWithAzure = useCallback(async (text: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      cancelRef.current = false;
      const chunks = chunkify(text, 2800);
      for (const chunk of chunks) {
        if (cancelRef.current) break;
        const buf = await fetchAzure(chunk);
        if (cancelRef.current) break;
        setIsPlaying(true);
        await playAudioData(buf);
      }
      setIsPlaying(false);
      setIsLoading(false);
      if (!cancelRef.current) onEnded?.();
      return !cancelRef.current;
    } catch (e) {
      setIsPlaying(false);
      setIsLoading(false);
      onError?.(e);
      return false;
    }
  }, [onEnded, onError]);

  // --------------------------------------------------------------------------------------
  // Gemini TTS via Google Generative API
  // --------------------------------------------------------------------------------------
  /** Retrieve Gemini configuration from environment or overrides. */
  const getGeminiConfig = () => {
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY;
    const model = opts.gemini?.model || (import.meta as any).env?.VITE_GEMINI_MODEL || 'gemini-2.5-flash-preview-tts';
    const voice = opts.gemini?.voice || (import.meta as any).env?.VITE_GEMINI_VOICE || 'Kore';
    return { apiKey, model, voice };
  };

  /**
   * Fetch a single chunk of PCM audio from Gemini. Returns raw PCM data as
   * ArrayBuffer (16‑bit signed, sample rate 24000). Throws on error.
   */
  const fetchGemini = async (text: string): Promise<ArrayBuffer> => {
    const { apiKey, model, voice } = getGeminiConfig();
    if (!apiKey) throw new Error('Missing Gemini API key');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const body: any = {
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voice,
            },
          },
        },
      },
      model,
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Gemini TTS HTTP ${res.status}`);
    const json = await res.json();
    const data: string | undefined = json?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!data) throw new Error('Gemini TTS: no audio data returned');
    // Base64‑decode the string into a Uint8Array
    const binaryString = atob(data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  /**
   * Speak text via Gemini. Splits long text into chunks and plays PCM data.
   * Returns true on success or false on cancellation or error.
   */
  const speakWithGemini = useCallback(async (text: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      cancelRef.current = false;
      // Gemini models accept reasonably large inputs; 2000 chars per chunk is safe
      const chunks = chunkify(text, 2000);
      for (const chunk of chunks) {
        if (cancelRef.current) break;
        const pcm = await fetchGemini(chunk);
        if (cancelRef.current) break;
        setIsPlaying(true);
        // Gemini outputs raw 16‑bit PCM at 24kHz
        await playAudioData(pcm, 24000);
      }
      setIsPlaying(false);
      setIsLoading(false);
      if (!cancelRef.current) onEnded?.();
      return !cancelRef.current;
    } catch (e) {
      setIsPlaying(false);
      setIsLoading(false);
      onError?.(e);
      return false;
    }
  }, [onEnded, onError]);

  // --------------------------------------------------------------------------------------
  // Orpheus TTS (via backend API proxy)
  // --------------------------------------------------------------------------------------
  /** Retrieve Orpheus configuration from environment or overrides. */
  const getOrpheusConfig = () => {
    const endpoint = (import.meta as any).env?.VITE_ORPHEUS_API_URL || (window as any).ORPHEUS_API_URL || '';
    const apiKey = (import.meta as any).env?.VITE_ORPHEUS_API_KEY || (window as any).ORPHEUS_API_KEY || '';
    const model = opts.orpheus?.model || (import.meta as any).env?.VITE_ORPHEUS_MODEL || 'canopylabs/orpheus-tts-0.1-finetune-prod';
    const voice = opts.orpheus?.voice || (import.meta as any).env?.VITE_ORPHEUS_VOICE || 'tara';
    return { endpoint, apiKey, model, voice };
  };

  /**
   * Fetch a chunk of audio from an Orpheus proxy API.
   * Expected JSON response structure:
   * { audio: "<base64 PCM 16-bit 24kHz>" }
   * The server is responsible for running the model and returning base64 data.
   */
  const fetchOrpheus = async (text: string): Promise<ArrayBuffer> => {
    const { endpoint, apiKey, model, voice } = getOrpheusConfig();
    if (!endpoint) throw new Error('Missing Orpheus API endpoint (VITE_ORPHEUS_API_URL)');
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ text, model, voice }),
    });
    if (!res.ok) throw new Error(`Orpheus TTS HTTP ${res.status}`);
    const json = await res.json();
    const b64 = json?.audio;
    if (!b64 || typeof b64 !== 'string') throw new Error('Orpheus TTS: invalid audio payload');
    const bin = atob(b64);
    const len = bin.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer;
  };

  /** Speak via Orpheus backend, streaming not yet supported client-side. */
  const speakWithOrpheus = useCallback(async (text: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      cancelRef.current = false;
      // Chunk length conservative (model max len 2048 tokens; approximate 1500 chars)
      const chunks = chunkify(text, 1500);
      for (const chunk of chunks) {
        if (cancelRef.current) break;
        const buf = await fetchOrpheus(chunk);
        if (cancelRef.current) break;
        setIsPlaying(true);
        // Orpheus returns raw PCM 16-bit @24kHz
        await playAudioData(buf, 24000);
      }
      setIsPlaying(false);
      setIsLoading(false);
      if (!cancelRef.current) onEnded?.();
      return !cancelRef.current;
    } catch (e) {
      setIsPlaying(false);
      setIsLoading(false);
      onError?.(e);
      return false;
    }
  }, [onEnded, onError]);

  // --------------------------------------------------------------------------------------
  // Final minimal audible indicator (beep) when all engines fail.
  // --------------------------------------------------------------------------------------
  /**
   * Play a short oscillator beep (~360ms) as a last‑resort audible indicator
   * that the audio subsystem is alive even though TTS failed. This helps
   * differentiate "no audio path" vs "TTS service failed" in diagnostics.
   */
  const beepFallback = useCallback(async (): Promise<void> => {
    try {
      ensureAudioContext();
      const ctx = audioCtxRef.current!;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      // Shaped envelope: quick attack, decay to near silence.
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.type = 'sine';
      osc.frequency.value = 660; // Attention‑grabbing pitch.
      osc.connect(gain).connect(ctx.destination);
      await new Promise<void>((resolve) => {
        osc.onended = () => resolve();
        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      });
    } catch {
      // ignore – beep is best‑effort only.
    }
  }, []);

  // --------------------------------------------------------------------------------------
  // Public play function
  // --------------------------------------------------------------------------------------
  /**
   * Primary play function exposed by the hook. It attempts to speak using the
   * selected engine. If the engine is 'browser', it will attempt to speak via
   * SpeechSynthesis and, upon failure, fall back to Azure or Gemini depending
   * on available credentials. If the engine is 'azure' or 'gemini', it
   * directly invokes the respective cloud functions.
   *
   * @param text String to speak.
   */
  const play = useCallback(async (text: string): Promise<boolean> => {
    cancelRef.current = false;
    userGestureRef.current = true; // mark that a user action triggered play

    // Trim whitespace
    const basicTrim = text?.trim();
    // Reuse the same sanitizer used in browser path to be engine-agnostic
    const sanitize = (raw: string) => {
      let s = raw;
      s = s.replace(/[\*_~`]+/g, '');
      s = s.replace(/:[a-zA-Z0-9_+-]+:/g, ' ');
      s = s.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, ' ');
      s = s.replace(/[.!?]{2,}/g, '.');
      s = s.replace(/\n\./g, '\n');
      s = s.replace(/\s{2,}/g, ' ');
      s = s.replace(/^[\s.,;:!?-]+|[\s.,;:!?-]+$/g, '');
      return s.trim();
    };
    const trimmed = basicTrim ? sanitize(basicTrim) : basicTrim;
    if (!trimmed) {
      onEnded?.();
      return true;
    }

    if (engine === 'browser') {
      const ok = await speakWithBrowser(trimmed);
      if (ok) return true;
      // Respect env flag for cloud fallback (and engine lock)
      const allowFallback = !engineLock && String((import.meta as any).env?.VITE_TTS_FALLBACK_ON_FAILURE || '').toLowerCase() === 'true';
      if (!allowFallback) {
        await beepFallback();
        opts.onFailure?.();
        onEnded?.();
        return false;
      }
      // Browser failed and fallback allowed; decide order: Azure then Gemini
      const { key, region } = getAzureConfig();
      const { apiKey } = getGeminiConfig();
      if (key && region) {
        setEngineState('azure');
        return await speakWithAzure(trimmed);
      }
      if (apiKey) {
        setEngineState('gemini');
        return await speakWithGemini(trimmed);
      }
      // No cloud credentials available — emit a diagnostic beep so the user
      // hears SOMETHING and can distinguish a silent failure from an audio
      // pipeline issue. Treat as ended so UI flow can proceed.
      await beepFallback();
      opts.onFailure?.();
      onEnded?.();
      return false;
    }
    if (engine === 'azure') {
      return await speakWithAzure(trimmed);
    }
    if (engine === 'gemini') {
      return await speakWithGemini(trimmed);
    }
    if (engine === 'orpheus') {
      return await speakWithOrpheus(trimmed);
    }
    return false;
  }, [engine, speakWithBrowser, speakWithAzure, speakWithGemini, speakWithOrpheus, beepFallback, onEnded, opts]);

  // Cleanup: stop any audio when component unmounts
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return useMemo(() => ({
    play,
    stop,
    isPlaying,
    isLoading,
    engine,
  setEngine: engineLock ? (() => {}) : setEngine,
    availableVoices,
    voicesLoaded,
  }), [play, stop, isPlaying, isLoading, engine, availableVoices, voicesLoaded]);
}