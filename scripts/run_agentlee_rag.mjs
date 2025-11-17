#!/usr/bin/env node
// Terminal Agent Lee RAG responder (lightweight, offline)
// Loads the in-memory docStore and answers queries using local evidence snippets.
import fs from 'fs';
import path from 'path';
import { _dumpDocs, addDocument, search } from '../models/docStore.js';

const tests = [
  { id: 3, query: 'founding covenant underground 1975' },
  { id: 5, query: 'CCTV inspection defect types' },
  { id: 9, query: 'three-phase modernization AI Inspection ServiceTitan ERP' },
  { id: 17, query: 'growth thesis 2024 2027 projections' },
  { id: 22, query: 'evidence references where to find sources' },
  { id: 10, query: 'resilience framework weatherization supply chain' }
];

function snippet(text, max = 300) {
  if (!text) return '';
  const s = text.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  return s.slice(0, max) + '...';
}

function formatAgentAnswer(query, hits) {
  if (!hits || hits.length === 0) {
    return `Agent Lee: I couldn't find local data for "${query}". I can search external sources or the deck narratives — would you like me to do that?`;
  }

  // Build a concise summary using top hits
  const top = hits[0];
  const docs = hits.map((h, i) => `- ${i + 1}. doc=${h.id} score=${h.score.toFixed(3)} snippet: ${snippet(h.text, 180)}`).join('\n');
  const summary = `Agent Lee (LOCAL DATA & EVIDENCE): I found ${hits.length} local source(s) related to "${query}". Top source: ${top.id} (score=${top.score.toFixed(3)}).\n\nSources and snippets:\n${docs}\n\nSuggested next step: ask a chart-specific question or request numeric extraction from the files listed above.`;
  return summary;
}

(async function run() {
  console.log('\n=== Agent Lee RAG Terminal Responder (offline) ===\n');
  // show doc count
  try {
    let docs = _dumpDocs();
    // If docstore empty in Node, try loading files from public/data (same behavior as test_rag_simple)
    if (!docs || docs.length === 0) {
      const baseDir = path.resolve('.');
      const publicData = path.join(baseDir, 'public', 'data');
      if (fs.existsSync(publicData)) {
        const files = fs.readdirSync(publicData).filter((f) => f.endsWith('.csv') || f.endsWith('.json') || f.endsWith('.xlsx'));
        for (const f of files) {
          try {
            const txt = fs.readFileSync(path.join(publicData, f), 'utf8');
            const id = f.replace(/\.[^.]+$/, '');
            addDocument(id, txt);
            console.log(`[run_agentlee_rag] loaded ${f} as ${id}`);
          } catch (e) {
            console.warn(`[run_agentlee_rag] failed to load ${f}:`, e.message || e);
          }
        }
      }
      docs = _dumpDocs();
    }
    console.log(`DocStore contains ${docs.length} documents (preview):`);
    docs.slice(0, 6).forEach((d) => console.log(` - ${d.id} (tokens: ${d.tokenCount})`));
  } catch (e) {
    console.warn('Could not dump docs:', e.message || e);
  }

  for (const t of tests) {
    console.log(`\n--- Query (slide ${t.id}) : ${t.query}`);
    try {
      const hits = await search(t.query, 6);
      if (!hits || hits.length === 0) {
        console.log(formatAgentAnswer(t.query, hits));
      } else {
        console.log(formatAgentAnswer(t.query, hits));
      }
    } catch (e) {
      console.error('Search error:', e.message || e);
    }
  }

  console.log('\n=== Done ===\n');
  process.exit(0);
})();
