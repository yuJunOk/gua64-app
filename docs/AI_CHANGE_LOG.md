# AI 开发日志

记录所有 AI 辅助开发的变更历史。

---

## 变更概览

| 日期 | 类型 | 描述 | 文件 |
|------|------|------|------|
| 2026-05-05 | 依赖/文档 | 移除 `undraw-utils`；引入 `draw-empty`（GitHub Release `.tgz`）、`main.ts` 全局插件与 `vite` 预构建；文档同步占位插图说明（README / AGENT / DEVELOP_DEPLOY / 本日志）；可选本地 `src/assets/unDraw/`；历史页空状态使用 `DrawEmpty` | `package.json`、`package-lock.json`、`src/main.ts`、`vite.config.ts`、`src/views/HistoryView.vue`、`README.md`、`docs/AGENT.md`、`docs/DEVELOP_DEPLOY.md`、`docs/AI_CHANGE_LOG.md`、`scripts/`（已删除） |
| 2026-04-14 | 文档 | 初始化 AI 开发日志 | `AI_CHANGE_LOG.md` |

---

## 2026-05-05

### 新增
1. 依赖 `draw-empty`（Release `.tgz`），`main.ts` 注册 `createDrawEmptyPlugin`，默认主色 `#2563EB`
2. `HistoryView` 无数据时使用 `DrawEmpty`（插图 `Taking Notes`）

### 修改
1. 删除 `scripts/undraw-utils/`（原 `@gua64/undraw-utils`）
2. `vite.config.ts`：`optimizeDeps.include` 增加 `draw-empty`
3. `README.md`、`docs/AGENT.md`、`docs/DEVELOP_DEPLOY.md`、`docs/AI_CHANGE_LOG.md`：占位插图改为 draw-empty 流程、安装方式及构建体积提示；保留 `src/assets/unDraw/` 作自选兜底

### 修复
- 无

---

## 2026-04-14

### 新增
1. 创建 `AI_CHANGE_LOG.md` 开发日志文档

### 修改
- 无

### 修复
- 无

---

## 日志格式说明

### 类型标记
- **新增**：新功能、新页面、新组件
- **修改**：样式调整、逻辑优化、重构
- **修复**：Bug 修复、问题处理
- **文档**：文档更新、注释添加
- **依赖**：依赖安装、版本升级

### 记录规范
1. 按日期倒序排列，最新变更在最上方
2. 每个日期下分「新增/修改/修复」三类
3. 涉及文件变更需注明文件路径
4. 重要变更需在「变更概览」表格中登记
