#!/usr/bin/env node

/**
 * 批量下载所有 unDraw 插图
 * 使用方法: node download-all-undraw.mjs [主色调]
 * 示例: node download-all-undraw.mjs #2563EB
 *
 * 主色调从 AGENT.md 0.2 主色调规范获取，默认为 #2563EB (blue-600)
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
const PRIMARY_COLOR = process.argv[2] || '#2563EB';

// 输出目录
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'unDraw');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ 创建目录: ${OUTPUT_DIR}`);
}

// 获取所有插图列表
function getAllIllustrations() {
    return new Promise((resolve, reject) => {
        const url = 'https://undraw.co/api/illustrations';
        
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result.illustrations || []);
                } catch (error) {
                    reject(new Error('解析插图列表失败'));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// 下载单个 SVG 文件
function downloadSVG(url, filename) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`下载失败，状态码: ${res.statusCode}`));
                return;
            }
            
            let svgData = '';
            res.on('data', (chunk) => {
                svgData += chunk;
            });
            
            res.on('end', () => {
                // 替换默认紫色 (#6c63ff) 为项目主色调
                const coloredSvg = svgData.replace(/#6c63ff/g, PRIMARY_COLOR);
                
                const filepath = path.join(OUTPUT_DIR, `${filename}.svg`);
                fs.writeFileSync(filepath, coloredSvg);
                resolve(filepath);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// 主函数
async function main() {
    console.log('🎨 批量下载 unDraw 所有插图');
    console.log(`🎯 主色调: ${PRIMARY_COLOR}`);
    console.log('');
    
    try {
        // 获取所有插图
        console.log('📋 获取插图列表...');
        const illustrations = await getAllIllustrations();
        
        if (illustrations.length === 0) {
            console.log('❌ 未找到插图');
            process.exit(1);
        }
        
        console.log(`✅ 找到 ${illustrations.length} 张插图`);
        console.log('');
        
        // 批量下载
        let successCount = 0;
        let failCount = 0;
        
        for (let i = 0; i < illustrations.length; i++) {
            const illustration = illustrations[i];
            const filename = illustration.newSlug || illustration.id;
            
            try {
                await downloadSVG(illustration.media, filename);
                successCount++;
                console.log(`✅ [${i + 1}/${illustrations.length}] ${illustration.title}`);
            } catch (error) {
                failCount++;
                console.log(`❌ [${i + 1}/${illustrations.length}] ${illustration.title}: ${error.message}`);
            }
            
            // 添加延迟，避免请求过快
            if (i < illustrations.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
        
        console.log('');
        console.log('🎉 下载完成！');
        console.log(`✅ 成功: ${successCount} 张`);
        console.log(`❌ 失败: ${failCount} 张`);
        console.log(`📁 保存位置: ${OUTPUT_DIR}`);
        
    } catch (error) {
        console.error('❌ 错误:', error.message);
        process.exit(1);
    }
}

main();
