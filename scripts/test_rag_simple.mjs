import fs from 'fs';
import path from 'path';
import url from 'url';

const baseDir = path.resolve('.');
const publicData = path.join(baseDir, 'public', 'data');

async function loadDocStore() {
  const modUrl = url.pathToFileURL(path.join(baseDir, 'models', 'docStore.js')).href;
  const docStore = await import(modUrl);
  const addDocument = docStore.addDocument;
  const files = fs.readdirSync(publicData).filter(f => f.endsWith('.csv') || f.endsWith('.json') || f.endsWith('.xlsx'));
  for (const f of files) {
    try {
      const txt = fs.readFileSync(path.join(publicData, f), 'utf8');
      const id = f.replace(/\.[^.]+$/, '');
      addDocument(id, txt);
      console.log(`[test_rag_simple] loaded ${f} as ${id}`);
    } catch (e) {
      console.warn(`[test_rag_simple] failed to load ${f}:`, e.message);
    }
  }
  return await import(modUrl);
}

async function run() {
  const ds = await loadDocStore();
  const search = ds.search;

  const tests = [
    { slide: 3, q: 'founding covenant underground 1975' },
    { slide: 4, q: 'four pillars $25-30M benefit' },
    { slide: 5, q: 'CCTV inspection defect types' },
    { slide: 6, q: 'executive summary growth thesis' },
    { slide: 9, q: 'three-phase modernization AI Inspection ServiceTitan ERP' },
    { slide: 10, q: 'resilience framework weatherization supply chain' },
    { slide: 12, q: 'scaling with soul processes playbooks' },
    { slide: 16, q: 'human capital metrics retention utilization training hours' },
    { slide: 17, q: 'growth thesis 2024 2027 projections' },
    { slide: 22, q: 'evidence references where to find sources' }
  ];

  for (const t of tests) {
    console.log('\n=== Test Slide ' + t.slide + ' ===');
    console.log('Query:', t.q);
    const hits = await search(t.q, 6);
    if (!hits || hits.length === 0) {
      console.log('No local hits found for query.');
      continue;
    }
    console.log(`Found ${hits.length} hits:`);
    hits.forEach((h, i) => {
      console.log(`- Hit ${i+1}: doc=${h.id} score=${h.score.toFixed(3)} snippet:\n${h.text.slice(0,200).replace(/\n/g,' ')}...`);
    });

    // Compose a simple offline-RAG answer
    let answer = `Answer (offline RAG) for slide ${t.slide}:\n`;
    answer += `Local evidence sources: ${[...new Set(hits.map(h=>h.id))].join(', ')}\n\n`;
    answer += `Summary of top hit:\n${hits[0].text.slice(0,500)}\n\n`;
    answer += `Suggested next step: ask a chart-specific question or request numeric extraction from the files listed above.`;
    console.log('\n' + answer);
  }
}

run().then(()=>console.log('\n[test_rag_simple] done')).catch(e=>{console.error(e); process.exit(1);});
