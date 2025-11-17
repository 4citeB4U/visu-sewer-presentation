/* LEEWAY HEADER
TAG: UTIL.VOICES.CURATED
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: audio-lines
ICON_SIG: CD534113
5WH: WHAT=Curated Microsoft Natural voice whitelist and helpers;
WHY=Ensure only approved voices are selectable and auto-saved across the presentation;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\utils\voiceCurated.ts;
WHEN=2025-11-09;
HOW=Filter SpeechSynthesis voices by a whitelist of base names (case-insensitive) and locales;
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

/** Base display names we allow from Microsoft Natural Online voices. */
export const curatedBaseNames = [
  // en-GB
  'Libby', 'Maisie', 'Ryan', 'Sonia', 'Thomas',
  // en-US (Microsoft + common names)
  'Ana', 'Andrew', 'Aria', 'Ava', 'Brian', 'Christopher', 'Emma', 'Eric', 'Guy', 'Jenny', 'Michelle', 'Roger', 'Steffan',
  // Other common natural-sounding voice names across browsers/OS
  'Alex', 'Samantha', 'Daniel', 'Fiona', 'Google US English', 'Google UK English', 'Zira', 'David', 'Mark', 'Angel V'
];

/** Allowed locales for curated voices. */
const allowedLocales = ['en-US', 'en-GB'];

/** True if a SpeechSynthesisVoice matches our curated Microsoft Natural Online list. */
export function isCuratedMicrosoftNatural(v: SpeechSynthesisVoice): boolean {
  const name = (v?.name || '').toLowerCase();
  const lang = (v?.lang || '').toLowerCase();
  // Must be Microsoft Natural Online
  const isMsNatural = name.includes('microsoft') && name.includes('natural') && name.includes('online');
  if (!isMsNatural) return false;
  // Locale check
  const localeOk = allowedLocales.some(loc => lang.includes(loc.toLowerCase()));
  if (!localeOk) return false;
  // Base name whitelist
  const hasCuratedBase = curatedBaseNames.some(b => name.includes(b.toLowerCase()));
  return hasCuratedBase;
}

/**
 * Filter a list of available voices down to our curated Microsoft Natural voices
 * and sort them in the order of curatedBaseNames for a consistent UI.
 */
export function filterCuratedVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  const filtered = (voices || []).filter(isCuratedMicrosoftNatural);
  const indexOfBase = (voice: SpeechSynthesisVoice) => {
    const n = (voice.name || '').toLowerCase();
    for (let i = 0; i < curatedBaseNames.length; i++) {
      if (n.includes(curatedBaseNames[i].toLowerCase())) return i;
    }
    return Number.MAX_SAFE_INTEGER; // unknowns sorted to end
  };
  return filtered.sort((a, b) => indexOfBase(a) - indexOfBase(b));
}

/**
 * Broader curated filter that recognizes non-Microsoft natural voices
 * (Google, Apple, other OS names) by matching against curatedBaseNames
 * or by language locality for en-US/en-GB.
 */
export function filterCuratedCrossBrowser(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  const v = voices || [];
  const filtered = v.filter((voice) => {
    const name = (voice.name || '').toLowerCase();
    const lang = (voice.lang || '').toLowerCase();
    // Match if the name contains any curated base name
    for (const base of curatedBaseNames) {
      if (name.includes(base.toLowerCase())) return true;
    }
    // Accept high-quality en-US/en-GB voices that appear to be local or online
    if (lang.startsWith('en-us') || lang.startsWith('en-gb')) return true;
    return false;
  });
  // Sort by presence in curated list first, then by locale match
  filtered.sort((a, b) => {
    const ai = curatedBaseNames.findIndex(x => a.name.toLowerCase().includes(x.toLowerCase()));
    const bi = curatedBaseNames.findIndex(x => b.name.toLowerCase().includes(x.toLowerCase()));
    if (ai !== bi) return (ai === -1 ? Number.MAX_SAFE_INTEGER : ai) - (bi === -1 ? Number.MAX_SAFE_INTEGER : bi);
    // fallback: prefer en-US
    const aLang = (a.lang || '').toLowerCase().startsWith('en-us') ? 0 : 1;
    const bLang = (b.lang || '').toLowerCase().startsWith('en-us') ? 0 : 1;
    return aLang - bLang;
  });
  return filtered;
}

/**
 * Pick the best available voice from the browser voices using the curated
 * cross-browser list as primary preference, then any en-US local voice,
 * then the first available voice as a last resort.
 */
export function pickBestVoice(voices: SpeechSynthesisVoice[], preferredName?: string): SpeechSynthesisVoice | undefined {
  if (!voices || voices.length === 0) return undefined;
  // If the caller provided a preferredName, try exact then fuzzy matches
  if (preferredName) {
    const exact = voices.find(v => v.name === preferredName);
    if (exact) return exact;
    const fuzzy = voices.find(v => v.name.toLowerCase().includes(preferredName.toLowerCase()));
    if (fuzzy) return fuzzy;
  }
  // 1) curated cross-browser
  const curated = filterCuratedCrossBrowser(voices);
  if (curated.length > 0) return curated[0];
  // 2) any en-US local service voice
  const enLocal = voices.find(v => v.localService && /en-/i.test(v.lang));
  if (enLocal) return enLocal;
  // 3) any en-US voice
  const en = voices.find(v => /en-/i.test(v.lang));
  if (en) return en;
  // 4) fallback first
  return voices[0];
}

/**
 * Pick the first curated voice available, or undefined if none.
 */
export function pickFirstCurated(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const filtered = filterCuratedVoices(voices);
  return filtered.length > 0 ? filtered[0] : undefined;
}
