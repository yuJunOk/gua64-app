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

// 先生成高分辨率基础图，再缩放以获得更好质量
const BASE_SIZE = 1024;

for (const [folder, size] of map) {
  const dir = join(outBase, folder);
  mkdirSync(dir, { recursive: true });
  
  // 从高分辨率缩放到目标尺寸，使用高质量插值
  const png = await sharp(svg, { density: 300 })
    .resize(BASE_SIZE, BASE_SIZE)
    .png()
    .toBuffer();
  
  const resizedPng = await sharp(png)
    .resize(size, size, {
      kernel: sharp.kernel.lanczos3,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();
  
  await sharp(resizedPng).toFile(join(dir, 'ic_launcher.png'));
  await sharp(resizedPng).toFile(join(dir, 'ic_launcher_round.png'));
  await sharp(resizedPng).toFile(join(dir, 'ic_launcher_foreground.png'));
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
