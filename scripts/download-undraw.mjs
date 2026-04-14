#!/usr/bin/env node

/**
 * unDraw 插图自动下载脚本
 * 使用方法: node download-undraw.mjs <关键词> [文件名] [主色调]
 * 示例: node download-undraw.mjs meditation meditation-illustration 2563EB
 *
 * 主色调从 AGENT.md 0.2 主色调规范获取，默认为 2563EB (blue-600)
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 项目主色调（从 AGENT.md 0.2 主色调规范获取）
// 默认: #2563EB (blue-600)
const PRIMARY_COLOR = process.argv[4] || '2563EB';

// 输出目录
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'unDraw');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ 创建目录: ${OUTPUT_DIR}`);
}

// 搜索 unDraw 插图
function searchIllustrations(keyword) {
    return new Promise((resolve, reject) => {
        const url = `https://undraw.co/api/search?q=${encodeURIComponent(keyword)}`;
        
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result.results || []);
                } catch (error) {
                    reject(new Error('解析搜索结果失败'));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// 下载 SVG 文件
function downloadSVG(url, filename) {
    return new Promise((resolve, reject) => {
        // 添加主色调参数
        const downloadUrl = url.includes('?') ? `${url}&color=${PRIMARY_COLOR}` : `${url}?color=${PRIMARY_COLOR}`;
        
        https.get(downloadUrl, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`下载失败，状态码: ${res.statusCode}`));
                return;
            }
            
            const filepath = path.join(OUTPUT_DIR, `${filename}.svg`);
            const fileStream = fs.createWriteStream(filepath);
            
            res.pipe(fileStream);
            
            fileStream.on('finish', () => {
                fileStream.close();
                resolve(filepath);
            });
            
            fileStream.on('error', (error) => {
                reject(error);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// 主函数
async function main() {
    const keyword = process.argv[2];
    const customFilename = process.argv[3];
    
    if (!keyword) {
        console.log('❌ 请提供搜索关键词');
        console.log('用法: node download-undraw.mjs <关键词> [文件名]');
        console.log('示例: node download-undraw.mjs meditation meditation-illustration');
        process.exit(1);
    }
    
    console.log(`🔍 搜索关键词: "${keyword}"`);
    
    try {
        // 搜索插图
        const results = await searchIllustrations(keyword);
        
        if (results.length === 0) {
            console.log('❌ 未找到相关插图');
            process.exit(1);
        }
        
        console.log(`✅ 找到 ${results.length} 个相关插图`);
        
        // 使用第一个结果
        const firstResult = results[0];
        console.log(`📥 下载: ${firstResult.title}`);
        console.log(`🔗 URL: ${firstResult.media}`);
        
        // 生成文件名
        const filename = customFilename || firstResult.newSlug || keyword.toLowerCase().replace(/\s+/g, '-');
        
        // 下载 SVG
        const filepath = await downloadSVG(firstResult.media, filename);
        
        console.log(`✅ 下载完成: ${filepath}`);
        console.log(`🎨 主色调: #${PRIMARY_COLOR} (blue-600)`);
        
        // 显示使用方式
        console.log('\n💡 在 Vue 中使用:');
        console.log(`<img src="@/assets/unDraw/${filename}.svg" alt="${firstResult.title}" />`);
        
    } catch (error) {
        console.error('❌ 错误:', error.message);
        process.exit(1);
    }
}

main();
