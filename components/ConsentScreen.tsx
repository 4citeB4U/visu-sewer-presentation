/* LEEWAY HEADER
TAG: UI.COMPONENT.CONSENT
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: shield-check
ICON_SIG: CD534113
5WH: WHAT=Data consent + TTS voice chooser (Microsoft US Natural);
WHY=Let user pick voice before entering the deck;
WHO=LeeWay Industries + VisuSewer;
WHERE=components/ConsentScreen.tsx;
WHEN=2025-11-09;
HOW=React + Web Speech API + LocalStorage
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * ConsentScreen.tsx
 * Blocks the app until the user reviews and accepts the consent notice.
 * Persists: vsw.consent, agentLee.voice, agentLee.mic
 *
 * Props:
 *  - onAccept?: () => void
 *  - onDecline?: () => void
 *
 * Styling: TailwindCSS utility classes (falls back gracefully if Tailwind isn’t present).
 */

type Props = {
  onAccept?: () => void;
  onDecline?: () => void;
};

type VoiceInfo = {
  name: string;
  lang: string;
  voice?: SpeechSynthesisVoice;
};

const CONSENT_KEY = "vsw.consent";
const VOICE_KEY = "agentLee.voice";
const MIC_KEY = "agentLee.mic";

// Only allow selection from the exact voice names shown in the image
const allowedVoiceNames = [
  "Microsoft Ava Online (Natural)",
  "Microsoft Andrew Online (Natural)",
  "Microsoft Emma Online (Natural)",
  "Microsoft Brian Online (Natural)",
  "Microsoft Ana Online (Natural)",
  "Microsoft AndrewMultilingual Online (Natural)",
  "Microsoft Aria Online (Natural)",
  "Microsoft AvaMultilingual Online (Natural)",
  "Microsoft BrianMultilingual Online (Natural)",
  "Microsoft Christopher Online (Natural)",
  "Microsoft EmmaMultilingual Online (Natural)",
  "Microsoft Eric Online (Natural)",
  "Microsoft Guy Online (Natural)",
  "Microsoft Jenny Online (Natural)",
  "Microsoft Michelle Online (Natural)",
  "Microsoft Roger Online (Natural)",
  "Microsoft Steffan Online (Natural)"
];

const msNaturalMatcher = (v: SpeechSynthesisVoice) => {
  return allowedVoiceNames.includes(v.name) && (v.lang || "").toLowerCase() === "en-us";
};

const enUSMatcher = (v: SpeechSynthesisVoice) =>
  (v.lang || "").toLowerCase().startsWith("en-us");

