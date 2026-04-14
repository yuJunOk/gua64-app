# @gua64/undraw-downloader

🎨 unDraw 插图下载工具，支持自定义主色调

## 安装

```bash
npm install -g @gua64/undraw-downloader
```

## 使用方法

### CLI 命令

```bash
# 搜索并下载单张插图
undraw-download meditation

# 自定义文件名
undraw-download meditation my-illustration

# 自定义主色调
undraw-download meditation my-illustration #2563EB

# 下载所有插图
undraw-download --all #2563EB

# 显示帮助
undraw-download --help
```

### 程序化使用

```javascript
const { searchIllustrations, downloadSVG, batchDownload } = require('@gua64/undraw-downloader');

// 搜索插图
const results = await searchIllustrations('meditation');

// 下载单张
await downloadSVG(
  results[0].media,
  './output/meditation.svg',
  '#2563EB'
);

// 批量下载
await batchDownload(results, './output', '#2563EB', (progress) => {
  console.log(`[${progress.current}/${progress.total}] ${progress.title}`);
});
```

## 主色调参考

| 颜色 | 色值 | Tailwind 类名 |
|------|------|--------------|
| 蓝色 | `#2563EB` | blue-600 |
| 绿色 | `#10B981` | emerald-500 |
| 橙色 | `#F59E0B` | amber-500 |
| 红色 | `#EF4444` | red-500 |
| 紫色 | `#8B5CF6` | violet-500 |

## 输出目录

下载的插图默认保存到当前工作目录的 `undraw-illustrations/` 文件夹

## License

MIT
