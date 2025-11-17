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
      console.log(`[test_rag] loaded ${f} as ${id}`);
    } catch (e) {
      console.warn(`[test_rag] failed to load ${f}:`, e.message);
    }
  }
}

async function runTests() {
  const modUrl = url.pathToFileURL(path.join(baseDir, 'models', 'agentTeam.js')).href;
  const agentMod = await import(modUrl);
  const agentTeam = agentMod.agentTeam;

  // make sure docStore has been loaded
  await loadDocStore();

  const tests = [
    { slide: 3, prompt: 'Summarize the founding covenant and its operational implications.' },
    { slide: 4, prompt: 'What evidence supports the $25-30M benefit claim in the Four Pillars?' },
    { slide: 5, prompt: 'How did trenchless rehabilitation and CCTV inspection shape operational excellence?' },
    { slide: 6, prompt: 'What are the key takeaways from the Executive Summary for investors?' },
    { slide: 9, prompt: 'Describe the three-phase technology modernization and expected ROI.' },
    { slide: 10, prompt: 'Explain the Resilience Framework pillars and potential risk mitigation.' },
    { slide: 12, prompt: 'How does the company preserve culture while scaling (processes & playbooks)?' },
    { slide: 16, prompt: 'Which human capital metrics most directly correlate to profitability?' },
    { slide: 17, prompt: 'Summarize the growth thesis and the path to $70M by 2027.' },
    { slide: 22, prompt: 'Where can I find the evidence and references for the claims in the deck?' }
  ];

  for (const t of tests) {
    console.log('\n---');
    console.log(`Test for slide ${t.slide}: ${t.prompt}`);
    try {
      const res = await agentTeam.askAllModels(t.prompt, `Slide ${t.slide}`);
      const best = res && res.best ? res.best : null;
      console.log('\n-- BEST ANSWER --');
      if (best) console.log(best.text || best);
      else console.log('(no best response)');
      console.log('\n-- LOCAL DATA PREVIEW --');
      console.log(res.localDataPreview || '(no local data preview)');
      console.log('\n-- ERRORS --');
      console.log((res.errors && res.errors.length) ? JSON.stringify(res.errors, null, 2) : '(no errors)');
    } catch (e) {
      console.error('Test failed:', e);
    }
  }
}

runTests().then(() => console.log('\n[test_rag] done')).catch(e => { console.error(e); process.exit(1); });
