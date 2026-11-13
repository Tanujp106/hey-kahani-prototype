// SVG raster export via sharp/libvips. No browser and no network requests.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
let sharp;
try {
  sharp = require(process.env.HK_SHARP_MODULE || 'sharp');
} catch (error) {
  if (process.env.HK_SHARP_MODULE) throw error;
  sharp = require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp'));
}
async function main() {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
  for (const asset of manifest.assets) {
    const target = path.join(__dirname, asset.png);
    fs.mkdirSync(path.dirname(target), {recursive: true});
    await sharp(path.join(__dirname, asset.file), {density: 192})
      .resize(asset.viewBox[2] * 2, asset.viewBox[3] * 2).png().toFile(target);
  }
  console.log(`Rendered ${manifest.assets.length} transparent assets at exact 2x dimensions with sharp/libvips.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
