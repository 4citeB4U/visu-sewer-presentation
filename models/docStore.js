// Minimal in-memory docStore used for dev and lightweight builds
// Provides `addDocument(docId, text)` and `search(query, limit)` used by agentTeam.retrieveLocalData
const docs = [];

function normalizeText(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokensFrom(s) {
  const n = normalizeText(s);
  if (!n) return [];
  return n.split(' ').filter(Boolean);
}

/**
 * Add a document into the in-memory store.
 * Stores normalized tokens and header tokens for better matching.
 * @param {string} id
 * @param {string} text
 */
export function addDocument(id, text) {
  if (!id || typeof text !== 'string') return;
  const normalized = normalizeText(text);
  const tokens = tokensFrom(normalized);
  // attempt to extract a header line (useful for CSVs)
  const firstLine = String(text).split(/\r?\n/)[0] || '';
  const headerTokens = tokensFrom(firstLine);
  docs.push({ id, text, normalized, tokens, tokenSet: new Set(tokens), headerTokens, headerSet: new Set(headerTokens) });
}

/**
 * Token-overlap + position-aware search. Returns array of { id, text, score }.
 */
export async function search(query, limit = 6) {
  if (!query || !query.trim()) return [];
  const qNorm = normalizeText(query);
  const qTokens = tokensFrom(qNorm);
  if (qTokens.length === 0) return [];

  const scored = docs
    .map((d) => {
      // token overlap score
      let overlap = 0;
      for (const t of qTokens) if (d.tokenSet.has(t)) overlap++;

      // header match bonus
      let headerBonus = 0;
      for (const t of qTokens) if (d.headerSet.has(t)) headerBonus += 0.5;

      // position bonus: find first occurrence index of the query string (if any)
      const idx = d.normalized.indexOf(qNorm);
      const posScore = idx === -1 ? 0 : 1 / (1 + idx);

      // fallback: if no token overlap but substring exists, still score
      const substringPresent = d.normalized.indexOf(qNorm) !== -1;

      const base = overlap + headerBonus;
      const score = base > 0 ? base * (1 + posScore) : (substringPresent ? 0.5 * (1 + posScore) : 0);
      return { id: d.id, text: d.text, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

// For debugging in the console
export function _dumpDocs() {
  return docs.map((d) => ({ id: d.id, textPreview: d.text.slice(0, 200), tokenCount: d.tokens.length }));
}
