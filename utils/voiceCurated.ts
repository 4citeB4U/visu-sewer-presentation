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
  // en-US
  'Ana', 'Andrew', 'Aria', 'Ava', 'Brian', 'Christopher', 'Emma', 'Eric', 'Guy', 'Jenny', 'Michelle', 'Roger', 'Steffan'
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
 * Pick the first curated voice available, or undefined if none.
 */
export function pickFirstCurated(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const filtered = filterCuratedVoices(voices);
  return filtered.length > 0 ? filtered[0] : undefined;
}
