/* Lightweight docStore bootstrap loader
   Loads CSV/text assets from `/data/` into the in-memory docStore so
   `docStore.search()` can return matches during dev and lightweight builds.
*/
import { addDocument } from './docStore.js';

// Minimal CSV parser that handles quoted fields and commas.
function parseCsv(text) {
  const rows = [];
  let cur = '';
  const records = [];
  let i = 0;
  const len = text.length;

  let inQuotes = false;
  let field = '';
  let record = [];

  while (i < len) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        // escaped quote
        field += '"';
        i += 2;
        continue;
      }
      inQuotes = !inQuotes;
      i++;
      continue;
    }

    if (!inQuotes && (ch === ',' || ch === '\n' || ch === '\r')) {
      // end of field
      record.push(field);
      field = '';

      // handle CRLF: if CR followed by LF, skip next
      if (ch === '\r' && text[i + 1] === '\n') {
        i++;
      }

      if (ch === '\n' || ch === '\r') {
        // end of record
        records.push(record);
        record = [];
      }
      i++;
      continue;
    }

    // normal char
    field += ch;
    i++;
  }

  // push last field/record
  if (field !== '' || inQuotes) record.push(field);
  if (record.length) records.push(record);

  if (records.length === 0) return [];

  // Trim possible empty header lines at top
  let headerRow = records[0];
  let start = 1;
  // if headerRow all empty, skip until non-empty
  if (headerRow.every((c) => String(c || '').trim() === '')) {
    for (let r = 1; r < records.length; r++) {
      if (!records[r].every((c) => String(c || '').trim() === '')) {
        headerRow = records[r];
        start = r + 1;
        break;
      }
    }
  }

  const headers = headerRow.map((h) => String(h || '').trim());
  for (let r = start; r < records.length; r++) {
    const rec = records[r];
    if (rec.length === 0) continue;
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c] || `col${c}`] = String(rec[c] || '').trim();
    }
    rows.push(obj);
  }
  return rows;
}

export async function initDocStore() {
  try {
    if (typeof window === 'undefined') return;
    if (!addDocument) {
      console.info('[docStoreBootstrap] addDocument not available; skipping load');
      return;
    }

    // Prevent double-loading in HMR/dev
    if ((window).__DOCSTORE_LOADED) return;
    (window).__DOCSTORE_LOADED = true;

    const base = (import.meta && import.meta.env && import.meta.env.BASE_URL) || window.BASE_URL || '/';
    const files = [
      { id: 'cctv_inspection', path: 'cctv_inspection.csv' },
      { id: 'project_costs', path: 'project_costs.csv' },
      { id: 'bid_amounts', path: 'bid_amounts.csv' },
      { id: 'contractor_schedule', path: 'contractor_schedule.csv' },
      { id: 'references', path: 'references.json' },
      { id: 'evidence_log', path: 'Evidence_Log.xlsx' }
    ];

    for (const f of files) {
      try {
        const url = `${base}data/${f.path}`;
        const res = await fetch(url);
        if (!res.ok) {
          console.debug(`[docStoreBootstrap] no file at ${url} (${res.status})`);
          continue;
        }

        // Read as text for CSV/JSON; for binary (xlsx) attempt text as fallback
        const text = await res.text();

        // If CSV, parse rows and add per-row documents for column-aware matching
        if (f.path.toLowerCase().endsWith('.csv')) {
          try {
            const rows = parseCsv(text);
            // rows: array of objects keyed by header
            // Add per-row docs so queries can match column values
            rows.forEach((row, idx) => {
              const rowId = `${f.id}::row::${idx}`;
              // Build a readable text blob: "Header: value" pairs
              const kv = Object.keys(row)
                .map((h) => `${h}: ${row[h]}`)
                .join(' ');
              addDocument(rowId, kv);
            });

            // Also add a file-level summary doc (headers + first N rows)
            const headers = Object.keys(rows[0] || {}).join(', ');
            const preview = rows.slice(0, 10).map((r) => Object.values(r).join(', ')).join('\n');
            addDocument(f.id, `Headers: ${headers}\nPreview:\n${preview}\nFullCSV:\n${text}`);
            console.info(`[docStoreBootstrap] parsed ${f.path} as ${f.id} (${rows.length} rows)`);
            continue;
          } catch (e) {
            console.warn(`[docStoreBootstrap] CSV parse failed for ${f.path}:`, e.message || e);
            // fallback to adding raw text
          }
        }

        // For JSON, try to parse and add a readable string
        if (f.path.toLowerCase().endsWith('.json')) {
          try {
            const obj = JSON.parse(text);
            addDocument(f.id, JSON.stringify(obj, null, 2));
            console.info(`[docStoreBootstrap] loaded JSON ${f.path} as ${f.id}`);
            continue;
          } catch (e) {
            // fallback to raw text
          }
        }

        // fallback: add raw text (xlsx or parse failures)
        addDocument(f.id, text);
        console.info(`[docStoreBootstrap] loaded ${f.path} as ${f.id}`);
      } catch (e) {
        console.warn(`[docStoreBootstrap] failed to load ${f.path}:`, e.message || e);
      }
    }

    console.info('[docStoreBootstrap] finished loading public/data files into docStore');
  } catch (e) {
    console.warn('[docStoreBootstrap] init error:', e);
  }
}

export default { initDocStore };
