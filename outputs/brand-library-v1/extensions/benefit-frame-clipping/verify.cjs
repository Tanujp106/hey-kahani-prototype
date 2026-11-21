// Non-browser containment check: render the declared alpha masks against the
// same nine-slice mapping used by border-image. No app/browser visual claims.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
let sharp;
try { sharp = require(process.env.HK_SHARP_MODULE || 'sharp'); }
catch { sharp = require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')); }
const root = path.resolve(__dirname, '../../../..');
const css = fs.readFileSync(path.join(root, 'shopify-homepage/assets/css/styles.css'), 'utf8');
const maskPath = path.join(root, 'shopify-homepage/assets/css/benefit-frame-masks.css');
const masks = fs.existsSync(maskPath) ? fs.readFileSync(maskPath, 'utf8') : '';
const frames = {screen:'quiet-tide', hands:'double-hill', home:'soft-postcard', simple:'plump-panel-marigold'};
const slices = [[0,0,110,110],[110,0,420,110],[530,0,110,110],[0,110,110,180],[110,110,420,180],[530,110,110,180],[0,290,110,110],[110,290,420,110],[530,290,110,110]];
function parts(w,h,b) { return [[0,0,b,b],[b,0,w-2*b,b],[w-b,0,b,b],[0,b,b,h-2*b],[b,b,w-2*b,h-2*b],[w-b,b,b,h-2*b],[0,h-b,b,b],[b,h-b,w-2*b,b],[w-b,h-b,b,b]]; }
async function render(images,w,h,b) {
  const layers = [];
  for (let i=0;i<9;i++) {
    const [left,top,width,height] = parts(w,h,b)[i];
    layers.push({input:await sharp(Buffer.from(images[i])).resize(width,height,{fit:'fill'}).png().toBuffer(),left,top});
  }
  return sharp({create:{width:w,height:h,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite(layers).raw().toBuffer();
}
(async()=>{
 let count=0;
 for (const [kind,name] of Object.entries(frames)) {
  const source = fs.readFileSync(path.join(root, 'shopify-homepage/assets/images/brand-library/containers/benefit-'+name+'.svg'),'utf8');
  const geometry = source.match(/<path[^>]*d="([^"]+)"/)[1];
  const expected = slices.map(v=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${v.join(' ')}" width="${v[2]}" height="${v[3]}" preserveAspectRatio="none"><path d="${geometry}" fill="white"/></svg>`);
  const rule = masks.match(new RegExp('\\.hk-how-panel--'+kind+'\\s*\\{([^}]+)\\}'));
  const actual = rule ? Array.from(rule[1].matchAll(/url\("data:image\/svg\+xml,([^"\n]+)"\)/g), m=>decodeURIComponent(m[1])) : [];
  for (const [w,h,b] of [[1120,650,67],[640,900,48],[380,900,32]]) {
   const reference = await render(expected,w,h,b);
   const clipped = actual.length===9 && /mask-image:\s*var\(--hk-benefit-clip\)/.test(css);
   const result = clipped ? await render(actual,w,h,b) : Buffer.alloc(w*h*4,255);
   let escaped=0, missing=0;
   for(let i=3;i<reference.length;i+=4) {
    if(reference[i]===0 && result[i]>8) escaped++;
    if(reference[i]>250 && result[i]<240) missing++;
   }
   assert.equal(escaped,0,`${kind} ${w}px: decoration escapes authored contour at ${escaped} pixels`);
   assert.equal(missing,0,`${kind} ${w}px: mask cuts into filled card at ${missing} pixels`);
   count++;
  }
 }
 console.log(`PASS: ${count} rendered masks contain all decoration and retain the authored nine-slice contour.`);
})().catch(e=>{console.error(e.message);process.exitCode=1;});
