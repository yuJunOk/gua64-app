#!/usr/bin/env node

/**
 * 安装时自动下载所有 unDraw 插图
 * 执行时机: npm install 时通过 postinstall 钩子触发
 */

const path = require('path');
const fs = require('fs');
const { getAllIllustrations, batchDownload } = require('../lib/downloader');

// 默认输出目录（在项目中使用时，会下载到 node_modules 同级目录）
function getOutputDir() {
  // 检测是否在 node_modules 中
  const cwd = process.cwd();
  if (cwd.includes('node_modules')) {
    // 找到项目根目录（node_modules 的父目录）
    const projectRoot = path.resolve(cwd, '..', '..');
    return path.join(projectRoot, 'src', 'assets', 'undraw-illustrations');
  }
  // 开发模式：下载到当前目录
  return path.join(cwd, 'undraw-illustrations');
}

async function install() {
  console.log('🎨 @gua64/undraw-downloader 安装中...');
  console.log('');

  const outputDir = getOutputDir();

  // 检查是否已下载过
  const markerFile = path.join(outputDir, '.downloaded');
  if (fs.existsSync(markerFile)) {
    console.log('✅ 插图已存在，跳过下载');
    console.log(`📁 位置: ${outputDir}`);
    return;
  }

  try {
    console.log('📋 正在获取 unDraw 插图列表...');
    const illustrations = await getAllIllustrations();

    if (illustrations.length === 0) {
      console.log('⚠️ 未找到插图列表');
      return;
    }

    console.log(`✅ 找到 ${illustrations.length} 张插图`);
    console.log('📥 开始下载（使用默认紫色 #6c63ff）...');
    console.log('💡 提示：项目使用时可通过 applyThemeColor() 替换主题色');
    console.log('');

    const result = await batchDownload(
      illustrations,
      outputDir,
      '#6c63ff', // 默认紫色，项目使用时再替换
      (progress) => {
        const percent = Math.round((progress.current / progress.total) * 100);
        const status = progress.success ? '✅' : '❌';
        process.stdout.write(
          `\r${status} [${progress.current}/${progress.total}] ${percent}% - ${progress.title.substring(0, 40)}`
        );
      }
    );

    console.log('\n');
    console.log('✅ 下载完成！');
    console.log(`   成功: ${result.successCount}`);
    console.log(`   失败: ${result.failCount}`);
    console.log(`   总计: ${result.total}`);
    console.log('');
    console.log(`📁 插图位置: ${outputDir}`);
    console.log('');
    console.log('📝 使用方式:');
    console.log('   1. 在项目中引入: const { applyThemeColor } = require("@gua64/undraw-downloader");');
    console.log('   2. 替换主题色: applyThemeColor("#2563EB");');
    console.log('');

    // 创建标记文件，避免重复下载
    fs.writeFileSync(markerFile, new Date().toISOString());

  } catch (error) {
    console.error('❌ 下载失败:', error.message);
    process.exit(1);
  }
}

install();