<p align="center">
  <img src="./public/logo.svg" alt="Gua64 logo" height="72" />
</p>

<h1 align="center">Gua64 · 六十四</h1>

基于 **Vue 3** + **Capacitor** 的移动端易学应用：通过 **三枚硬币** 自动起卦，也支持线下抛掷后 **手动录入**；生成结果后展示 **本卦 / 变卦 / 卦辞 / 爻辞**，并用 **SQLite** 在本地保存历史。界面使用 **Vant 4** 与 **UnoCSS**，按移动端体验设计与打包。

> 六十四卦，四千零九十六变。变的是象，定的是心。

[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF?style=flat-square&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![Vant](https://img.shields.io/badge/Vant-4-1989fa?style=flat-square)](https://vant-ui.github.io/vant/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License MIT](https://img.shields.io/badge/License-MIT-9cf?style=flat-square)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.0.0-666?style=flat-square)](./package.json)

| [开发部署](./docs/DEVELOP_DEPLOY.md) | [AI 开发指南](./docs/AGENT.md) | [AI 变更日志](./docs/AI_CHANGE_LOG.md) | [项目配置](./package.json) |
| :--: | :--: | :--: | :--: |

---

## 特性

- **自动算卦**：模拟三枚硬币抛掷，自动生成六爻与卦象
- **手动录入**：支持线下抛掷后逐爻录入，适配真实起卦流程
- **卦象解读**：集中展示本卦、变卦、卦辞与爻辞信息
- **历史记录**：使用 `@capacitor-community/sqlite` 在本地保存算卦结果
- **移动优先**：Vant 4 + UnoCSS + Capacitor，适合 Android 打包与真机使用

---

## 安装

需要 **Node.js 18+**；如需构建 Android 应用，还需要 **Android Studio**。

```bash
git clone <你的仓库地址>
cd gua64-app
npm install
```

开发模式：

```bash
npm run dev
```

生产构建与预览：

```bash
npm run build
npm run preview
```

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
| 本地存储 | SQLite（`@capacitor-community/sqlite`） |
| 辅助组件 | `draw-empty` |

---

## 预览

| 首页 | 算卦入口 | 历史（空状态） |
|------|----------|----------------|
| ![](./assets/readme/readme-home.png) | ![](./assets/readme/readme-divination.png) | ![](./assets/readme/readme-history-empty.png) |

---

## Android 构建

先构建 Web 资源，再同步到 Capacitor Android 工程：

```bash
npm run build
npx cap sync android
npx cap open android
```

详细环境配置、真机运行与打包流程见 [**DEVELOP_DEPLOY.md**](./docs/DEVELOP_DEPLOY.md)。

---

## 常用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run build` | TypeScript 类型检查 + Vite 生产构建 |
| `npm run preview` | 本地预览构建产物 |
| `npm run icons:android` | 使用 `public/logo.svg` 生成 Android 图标 |

设计规范、目录约定与 AI 协作规则见 [**AGENT.md**](./docs/AGENT.md)；AI 辅助变更记录见 [**AI_CHANGE_LOG.md**](./docs/AI_CHANGE_LOG.md)。

---

## 设计稿

- **Axure RP 源文件**：[`design/rp/`](./design/rp/)
- **导出预览 / HTML**：`design/exports/`（已在 `.gitignore` 忽略，默认不提交）

---

## 许可

- 仓库代码：**MIT**
- 硬币等第三方素材：见对应目录的 **`ATTRIBUTION.txt`**
- draw-empty 插图：遵循 [unDraw 许可](https://undraw.co/license)
