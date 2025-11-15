const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

function findAssets(html) {
  const urls = new Set();
  const re = /(?:src|href)=\"([^\"]+)\"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    urls.add(m[1]);
  }
  return Array.from(urls);
}

function normalizeUrl(u) {
  // ignore external urls
  if (/^https?:\/\//i.test(u)) return null;
  // ignore data: URIs
  if (/^data:/i.test(u)) return null;
  // drop query/hash
  return u.split(/[?#]/)[0];
}

function check() {
  if (!fs.existsSync(indexPath)) {
    console.error('ERROR: dist/index.html not found');
    process.exit(2);
  }
  const html = fs.readFileSync(indexPath, 'utf8');
  const assets = findAssets(html).map(normalizeUrl).filter(Boolean);
  console.log('Found asset references in index.html:');
  assets.forEach(a => console.log(' -', a));

  let missing = [];
  for (const asset of assets) {
    // asset may start with base path like /repo-name/
    const candidatePaths = [];
    if (asset.startsWith('/')) {
      candidatePaths.push(path.join(distDir, asset.replace(/^\//, '')));
      candidatePaths.push(path.join(distDir, asset));
    } else {
      candidatePaths.push(path.join(distDir, asset));
      candidatePaths.push(path.join(distDir, 'assets', path.basename(asset)));
      candidatePaths.push(path.join(distDir, 'images', path.basename(asset)));
    }
    const exists = candidatePaths.some(p => fs.existsSync(p));
    if (!exists) missing.push({ asset, tried: candidatePaths });
  }

  if (missing.length === 0) {
    console.log('All referenced assets exist in dist (basic check).');
    process.exit(0);
  }

  console.error('Missing assets detected:');
  for (const m of missing) {
    console.error(' -', m.asset);
    m.tried.forEach(p => console.error('    tried:', p));
  }
  process.exit(3);
}

check();
