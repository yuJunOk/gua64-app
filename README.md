# Gua64 (六十四)

> **简称：G64**
>
> *六十四卦，四千零九十六变。变的是象，定的是心。*

基于 Vue 3 + Capacitor 的移动端玄学应用。

---

## 项目简介

Gua64（六十四 / G64）是一款专注于卦象解析的移动端应用，提供自动算卦、手动输入、卦象解读和历史记录等功能。

### 核心功能

- **自动算卦**：模拟三枚硬币抛掷，自动生成卦象
- **手动输入**：支持线下抛掷后手动录入结果
- **卦象解析**：展示本卦、变卦及卦辞爻辞
- **历史记录**：本地存储算卦历史，方便回顾

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Vue 3 + TypeScript |
| 构建工具 | Vite |
| UI 组件库 | Vant 4 |
| 样式方案 | UnoCSS + Sass |
| 状态管理 | Pinia |
| 路由 | Vue Router |
| 移动端 | Capacitor |
| 本地存储 | SQLite (via @capacitor-community/sqlite) |
| 插图素材 | unDraw (开源免费) |

> **注：** 关于 unDraw 插图的详细使用说明，请参考 [外部资源引用](#外部资源引用) 部分。

---

## 项目结构

```
gua64-app/
├── src/
│   ├── assets/           # 静态资源
│   │   └── unDraw/       # unDraw 插图素材
│   ├── components/       # 公共组件
│   ├── composables/      # 组合式函数
│   ├── router/           # 路由配置
│   ├── views/            # 页面组件
│   ├── App.vue
│   └── main.ts
├── scripts/              # 工具脚本
│   └── undraw-utils/  # unDraw 插图工具集
├── android/              # Android 原生项目（Capacitor 生成）
├── docs/                 # 项目文档
│   ├── AGENT.md          # AI 开发指南
│   ├── AI_CHANGE_LOG.md  # AI 开发日志
│   └── DEVELOP_DEPLOY.md # 开发部署文档
├── package.json
├── vite.config.ts
└── README.md
```

---

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- Android Studio（如需构建 Android 应用）

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### Android 构建

```bash
# 构建 Web 资源
npm run build

# 同步到 Android 项目
npx cap sync android

# 打开 Android Studio
npx cap open android
```

详细步骤请参考 [DEVELOP_DEPLOY.md](./docs/DEVELOP_DEPLOY.md)

---

## 开发指南

### AI 辅助开发

本项目支持 AI 辅助开发，相关配置和日志位于 `docs/` 目录：

- **`AGENT.md`**：AI 开发助手专用指南，定义设计规范和技术标准
- **`AI_CHANGE_LOG.md`**：记录所有 AI 辅助开发的变更历史

### 代码规范

- 使用 Vue 3 `<script setup>` 语法
- 优先使用 Vant UI 组件
- 样式优先使用 UnoCSS 原子类
- 自定义样式使用 Sass，优先使用 vw/vh 相对单位

### 外部资源引用

本项目使用 **unDraw** 提供的开源插图素材：

- **来源**: https://undraw.co/illustrations
- **协议**: 开源免费，可商用
- **主色调**: 与项目主色调保持一致（参见 AGENT.md 0.2 主色调规范）

**自动下载工具** (`@gua64/undraw-utils`):

项目集成了自定义的 unDraw 插图工具集，**安装时会自动下载所有 unDraw 插图**到 `src/assets/undraw-illustrations/` 目录。

> **提示：** 通常不需要手动执行以下命令，npm install 时会自动完成。仅在网络问题等特殊情况下使用：

```bash
# 手动下载所有插图（特殊情况）
npx undraw --all #2563EB

# 替换所有插图主题色
npx undraw --theme #2563EB
```

> **更新素材图：** 如果需要更新到最新的 unDraw 插图，可以：
> 1. 删除 `src/assets/undraw-illustrations/.downloaded` 文件，然后重新运行 `npm install`
> 2. 或者手动执行：`npx undraw --all #2563EB`

**在 Vue 中使用（推荐）**:

```javascript
// main.js
import UndrawPlugin from '@gua64/undraw-utils/vue-plugin'
app.use(UndrawPlugin, { color: '#2563EB' })
```

```vue
<template>
  <!-- 使用全局主题色 -->
  <UndrawIllustration name="meditation" />
  
  <!-- 单独设置颜色 -->
  <UndrawIllustration name="success" color="#10B981" />
</template>
```

**传统方式引用**:

```vue
<template>
  <img 
    src="@/assets/undraw-illustrations/meditation.svg" 
    alt="Meditation"
  />
</template>
```

---

## 相关文档

| 文档 | 说明 |
|------|------|
| [AGENT.md](./docs/AGENT.md) | AI 开发指南（给 AI 看） |
| [AI_CHANGE_LOG.md](./docs/AI_CHANGE_LOG.md) | AI 开发变更日志 |
| [DEVELOP_DEPLOY.md](./docs/DEVELOP_DEPLOY.md) | 开发依赖与部署教程 |

---

## 许可证

MIT License
