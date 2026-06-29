import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import toIco from 'to-ico';

const SRC = path.resolve(
  'C:/Users/aaron/Desktop/315b33ad-b555-499d-921e-fc856a670022.jpg',
);
const APP = path.resolve('app');
const ZOOM = 1.2;

async function buildBase() {
  const meta = await sharp(SRC).metadata();
  const size = meta.width ?? 1024;
  const resized = Math.round(size * ZOOM);
  const offset = Math.round((resized - size) / 2);

  return sharp(SRC)
    .resize(resized, resized, { fit: 'fill' })
    .extract({ left: offset, top: offset, width: size, height: size })
    .png()
    .toBuffer();
}

function circleMask(size) {
  const r = size / 2 - 1;
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="#ffffff"/>
  </svg>`;
  return Buffer.from(svg);
}

async function saveRoundedIcon(base, size, outPath) {
  const rounded = await sharp(base)
    .resize(size, size)
    .composite([{ input: circleMask(size), blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(rounded).toFile(outPath);
  return rounded;
}

const base = await buildBase();
const icon48 = await saveRoundedIcon(base, 48, path.join(APP, 'favicon-48.png'));
await saveRoundedIcon(base, 180, path.join(APP, 'apple-icon.png'));
await saveRoundedIcon(base, 192, path.join(APP, 'icon.png'));

const ico = await toIco([icon48, fs.readFileSync(path.join(APP, 'icon.png'))]);
fs.writeFileSync(path.join(APP, 'favicon.ico'), ico);

fs.unlinkSync(path.join(APP, 'favicon-48.png'));
console.log('icons updated with transparent circular crop');