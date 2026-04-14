# 开发与部署文档

开发环境配置、依赖应用安装及部署打包教程。

---

## 目录

- [开发环境](#开发环境)
- [依赖应用](#依赖应用)
- [开发流程](#开发流程)
- [构建部署](#构建部署)
- [常见问题](#常见问题)

---

## 开发环境

### 系统要求

| 项目 | 版本要求 |
|------|----------|
| Node.js | 18.x LTS 或更高 |
| npm | 9.x 或更高 |
| Git | 任意版本 |

### 环境安装

#### 1. Node.js 安装

**Windows/macOS:**
访问 [Node.js 官网](https://nodejs.org/) 下载 LTS 版本安装包

**验证安装:**
```bash
node -v    # 应显示 v18.x.x 或更高
npm -v     # 应显示 9.x.x 或更高
```

#### 2. 项目初始化

```bash
# 克隆项目（如适用）
git clone <repository-url>
cd gua64-app

# 安装依赖
npm install
```

---

## 依赖应用

### 必需依赖

| 依赖 | 用途 | 安装命令 |
|------|------|----------|
| Vite | 构建工具 | `npm install -D vite` |
| Vue 3 | 前端框架 | `npm install vue` |
| TypeScript | 类型支持 | `npm install -D typescript` |
| Vant | UI 组件库 | `npm install vant` |
| UnoCSS | 原子 CSS | `npm install -D unocss` |
| Sass | CSS 预处理器 | `npm install -D sass` |
| Vue Router | 路由管理 | `npm install vue-router` |
| Pinia | 状态管理 | `npm install pinia` |

### 移动端依赖

| 依赖 | 用途 | 安装命令 |
|------|------|----------|
| Capacitor Core | 移动端核心 | `npm install @capacitor/core` |
| Capacitor CLI | 命令行工具 | `npm install -D @capacitor/cli` |
| Capacitor Android | Android 平台 | `npm install @capacitor/android` |
| SQLite 插件 | 本地数据库 | `npm install @capacitor-community/sqlite` |

### 开发工具

| 工具 | 用途 | 推荐配置 |
|------|------|----------|
| IntelliJ IDEA | 代码编辑器 | 安装 Vue.js、UnoCSS 插件 |
| Trae | AI 辅助开发 | 内置 AI 助手 |
| Android Studio | Android 构建 | 最新稳定版 |
| Chrome DevTools | 调试工具 | 内置 |

### IntelliJ IDEA 推荐插件

```
- Vue.js
- UnoCSS
- TypeScript
- ESLint
- Prettier
```

---

## 开发流程

### 启动开发服务器

```bash
npm run dev
```

默认访问地址：`http://localhost:5100`

### 开发工作流

1. **创建分支**（团队协作时）
   ```bash
   git checkout -b feature/xxx
   ```

2. **开发功能**
   - 遵循 `AGENT.md` 中的代码规范
   - 优先使用 Vant 组件
   - 样式使用 UnoCSS 原子类

3. **更新日志**
   - 在 `AI_CHANGE_LOG.md` 中记录变更

4. **构建测试**
   ```bash
   npm run build
   npm run preview
   ```

### 项目脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |

---

## 构建部署

### Web 构建

```bash
# 构建生产版本
npm run build

# 构建输出目录：dist/
```

### Android 构建

#### 1. 环境准备

- 安装 [Android Studio](https://developer.android.com/studio)
- 配置 Android SDK
- 创建 Android 模拟器或连接真机

#### 2. 初始化 Capacitor

```bash
# 如未初始化，执行以下命令
npx cap init
```

#### 3. 构建流程

```bash
# 1. 构建 Web 资源
npm run build

# 2. 同步到 Android 项目
npx cap sync android

# 3. 打开 Android Studio
npx cap open android
```

#### 4. Android Studio 打包

1. 等待 Gradle 同步完成
2. 选择 Build → Generate Signed Bundle / APK
3. 选择 APK 或 Android App Bundle
4. 配置签名密钥（首次需要创建）
5. 选择 release 版本
6. 完成构建，APK 位于 `android/app/release/`

#### 5. 真机调试

```bash
# 连接安卓设备（开启 USB 调试）
# 直接运行
npx cap run android
```

### iOS 构建（如需要）

```bash
# 添加 iOS 平台
npm install @capacitor/ios
npx cap add ios

# 构建并打开 Xcode
npm run build
npx cap sync ios
npx cap open ios
```

---

## 常见问题

### Q: npm install 安装失败？

**A:** 尝试以下方法：
```bash
# 清除缓存
npm cache clean --force

# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# 重新安装
npm install
```

### Q: Capacitor 同步失败？

**A:** 检查步骤：
1. 确保已执行 `npm run build` 生成 dist 目录
2. 检查 `capacitor.config.ts` 配置是否正确
3. 删除 `android/` 目录重新添加：`npx cap add android`

### Q: Android Studio 构建失败？

**A:** 常见解决方案：
1. File → Sync Project with Gradle Files
2. Build → Clean Project
3. Build → Rebuild Project
4. 检查 SDK 版本是否兼容

### Q: 如何更新 Capacitor？

**A:**
```bash
# 更新核心和平台
npm install @capacitor/core@latest
npm install @capacitor/android@latest
npm install -D @capacitor/cli@latest

# 同步更新
npx cap sync
```

### Q: 本地存储数据在哪？

**A:** SQLite 数据库位置：
- Android: `/data/data/<package-name>/databases/`
- 应用卸载时数据会被清除

---

## 附录

### Capacitor 配置参考

```typescript
// capacitor.config.ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.gua64',
  appName: '六十四',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

### 环境变量配置

```bash
# .env.local（本地开发，不提交到仓库）
VITE_API_BASE_URL=http://localhost:3000
```

### 相关链接

- [Vue 3 文档](https://vuejs.org/)
- [Vant 组件库](https://vant-ui.github.io/vant/)
- [Capacitor 文档](https://capacitorjs.com/docs)
- [UnoCSS 文档](https://unocss.dev/)
