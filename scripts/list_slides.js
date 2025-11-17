const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'constants.ts');
const text = fs.readFileSync(file, 'utf8');

// 1) Read all slide titles from pitchDeckData
const start = text.indexOf('export const pitchDeckData');
if (start === -1) {
  console.error('pitchDeckData not found');
  process.exit(1);
}
const arrStart = text.indexOf('[', start);
const arrEnd = text.indexOf('];', arrStart);
if (arrStart === -1 || arrEnd === -1) {
  console.error('Could not locate pitchDeckData array body');
  process.exit(1);
}

const body = text.slice(arrStart + 1, arrEnd);

// crude split by top-level entries: assume each top-level object starts with "\n    {\n"
const parts = body
  .split('\n    {')
  .map(p => p.trim())
  .filter(Boolean);

const titles = parts.map(p => {
  // title: PRESENTATION_TITLE | `...` | '...' | "..."
  const m = p.match(/title:\s*(?:PRESENTATION_TITLE|`([^`]+)`|'([^']+)'|"([^"]+)")/);
  if (m) return m[1] || m[2] || m[3] || 'PRESENTATION_TITLE';
  const m2 = p.match(/title:\s*([^,\n]+)/);
  return m2 ? m2[1].trim() : 'UNKNOWN';
});

console.log('Total slides found in pitchDeckData:', titles.length);
titles.forEach((t, i) => console.log(`${i + 1}. ${t}`));

// 2) Parse the index slide (type: 'index') and its sections
const indexMatch = text.match(/type:\s*'index'[\s\S]*?sections:\s*\[([\s\S]*?)\]/);
if (!indexMatch) {
  console.log('\nNo index sections found (type: \'index\').');
  process.exit(0);
}

const sectionsText = indexMatch[1];
const ids = [];
const secRe = /{\s*id:\s*(\d+),\s*title:\s*'([^']+)'/g;
let m;
while ((m = secRe.exec(sectionsText)) !== null) {
  ids.push({ id: Number(m[1]), title: m[2] });
}

console.log('\nIndex entries found in index slide:', ids.length);
ids.forEach(s => console.log(`Index id ${s.id}: ${s.title}`));

// 3) Your intended mapping: Index id → title (this is the “ground truth”)
const expectedIndexMap = [
  { id: 1,  title: 'Cover / Opening' },
  { id: 2,  title: 'Presentation Index / Roadmap of the Story' },
  { id: 3,  title: 'Founding Roots / Underground Truth' },
  { id: 4,  title: 'The Four Pillars: Values as Competitive Advantage' },
  { id: 5,  title: 'Love Story #1: Falling in Love with the Craft' },
  { id: 6,  title: 'Executive Summary' },
  { id: 7,  title: 'A History of Strategic Evolution' },
  { id: 8,  title: 'Love Story #3: Falling in Love with the Future' },
  { id: 9,  title: 'The Technology Transformation: Three-Phase Modernization' },
  { id: 10, title: 'The Resilience Framework: Shielding the Bottom Line' },
  { id: 11, title: 'Love Story #2: Falling in Love with Operational Excellence' },
  { id: 12, title: 'Covenant & Culture as Engine' },
  { id: 13, title: 'Scaling with Soul / Process & Systems' },
  { id: 14, title: 'Integrated Service Delivery Model' },
  { id: 15, title: 'Case Studies in Execution Excellence' },
  { id: 16, title: 'Human Capital Analytics: Linking People to Profitability' },
  { id: 17, title: 'Growth Thesis & Financial Projections' },
  { id: 18, title: 'Love Story #4: Falling in Love with Legacy' },
  { id: 19, title: 'The Four Tests of Transformation' },
  { id: 20, title: 'Toward the Horizon: 50 Years Underground, Infinite Years Ahead' },
  { id: 21, title: 'Human Capital: The Core Asset' },
  { id: 22, title: 'Evidence & References: Data Sources for Every Claim' },
  { id: 23, title: 'Thank You: The Journey Continues' },
];

// 4) Check that every expected index id exists in the index slide
console.log('\n=== Checking that index slide matches the expected index map ===');

const indexProblems = [];

for (const exp of expectedIndexMap) {
  const fromIndexSlide = ids.find(x => x.id === exp.id);
  if (!fromIndexSlide) {
    indexProblems.push(`• Missing entry in index slide for id ${exp.id} (${exp.title})`);
    continue;
  }

  if (fromIndexSlide.title !== exp.title) {
    indexProblems.push(
      `• Mismatch for id ${exp.id}:\n` +
      `   - Expected index title: "${exp.title}"\n` +
      `   - In index slide:       "${fromIndexSlide.title}"`
    );
  }
}

if (indexProblems.length === 0) {
  console.log('✓ Index slide sections match the expected id→title mapping.');
} else {
  console.log('⚠ Issues with index slide mapping:');
  indexProblems.forEach(p => console.log(p));
}

// 5) Check alignment between index ids and actual slide titles in pitchDeckData
console.log('\n=== Checking that index ids line up with actual slides in pitchDeckData ===');

const deckProblems = [];

for (const exp of expectedIndexMap) {
  const slideTitle = titles[exp.id - 1]; // slides are 1-based vs array 0-based
  if (!slideTitle) {
    deckProblems.push(`• No slide found at position ${exp.id} for "${exp.title}"`);
    continue;
  }

  if (slideTitle !== exp.title) {
    deckProblems.push(
      `• Slide ${exp.id} title mismatch:\n` +
      `   - Expected by index: "${exp.title}"\n` +
      `   - In pitchDeckData:  "${slideTitle}"`
    );
  }
}

if (deckProblems.length === 0) {
  console.log('✓ pitchDeckData slide order matches the expected index id→title mapping.');
} else {
  console.log('⚠ Issues with pitchDeckData slide titles/order:');
  deckProblems.forEach(p => console.log(p));
}
