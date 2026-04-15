#!/usr/bin/env node

/**
 * unDraw 下载器 - 主入口
 */

const fs = require('fs');
const path = require('path');
const {
    searchIllustrations,
    getAllIllustrations,
    downloadSVG,
    batchDownload
} = require('./lib/downloader');

/**
 * 获取插图目录路径
 * @returns {string} 插图目录路径
 */
function getIllustrationsDir() {
    // 检测是否在 node_modules 中
    const cwd = process.cwd();
    if (cwd.includes('node_modules')) {
        const projectRoot = path.resolve(cwd, '..', '..');
        return path.join(projectRoot, 'src', 'assets', 'undraw-illustrations');
    }
    return path.join(cwd, 'undraw-illustrations');
}

/**
 * 应用主题色到所有插图
 * @param {string} primaryColor - 主色调，如 #2563EB
 * @param {string} customDir - 自定义插图目录（可选）
 * @returns {Promise<Object>} 处理结果
 */
async function applyThemeColor(primaryColor, customDir = null) {
    const illustrationsDir = customDir || getIllustrationsDir();

    if (!fs.existsSync(illustrationsDir)) {
        throw new Error(`插图目录不存在: ${illustrationsDir}`);
    }

    const files = fs.readdirSync(illustrationsDir).filter(f => f.endsWith('.svg'));

    if (files.length === 0) {
        throw new Error('未找到 SVG 插图文件');
    }

    console.log(`🎨 应用主题色: ${primaryColor}`);
    console.log(`📁 目录: ${illustrationsDir}`);
    console.log(`📊 文件数: ${files.length}`);
    console.log('');

    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
        const filePath = path.join(illustrationsDir, file);
        try {
            let svgContent = fs.readFileSync(filePath, 'utf-8');

            // 替换所有颜色变体（支持多种紫色格式）
            svgContent = svgContent
                .replace(/#6c63ff/gi, primaryColor)
                .replace(/#6C63FF/gi, primaryColor)
                .replace(/rgb\(108,\s*99,\s*255\)/gi, hexToRgb(primaryColor))
                .replace(/rgb\(108\s+99\s+255\)/gi, hexToRgb(primaryColor));

            fs.writeFileSync(filePath, svgContent);
            successCount++;
            process.stdout.write(`\r✅ [${successCount}/${files.length}] ${file.substring(0, 40)}`);
        } catch (error) {
            failCount++;
            console.error(`\n❌ 处理失败: ${file}`, error.message);
        }
    }

    console.log('\n');
    console.log('✅ 主题色应用完成！');
    console.log(`   成功: ${successCount}`);
    console.log(`   失败: ${failCount}`);

    return { successCount, failCount, total: files.length };
}

/**
 * HEX 转 RGB
 * @param {string} hex - HEX 颜色
 * @returns {string} RGB 格式
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return hex;
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * 获取指定插图的完整路径（用于项目中的 img src）
 * @param {string} name - 插图名称（不含扩展名）
 * @returns {string} 相对路径，如 @/assets/undraw-illustrations/meditation.svg
 */
function getIllustrationPath(name) {
    return `@/assets/undraw-illustrations/${name}.svg`;
}

/**
 * 列出所有可用的插图
 * @param {string} customDir - 自定义目录（可选）
 * @returns {Array<string>} 插图名称列表
 */
function listIllustrations(customDir = null) {
    const illustrationsDir = customDir || getIllustrationsDir();

    if (!fs.existsSync(illustrationsDir)) {
        return [];
    }

    return fs.readdirSync(illustrationsDir)
        .filter(f => f.endsWith('.svg'))
        .map(f => f.replace('.svg', ''));
}

/**
 * 搜索本地插图（模糊匹配）
 * @param {string} keyword - 关键词
 * @returns {Array<string>} 匹配的插图名称列表
 */
function searchLocalIllustrations(keyword) {
    const all = listIllustrations();
    const lowerKeyword = keyword.toLowerCase();
    return all.filter(name => name.toLowerCase().includes(lowerKeyword));
}

module.exports = {
    searchIllustrations,
    getAllIllustrations,
    downloadSVG,
    batchDownload,
    applyThemeColor,
    getIllustrationsDir,
    getIllustrationPath,
    listIllustrations,
    searchLocalIllustrations
};
