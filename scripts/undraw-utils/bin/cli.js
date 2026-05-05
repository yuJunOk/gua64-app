#!/usr/bin/env node

/**
 * unDraw 工具集 CLI
 * 使用方法: undraw <关键词> [文件名] [主色调]
 * 示例: undraw meditation meditation-illustration #2563EB
 */

const path = require('path');
const { searchIllustrations, getAllIllustrations, downloadSVG, batchDownload } = require('../lib/downloader');

// 解析命令行参数
const args = process.argv.slice(2);
const command = args[0];

// 帮助信息
function showHelp() {
    console.log(`
🎨 unDraw 工具集

使用方法:
  undraw <关键词> [文件名] [主色调]     搜索并下载单张插图
  undraw --all [主色调]                  下载所有插图
  undraw --theme <主色调>                替换所有插图的主题色
  undraw --help                          显示帮助信息

参数:
  <关键词>     搜索关键词，如: meditation, success, empty
  [文件名]     自定义文件名（可选）
  [主色调]     自定义颜色，如: #2563EB（可选，默认 #6c63ff）

示例:
  undraw-download meditation                        使用默认紫色
  undraw-download meditation my-illustration        自定义文件名
  undraw-download meditation my-illustration #2563EB 自定义颜色和文件名
  undraw-download --all #2563EB                     下载所有插图并应用蓝色
  undraw-download --theme #2563EB                   将所有插图改为蓝色

主色调参考:
  #2563EB - 蓝色 (blue-600)
  #10B981 - 绿色 (emerald-500)
  #F59E0B - 橙色 (amber-500)
  #EF4444 - 红色 (red-500)
  #8B5CF6 - 紫色 (violet-500)
`);
}

// 下载单张插图
async function downloadSingle(keyword, customFilename, primaryColor) {
    console.log(`🔍 搜索关键词: "${keyword}"`);
    
    try {
        const results = await searchIllustrations(keyword);
        
        if (results.length === 0) {
            console.log('❌ 未找到相关插图');
            process.exit(1);
        }
        
        console.log(`✅ 找到 ${results.length} 个相关插图`);
        
        const firstResult = results[0];
        console.log(`📥 下载: ${firstResult.title}`);
        
        const filename = customFilename || firstResult.newSlug || keyword.toLowerCase().replace(/\s+/g, '-');
        const outputDir = path.join(process.cwd(), 'undraw-illustrations');
        const outputPath = path.join(outputDir, `${filename}.svg`);
        
        await downloadSVG(firstResult.media, outputPath, primaryColor);
        
        console.log(`✅ 下载完成: ${outputPath}`);
        console.log(`🎨 主色调: ${primaryColor}`);
        
    } catch (error) {
        console.error('❌ 错误:', error.message);
        process.exit(1);
    }
}

// 下载所有插图
async function downloadAll(primaryColor) {
    console.log('🎨 批量下载所有 unDraw 插图');
    console.log(`🎯 主色调: ${primaryColor}`);
    console.log('');
    
    try {
        console.log('📋 获取插图列表...');
        const illustrations = await getAllIllustrations();
        
        if (illustrations.length === 0) {
            console.log('❌ 未找到插图');
            process.exit(1);
        }
        
        console.log(`✅ 找到 ${illustrations.length} 张插图`);
        console.log('');
        
        const outputDir = path.join(process.cwd(), 'undraw-illustrations');
        
        const result = await batchDownload(illustrations, outputDir, primaryColor, (progress) => {
            const status = progress.success ? '✅' : '❌';
            console.log(`${status} [${progress.current}/${progress.total}] ${progress.title}`);
        });
        
        console.log('');
        console.log('🎉 下载完成！');
        console.log(`✅ 成功: ${result.successCount} 张`);
        console.log(`❌ 失败: ${result.failCount} 张`);
        console.log(`📁 保存位置: ${outputDir}`);
        
    } catch (error) {
        console.error('❌ 错误:', error.message);
        process.exit(1);
    }
}

// 应用主题色
async function applyColor(primaryColor) {
    const { applyThemeColor } = require('../index');
    try {
        await applyThemeColor(primaryColor);
    } catch (error) {
        console.error('❌ 错误:', error.message);
        process.exit(1);
    }
}

// 主函数
async function main() {
    if (!command || command === '--help' || command === '-h') {
        showHelp();
        return;
    }

    if (command === '--all' || command === '-a') {
        const primaryColor = args[1] || '#6c63ff';
        await downloadAll(primaryColor);
        return;
    }

    if (command === '--theme' || command === '-t') {
        const primaryColor = args[1];
        if (!primaryColor) {
            console.log('❌ 请提供主题色，例如: undraw-download --theme #2563EB');
            process.exit(1);
        }
        await applyColor(primaryColor);
        return;
    }

    // 单张下载
    const keyword = command;
    const customFilename = args[1];
    const primaryColor = args[2] || '#6c63ff';

    await downloadSingle(keyword, customFilename, primaryColor);
}

main();
