/**
 * 从 public/logo.svg 生成各密度 mipmap PNG（与 adaptive-icon 矢量 foreground 一致）。
 * 修改 Logo 后执行：npm run icons:android
 */
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svgPath = join(root, 'public/logo.svg');
const svg = readFileSync(svgPath);

/** launcher icon dp sizes */
const map = [
  ['mipmap-mdpi', 48],
  ['mipmap-hdpi', 72],
  ['mipmap-xhdpi', 96],
  ['mipmap-xxhdpi', 144],
  ['mipmap-xxxhdpi', 192],
];

const outBase = join(root, 'android/app/src/main/res');

for (const [folder, size] of map) {
  const dir = join(outBase, folder);
  const png = await sharp(svg).resize(size, size).png().toBuffer();
  await sharp(png).toFile(join(dir, 'ic_launcher.png'));
  await sharp(png).toFile(join(dir, 'ic_launcher_round.png'));
  await sharp(png).toFile(join(dir, 'ic_launcher_foreground.png'));
}

console.log('Android mipmap icons generated from public/logo.svg');
