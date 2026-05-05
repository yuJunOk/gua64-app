#!/usr/bin/env node

/**
 * unDraw 插图下载器核心库
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * 搜索 unDraw 插图
 * @param {string} keyword - 搜索关键词
 * @returns {Promise<Array>} 插图列表
 */
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

/**
 * 获取所有插图列表
 * @returns {Promise<Array>} 所有插图列表
 */
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

/**
 * 下载 SVG 文件
 * @param {string} url - SVG 链接
 * @param {string} outputPath - 输出路径
 * @param {string} primaryColor - 主色调（默认 #6c63ff）
 * @returns {Promise<string>} 文件路径
 */
function downloadSVG(url, outputPath, primaryColor = '#6c63ff') {
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
                const coloredSvg = svgData.replace(/#6c63ff/g, primaryColor);
                
                // 确保目录存在
                const dir = path.dirname(outputPath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                
                fs.writeFileSync(outputPath, coloredSvg);
                resolve(outputPath);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

/**
 * 批量下载插图
 * @param {Array} illustrations - 插图列表
 * @param {string} outputDir - 输出目录
 * @param {string} primaryColor - 主色调
 * @param {Function} onProgress - 进度回调
 * @returns {Promise<Object>} 下载结果统计
 */
async function batchDownload(illustrations, outputDir, primaryColor = '#6c63ff', onProgress = null) {
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < illustrations.length; i++) {
        const illustration = illustrations[i];
        const filename = illustration.newSlug || illustration.id;
        const outputPath = path.join(outputDir, `${filename}.svg`);
        
        try {
            await downloadSVG(illustration.media, outputPath, primaryColor);
            successCount++;
            if (onProgress) {
                onProgress({
                    current: i + 1,
                    total: illustrations.length,
                    success: true,
                    title: illustration.title,
                    filename
                });
            }
        } catch (error) {
            failCount++;
            if (onProgress) {
                onProgress({
                    current: i + 1,
                    total: illustrations.length,
                    success: false,
                    title: illustration.title,
                    filename,
                    error: error.message
                });
            }
        }
        
        // 添加延迟，避免请求过快
        if (i < illustrations.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
    
    return { successCount, failCount, total: illustrations.length };
}

module.exports = {
    searchIllustrations,
    getAllIllustrations,
    downloadSVG,
    batchDownload
};
