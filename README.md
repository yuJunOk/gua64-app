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
| 占位/空状态插图 | [draw-empty](https://github.com/yuJunOk/draw-empty)（unDraw 风格 SVG + `DrawEmpty` / `UndrawImg`） |

> **注：** 依赖与用法见 [外部资源引用](#外部资源引用)；组件文档与 API 以上游仓库 [draw-empty](https://github.com/yuJunOk/draw-empty) 为准。

---

## 项目结构

```
gua64-app/
├── src/
│   ├── assets/           # 静态资源
│   │   └── logo.svg      # 应用 Logo（导航等）
│   ├── components/       # 公共组件（含 AppLogo）
│   ├── composables/      # 组合式函数
│   ├── router/           # 路由配置
│   ├── views/            # 页面组件
│   ├── App.vue
│   └── main.ts
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

**占位图 / 空状态**：使用 **[draw-empty](https://github.com/yuJunOk/draw-empty)**（npm 包名 `draw-empty`）。插图著作权遵循 [unDraw](https://undraw.co/illustrations) 许可；包内自带一批 SVG，组件通过 `illustration` / `name` 选用（文件名与官网英文标题一致，可含空格，例如 `Empty`、`Empty Mailbox`）。

**安装：** 上游若已发布 npm，可执行 `npm install draw-empty`。当前仓库默认使用 **GitHub Release 附件**（版本号随 Release 更新）：

```bash
npm install https://github.com/yuJunOk/draw-empty/releases/download/v0.1.0/draw-empty-0.1.0.tgz
```

**接入：** 已在 `src/main.ts` 中注册 `createDrawEmptyPlugin`，全局默认主色 `#2563EB`（与 AGENT.md 主色一致）。模板中可直接使用：

```vue
<template>
  <DrawEmpty
    title="暂无数据"
    description="请稍后再试"
    illustration="Empty"
  />
  <UndrawImg name="Meditation" width="180" />
</template>
```

按需覆盖主色：`accent-color="#059669"`（或 `accentColor`）。

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
