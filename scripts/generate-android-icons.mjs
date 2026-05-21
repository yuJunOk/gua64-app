/**
 * 从 public/logo.svg 生成各密度 mipmap PNG，并同步 adaptive-icon XML。
 * 修改 Logo 后执行：npm run icons:android
 */
import sharp from 'sharp';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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
  mkdirSync(dir, { recursive: true });
  const png = await sharp(svg).resize(size, size).png().toBuffer();
  await sharp(png).toFile(join(dir, 'ic_launcher.png'));
  await sharp(png).toFile(join(dir, 'ic_launcher_round.png'));
  await sharp(png).toFile(join(dir, 'ic_launcher_foreground.png'));
}

const adaptiveIconXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;

const adaptiveDir = join(outBase, 'mipmap-anydpi-v26');
mkdirSync(adaptiveDir, { recursive: true });
writeFileSync(join(adaptiveDir, 'ic_launcher.xml'), adaptiveIconXml);
writeFileSync(join(adaptiveDir, 'ic_launcher_round.xml'), adaptiveIconXml);

console.log('Android mipmap icons and adaptive XML generated from public/logo.svg');