export default function ConsentScreen({ onAccept, onDecline }: Props) {
  const [agree, setAgree] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  // Default to Eric Online (Natural)
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("Microsoft Eric Online (Natural)");
  const [loadingVoices, setLoadingVoices] = useState(true);
  const [testing, setTesting] = useState(false);
  const [micAllowed, setMicAllowed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(MIC_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [micError, setMicError] = useState<string | null>(null);
  const [rate, setRate] = useState(1.35);
  const [pitch, setPitch] = useState(0.65);
  const [showDetails, setShowDetails] = useState(false);

  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load persisted voice selection if present.
  useEffect(() => {
    try {
      const savedVoice = localStorage.getItem(VOICE_KEY);
      if (savedVoice) setSelectedVoiceName(savedVoice);
    } catch {}
  }, []);

  // Voice loader: handles late population of voices in many browsers.
  useEffect(() => {
    let cancelled = false;

    const load = () => {
      try {
        const list = window.speechSynthesis?.getVoices?.() || [];
        if (!cancelled) {
          setVoices(list);
          setLoadingVoices(false);
          // Auto-select: prefer Microsoft Natural en-US, else any en-US, else first.
          if (!selectedVoiceName && list.length) {
            const preferred = list.find(msNaturalMatcher)
              || list.find(enUSMatcher)
              || list[0];
            if (preferred) {
              setSelectedVoiceName(preferred.name);
              try {
                localStorage.setItem(VOICE_KEY, preferred.name);
              } catch {}
            }
          }
        }
      } catch {
        if (!cancelled) {
          setVoices([]);
          setLoadingVoices(false);
        }
      }
    };

    // Initial try.
    load();

    // Some engines populate asynchronously.
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const handler = () => load();
      (window.speechSynthesis as any).onvoiceschanged = handler;

      // Fallback retry in case the event doesn't fire.
      const t = setTimeout(load, 750);
      return () => {
        cancelled = true;
        (window.speechSynthesis as any).onvoiceschanged = null;
        clearTimeout(t);
      };
    }
  }, [selectedVoiceName]);

  const voiceOptions: VoiceInfo[] = useMemo(() => {
    const mapped = voices.map((v) => ({ name: v.name, lang: v.lang, voice: v }));
    const msNatural = mapped.filter((v) => v.voice && msNaturalMatcher(v.voice));
    const enUS = mapped.filter((v) => v.voice && enUSMatcher(v.voice));
    // Deduplicate while keeping preferred ordering: Microsoft/Natural first, then other en-US, then everything else.
    const seen = new Set<string>();
    const ordered: VoiceInfo[] = [];
    for (const group of [msNatural, enUS, mapped]) {
      for (const v of group) {
        if (!seen.has(v.name)) {
          seen.add(v.name);
          ordered.push(v);
        }
      }
    }
    return ordered;
  }, [voices]);

  const selectedVoice = useMemo(
    () => voices.find((v) => v.name === selectedVoiceName),
    [voices, selectedVoiceName]
  );

  const handleTestVoice = async () => {
    if (!selectedVoice) return;
    try {
      setTesting(true);
      if (utterRef.current) {
        window.speechSynthesis.cancel();
        utterRef.current = null;
      }
      const u = new SpeechSynthesisUtterance(
        "Hello. This is the selected voice. Your settings will be applied immediately."
      );
      u.voice = selectedVoice;
      u.rate = rate;
      u.pitch = pitch;
      utterRef.current = u;
      u.onend = () => setTesting(false);
      u.onerror = () => setTesting(false);
      window.speechSynthesis.speak(u);
    } catch {
      setTesting(false);
    }
  };

  const handleStopTest = () => {
    try {
      window.speechSynthesis.cancel();
      setTesting(false);
    } catch {}
  };

  const handlePersistVoice = (name: string) => {
    setSelectedVoiceName(name);
    try {
      localStorage.setItem(VOICE_KEY, name);
    } catch {}
  };

  const handleRequestMic = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately stop to avoid holding the device open.
      stream.getTracks().forEach((t) => t.stop());
      setMicAllowed(true);
      try {
        localStorage.setItem(MIC_KEY, "true");
      } catch {}
    } catch (err: any) {
      setMicAllowed(false);
      setMicError(err?.message || "Microphone access was denied.");
      try {
        localStorage.setItem(MIC_KEY, "false");
      } catch {}
    }
  };

  const handleAccept = () => {
    if (!agree) return;
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({
          ts: new Date().toISOString(),
          agreed: true,
          voice: selectedVoiceName || null,
          mic: micAllowed || false,
          version: 1,
        })
      );
    } catch {}
    onAccept?.();
  };

  const handleDecline = () => {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {}
    onDecline?.();
  };

  // Minimal runtime diagnostics (harmless in production)
  useEffect(() => {
    try {
      console.assert(typeof window !== "undefined", "Window missing");
      console.assert(
        typeof window.speechSynthesis !== "undefined",
        "speechSynthesis missing"
      );
    } catch {}
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Consent and permissions"
    >
      <div className="max-w-4xl w-full rounded-2xl bg-white text-gray-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
          <h2 className="text-xl font-semibold">
            Consent & Settings — Presentation Access
          </h2>
          <span
            className={`inline-flex items-center gap-2 text-xs px-2 py-1 rounded ${
              micAllowed ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
            }`}
            title={micAllowed ? "Microphone enabled" : "Microphone disabled"}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                micAllowed ? "bg-emerald-500" : "bg-gray-400"
              }`}
            />
            Mic {micAllowed ? "Ready" : "Off"}
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6 max-h-[70vh] overflow-auto">
          <section aria-labelledby="overview">
            <h3 id="overview" className="font-semibold text-lg mb-2">
              Quick Overview
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-6">
              <li>
                This deck runs fully in your browser. It may use{" "}
                <strong>text-to-speech</strong> for narration and can optionally use your{" "}
                <strong>microphone</strong> when you explicitly allow it.
              </li>
              <li>
                Your selections are stored <strong>locally only</strong> (no cloud upload) to
                improve your experience.
              </li>
              <li>
                You can change or revoke permissions at any time from Settings.
              </li>
            </ul>
          </section>

          {/* Voice Selection */}
          <section aria-labelledby="voice" className="border rounded-lg p-4">
            <h3 id="voice" className="font-semibold mb-1">
              Voice (Microsoft “Natural” – English, United States preferred)
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Pick a speaking voice. We prioritize Microsoft “Natural” en-US voices. If not
              available on this device, we’ll list other en-US options, then all voices.
            </p>

            <div className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="grow">
                <label htmlFor="voiceSelect" className="text-sm font-medium">
                  Select voice
                </label>
                <select
                  id="voiceSelect"
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  disabled={loadingVoices || voiceOptions.length === 0}
                  value={selectedVoiceName}
                  onChange={(e) => handlePersistVoice(e.target.value)}
                >
                  {loadingVoices && <option>Loading voices…</option>}
                  {!loadingVoices && voiceOptions.length === 0 && (
                    <option>No voices detected</option>
                  )}
                  {!loadingVoices &&
                    voiceOptions.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} {v.lang ? `• ${v.lang}` : ""}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-md border px-3 py-2 text-sm"
                  onClick={handleTestVoice}
                  disabled={!selectedVoice || testing}
                >
                  {testing ? "Testing…" : "Test Voice"}
                </button>
                <button
                  type="button"
                  className="rounded-md border px-3 py-2 text-sm"
                  onClick={handleStopTest}
                >
                  Stop
                </button>
              </div>
            </div>

            {/* Rate & Pitch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium">Rate: {rate.toFixed(2)}</label>
                <input
                  type="range"
                  min={0.5}
                  max={1.5}
                  step={0.05}
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full"
                  title="Speech rate"
                  aria-label="Speech rate"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Pitch: {pitch.toFixed(2)}</label>
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.05}
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full"
                  title="Speech pitch"
                  aria-label="Speech pitch"
                />
              </div>
            </div>
          </section>

          {/* Microphone */}
          <section aria-labelledby="microphone" className="border rounded-lg p-4">
            <h3 id="microphone" className="font-semibold mb-1">
              Microphone (optional)
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Enable this only if you want voice input for Q&amp;A or commands. You can turn
              this off later.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={`rounded-md border px-3 py-2 text-sm ${
                  micAllowed ? "bg-emerald-50 border-emerald-300" : ""
                }`}
                onClick={handleRequestMic}
              >
                {micAllowed ? "Re-check Microphone" : "Enable Microphone"}
              </button>
              {micError && <span className="text-xs text-red-600">{micError}</span>}
            </div>
          </section>

          {/* Full Consent Notice */}
          <section aria-labelledby="notice" className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 id="notice" className="font-semibold">
                Full consent notice
              </h3>
              <button
                type="button"
                className="text-sm underline"
                onClick={() => setShowDetails((s) => !s)}
              >
                {showDetails ? "Hide details" : "Show details"}
              </button>
            </div>

            <div className={`${showDetails ? "block" : "hidden"} mt-3 space-y-4 text-sm`}>
              <div>
                <h4 className="font-medium">What this deck does</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Renders an investor/operations presentation and optional AI narration in
                    your browser.
                  </li>
                  <li>
                    May generate charts/animations; no personal analytics or tracking is sent
                    to a server.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Data handling & storage</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Stores small preferences locally: consent, voice choice, mic flag.
                  </li>
                  <li>
                    Keys used: <code>vsw.consent</code>, <code>agentLee.voice</code>,{" "}
                    <code>agentLee.mic</code>.
                  </li>
                  <li>
                    No uploads occur without an explicit, separate action you initiate.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Microphone & speech</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Narration uses your device’s built-in text-to-speech (“voices”).
                  </li>
                  <li>
                    Microphone access is requested only when you press “Enable Microphone.”
                  </li>
                  <li>
                    You can revoke access in your browser/site permissions anytime.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Your controls</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Change voice at any time; test before use.</li>
                  <li>Print a copy of this notice for your records.</li>
                  <li>Decline to exit; Accept to proceed.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Risks & limitations</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Voice availability varies by OS/Browser; Microsoft “Natural” voices may
                    not be present on all devices.
                  </li>
                  <li>
                    Browser updates or corporate policies can affect TTS or mic access.
                  </li>
                  <li>
                    This deck does not replace official corporate policy or binding legal
                    agreements.
                  </li>
                </ul>
              </div>
            </div>

            {/* Agree checkbox */}
            <div className="mt-4 flex items-start gap-3">
              <input
                id="agree"
                type="checkbox"
                className="mt-1"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label htmlFor="agree" className="text-sm">
                I have read and understand the above. I consent to local storage of my
                preferences and optional use of device text-to-speech and microphone as I
                enable them.
              </label>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-sm underline"
              onClick={() => window.print()}
            >
              Print this notice
            </button>
            <button
              type="button"
              className="text-sm underline"
              onClick={() => {
                // Try to refresh voices manually in case the list was empty on load.
                if (typeof window !== "undefined" && "speechSynthesis" in window) {
                  // Trigger a benign speak/cancel to encourage population in some engines.
                  try {
                    const u = new SpeechSynthesisUtterance(" ");
                    window.speechSynthesis.speak(u);
                    window.speechSynthesis.cancel();
                  } catch {}
                  // Force a re-pull:
                  const list = window.speechSynthesis.getVoices();
                  setVoices(list);
                }
              }}
            >
              Refresh voices
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-md border px-4 py-2 text-sm"
              onClick={handleDecline}
            >
              Decline
            </button>
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm text-white ${
                agree ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!agree}
              onClick={handleAccept}
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ConsentScreen };

