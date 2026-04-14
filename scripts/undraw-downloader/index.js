#!/usr/bin/env node

/**
 * unDraw 下载器 - 主入口
 */

const {
    searchIllustrations,
    getAllIllustrations,
    downloadSVG,
    batchDownload
} = require('./lib/downloader');

module.exports = {
    searchIllustrations,
    getAllIllustrations,
    downloadSVG,
    batchDownload
};
