# @gua64/undraw-utils

🎨 unDraw 插图工具集，支持自动下载、主题色替换和 Vue 组件

## 功能特性

- 📥 **自动下载** - npm install 时自动下载所有 unDraw 插图
- 🎨 **主题色替换** - 一键替换所有插图的主色调
- 🧩 **Vue 组件** - 提供简洁的 `<UndrawIllustration>` 组件
- 📦 **零配置** - 开箱即用，无需复杂设置
- 🔧 **CLI 工具** - 提供命令行操作接口

## 完整使用流程

### 步骤 1: 打包工具

```bash
# 进入工具目录
cd d:\Project\gua64-app\scripts\undraw-utils

# 打包生成 .tgz 文件
npm pack

# 会生成 gua64-undraw-utils-1.0.0.tgz
```

### 步骤 2: 安装到项目

```bash
# 回到项目根目录
cd d:\Project\gua64-app

# 安装依赖
npm install ./scripts/undraw-utils/gua64-undraw-utils-1.0.0.tgz

# ✨ 安装时会自动下载所有 unDraw 插图到 src/assets/undraw-illustrations/
```

### 步骤 3: 在 Vue 项目中使用

#### 方法 A: 使用 Vue 组件（推荐）

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import UndrawPlugin from '@gua64/undraw-utils/vue-plugin'

const app = createApp(App)
app.use(UndrawPlugin, { color: '#2563EB' }) // 全局主题色
app.mount('#app')
```

```vue
<template>
  <!-- 使用全局主题色 -->
  <UndrawIllustration name="meditation" />
  
  <!-- 单独设置颜色 -->
  <UndrawIllustration name="success" color="#10B981" />
  
  <!-- 设置尺寸 -->
  <UndrawIllustration name="empty" width="200" height="200" />
</template>
```

#### 方法 B: 直接引用 SVG

```vue
<template>
  <img 
    src="@/assets/undraw-illustrations/meditation.svg" 
    alt="Meditation"
  />
</template>
```

### 步骤 4: 配置 Vite（如果需要）

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.svg'], // 确保 SVG 被正确处理
})
```

## CLI 命令

> **提示：** 安装后会自动下载所有插图，通常不需要手动执行这些命令

```bash
# 下载单个插图（如果需要）
undraw meditation

# 下载所有插图（如果需要）
undraw --all #2563EB

# 替换所有插图主题色
undraw --theme #2563EB

# 显示帮助
undraw --help
```

## 程序化使用

### Node.js 脚本

```javascript
const { 
  searchIllustrations, 
  downloadSVG, 
  batchDownload,
  applyThemeColor,
  getIllustrationPath,
  listIllustrations,
  searchLocalIllustrations
} = require('@gua64/undraw-utils');

// 搜索在线插图
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

// 替换所有已下载插图的主题色
await applyThemeColor('#2563EB');

// 获取插图路径（用于 Vue 模板）
const path = getIllustrationPath('meditation');
// 返回: @/assets/undraw-illustrations/meditation.svg

// 列出所有本地插图
const illustrations = listIllustrations();
// 返回: ['meditation', 'success', 'empty', ...]

// 搜索本地插图
const matches = searchLocalIllustrations('med');
// 返回: ['meditation', 'medicine', ...]
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

- **项目安装**：`src/assets/undraw-illustrations/`
- **全局使用**：当前工作目录的 `undraw-illustrations/`

## 常见问题

### Q: 安装时没有自动下载插图？
A: 请检查网络连接，或手动执行 `undraw --all #2563EB`

### Q: 主题色替换不生效？
A: 确保使用正确的 HEX 格式，如 `#2563EB`

### Q: Vue 组件不显示？
A: 检查是否正确注册了插件，以及插图文件是否存在

### Q: 如何更新到最新的 unDraw 插图？
A: 可以通过以下方式更新：
1. 删除 `src/assets/undraw-illustrations/.downloaded` 文件，然后重新运行 `npm install`
2. 或者手动执行：`undraw --all #2563EB`

## License

MIT
