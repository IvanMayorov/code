const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const file = process.argv[2];
if (!file || !file.endsWith('.js')) process.exit(0);

const outDir = path.join(__dirname, 'min');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const outFile = path.join(outDir, path.basename(file));
execSync(`npx terser "${file}" -o "${outFile}" --compress --mangle`);
console.log(`Minified ${file} -> ${outFile}`); 