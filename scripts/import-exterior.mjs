import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(process.env.USERPROFILE || '', 'Desktop', '民宿外觀.png');
const destJpg = path.join(root, 'public', 'images', 'exterior-facade.jpg');
const destPng = path.join(root, 'public', 'images', 'exterior-facade.png');

if (!fs.existsSync(src)) {
  console.error('Source not found:', src);
  process.exit(1);
}

let usedSharp = false;
try {
  const sharp = (await import('sharp')).default;
  await sharp(src)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(destJpg);
  usedSharp = true;
  console.log('Wrote optimized JPEG', destJpg, fs.statSync(destJpg).size);
} catch {
  fs.copyFileSync(src, destPng);
  console.log('Copied PNG (no sharp)', destPng, fs.statSync(destPng).size);
}

console.log(JSON.stringify({ src, usedSharp, out: usedSharp ? destJpg : destPng }));
