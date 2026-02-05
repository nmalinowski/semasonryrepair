// Simple image optimizer using sharp.
// Usage: npm install sharp && node tools/optimize-images.mjs
// Reads from assets/img/original and writes to assets/img/optimized.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = path.resolve('assets/img/original');
const outDir = path.resolve('assets/img/optimized');
const widths = [1920, 1280, 800];
const qualityJpeg = 70;
const qualityWebp = 75;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

async function processFile(file) {
  const inputPath = path.join(srcDir, file);
  const base = file.replace(path.extname(file), '');
  for (const w of widths) {
    const jpegOut = path.join(outDir, `${base}-${w}.jpg`);
    const webpOut = path.join(outDir, `${base}-${w}.webp`);
    await sharp(inputPath).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: qualityJpeg }).toFile(jpegOut);
    await sharp(inputPath).resize({ width: w, withoutEnlargement: true }).webp({ quality: qualityWebp }).toFile(webpOut);
    console.log(`✔ ${file} -> ${w}px`);
  }
}

async function main() {
  for (const f of files) {
    await processFile(f);
  }
  console.log('Done. Optimized images saved in assets/img/optimized');
}

main().catch(err => { console.error(err); process.exit(1); });
