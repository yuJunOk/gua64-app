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

---

## 项目结构

```
gua64-app/
├── src/
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
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
