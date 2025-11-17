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
      console.log(`[test_agentteam_explain] loaded ${f} as ${id}`);
    } catch (e) {
      console.warn(`[test_agentteam_explain] failed to load ${f}:`, e.message);
    }
  }
  return await import(modUrl);
}

async function run() {
  // Load docs into docStore
  await loadDocStore();

  // Import agentTeam (should be safe in Node after recent guards)
  const agentUrl = url.pathToFileURL(path.join(baseDir, 'models', 'agentTeam.js')).href;
  const { agentTeam } = await import(agentUrl);

  // Ask Agent Lee to explain page 9 chart
  console.log('\n=== Request: Turn to page 9 and explain the chart ===\n');
  try {
    const res = await agentTeam.explainChart('contractor_schedule', 'Turn to page 9 and explain the chart.');
    // `explainChart` returns the same structure as answer(); normalize
    const best = res && res.best ? res.best : res;
    const text = best && (best.text || best.answer || best) ? (best.text || best.answer || String(best)) : 'No answer';
    console.log('\n--- Agent Lee Response ---\n');
    console.log(String(text));
  } catch (e) {
    console.error('AgentTeam explainChart failed:', e);
  }
}

run().then(() => console.log('\n[test_agentteam_explain] done')).catch(e => { console.error(e); process.exit(1); });
