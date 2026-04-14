# Gua64 (六十四) 开发指南

> AI 开发助手专用指南，定义设计规范、技术栈偏好和开发标准。

---

## 目录

- [快速导航](#快速导航)
- [0. 开发指南与设计偏好](#0-开发指南与设计偏好)
- [1. 基础要求](#1-基础要求)
- [2. 技术栈](#2-技术栈)
- [3. 设计规范速查](#3-设计规范速查)
- [4. 代码规范](#4-代码规范)
- [5. 资源与外部工具](#5-资源与外部工具)
- [6. 开发日志](#6-开发日志)
- [7. 自检清单](#7-自检清单)
- [附录：详细示例](#附录详细示例)

---

## 快速导航

| 场景 | 章节 |
|------|------|
| 页面结构、颜色、布局 | [0.1-0.4](#0-开发指南与设计偏好) |
| 字体、间距、尺寸 | [3. 设计规范速查](#3-设计规范速查) |
| 组件代码组织 | [4.2 代码组织](#42-代码组织) |
| 路由、状态管理 | [4.3-4.4](#4-代码规范) |
| 文件命名 | [4.5 文件命名](#45-文件命名) |
| 占位图/插图 | [5.1 unDraw](#51-undraw-插图下载) |
| 检查代码规范 | [7. 自检清单](#7-自检清单) |

---

## 0. 开发指南与设计偏好

### 0.1 页面结构

```vue
<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
    <header class="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3">
      <!-- 导航内容 -->
    </header>
    <main class="px-4 py-6">
      <!-- 页面内容 -->
    </main>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss"></style>
```

### 0.2 主色调

| 用途 | 类名 | 色值 |
|------|------|------|
| 主色 | `blue-600` | `#2563EB` |
| 主色深 | `blue-700` | `#1D4ED8` |
| 主色浅 | `blue-100` | `#DBEAFE` |
| 背景渐变 | `from-blue-50 to-white` | - |
| 变卦强调 | `orange-600` | - |
| 文字主色 | `gray-800` | - |
| 文字次要 | `gray-600` | - |

### 0.3 交互与布局

**交互类名：**
- 按钮点击：`active:scale-95 hover:shadow-xl transition-all duration-300`
- 卡片悬停：`hover:shadow-lg transition-all duration-300`
- 毛玻璃：`bg-white/80 backdrop-blur-sm`
- 圆角-按钮：`rounded-full`
- 圆角-卡片：`rounded-xl`

**布局核心：** Flex 优先，固定尺寸 + 自适应填充

```scss
.container {
  display: flex;
  gap: 12px;
  
  .fixed { flex: 0 0 20%; }
  .flexible { flex: 1; min-width: 0; }
}
```

**常用模式：**
| 场景 | 类名 |
|------|------|
| 横向排列 | `flex items-center gap-3` |
| 纵向排列 | `flex flex-col gap-3` |
| 两端对齐 | `flex items-center justify-between` |
| 完全居中 | `flex items-center justify-center` |

### 0.4 占位图/插图处理

**流程：**
1. 检查 `src/assets/` 现有资源
2. 无合适资源时，使用脚本下载：
   ```bash
   node scripts/download-undraw.mjs <关键词> <文件名> [主色调]
   ```
   - 主色调从本规范 0.2 主色调获取，默认为 `2563EB`
3. 在页面中引用本地 SVG

**示例场景：**
- 空状态 → `empty`
- 成功提示 → `success`
- 冥想静心 → `meditation`

---

## 1. 基础要求

- 所有回复使用中文
- 优先复用现有封装和目录结构
- 不臆测未落地能力

---

## 2. 技术栈

Vue 3 + Vite + TypeScript + Vant + UnoCSS + Sass + Capacitor

**开发优先级：**
1. Vant UI 组件
2. UnoCSS 原子类
3. 自定义 Sass

---

## 3. 设计规范速查

### 3.1 字体

| 元素 | 大小 | 字重 |
|------|------|------|
| 页面标题 | `text-xl` | `font-bold` |
| 卡片标题 | `text-lg` | `font-bold` |
| 正文 | `text-sm` | `font-normal` |
| 辅助文字 | `text-xs` | `font-normal` |

### 3.2 间距

| 场景 | 值 |
|------|-----|
| 页面水平内边距 | `px-4` (16px) |
| 区块垂直间距 | `mb-6` ~ `mb-12` |
| 卡片内边距 | `p-5` (20px) |
| 元素间距 | `gap-2` ~ `gap-4` |

### 3.3 尺寸

| 元素 | 类名 |
|------|------|
| 主按钮 | `py-3 px-10 rounded-full` |
| 次按钮 | `py-2 px-4 rounded-full` |
| 卡片 | `rounded-xl shadow-md` |

---

## 4. 代码规范

### 4.1 命名规范

| 类型 | 命名 | 示例 |
|------|------|------|
| 组件 | PascalCase | `UserProfile.vue` |
| 组合式函数 | camelCase with `use` | `useAuth.ts` |
| 工具函数 | camelCase | `formatDate.ts` |
| 类型 | PascalCase | `UserType.ts` |

### 4.2 代码组织

**组件内部顺序：** Props → Emits → 状态 → 计算属性 → 方法 → 生命周期

```typescript
<script setup lang="ts">
// 1. Props
interface Props { userId: string; }
const props = defineProps<Props>();

// 2. Emits
const emit = defineEmits<{ submit: [data: object] }>();

// 3. 状态
const count = ref<number>(0);

// 4. 计算属性
const displayCount = computed(() => `数量: ${count.value}`);

// 5. 方法
const handleSubmit = () => { emit('submit', {}); };

// 6. 生命周期
onMounted(() => { });
</script>
```

**类型规范：**
- Props、Emits、响应式状态都需要清晰类型
- 派生数据放入 `computed`
- 列表渲染必须提供稳定的 `key`
- **每行语句末尾加分号**

### 4.3 路由规范

- 路径使用 kebab-case：`/divination`, `/user-profile`
- name 使用 camelCase：`name: 'divination'`
- 导航使用：`router.push({ name: 'divination' })`

### 4.4 状态管理（Pinia）

**Store 命名：** `useXxxStore.ts`

```typescript
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null);
  const isLoggedIn = computed(() => !!userInfo.value);
  const setUserInfo = (info: UserInfo) => { userInfo.value = info; };
  
  return { userInfo, isLoggedIn, setUserInfo };
});
```

### 4.5 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 视图文件 | PascalCase + View.vue | `HomeView.vue` |
| 组件文件 | PascalCase.vue | `TabBar.vue` |
| Store 文件 | camelCase + Store.ts | `useUserStore.ts` |

### 4.6 错误处理

```typescript
const fetchData = async () => {
  loading.value = true;
  try {
    const result = await api.getData();
    data.value = result;
  } catch (error) {
    console.error('获取数据失败:', error);
    showToast('获取数据失败，请重试');
  } finally {
    loading.value = false;
  }
};
```

---

## 5. 资源与外部工具

### 5.1 unDraw 插图下载

**脚本：** `scripts/download-undraw.mjs`

```bash
node scripts/download-undraw.mjs <关键词> [文件名] [主色调]

# 示例（使用默认主色调 blue-600 #2563EB）
node scripts/download-undraw.mjs meditation meditation-illustration

# 示例（指定主色调）
node scripts/download-undraw.mjs meditation meditation-illustration 2563EB
```

**主色调：** 从 0.2 主色调规范获取，默认为 `2563EB` (blue-600)

**引用：**
```vue
<img src="@/assets/unDraw/meditation-illustration.svg" alt="Meditation" />
```

**来源：** https://undraw.co/illustrations（开源协议）

---

## 6. 开发日志

每次修改同步到 `AI_CHANGE_LOG.md`，包含：
- 变更概览表格
- 新增/修改/修复分类
- 涉及文件路径

---

## 7. 自检清单

**基础规范：**
- [ ] 使用 Vant UI 组件
- [ ] 样式优先使用 UnoCSS
- [ ] 自定义样式使用 Sass
- [ ] 每行语句末尾加分号
- [ ] 颜色使用主色调（blue-600）
- [ ] 布局使用 Flex 优先

**组件规范：**
- [ ] Props/Emits/状态有清晰类型
- [ ] 按顺序组织代码
- [ ] 派生数据放入 computed
- [ ] 列表渲染提供 key

**路由与状态：**
- [ ] 路由路径使用 kebab-case
- [ ] 路由 name 使用 camelCase
- [ ] Store 使用 useXxxStore 命名
- [ ] 异步操作有 try-catch

**文件与资源：**
- [ ] 视图文件以 View.vue 结尾
- [ ] 组件文件使用 PascalCase
- [ ] 更新了 AI_CHANGE_LOG.md

---

## 附录：详细示例

### A.1 Vant 组件速查

| 场景 | 组件 |
|------|------|
| 按钮 | `van-button` |
| 列表 | `van-list`, `van-cell` |
| 弹窗 | `van-dialog`, `van-popup` |
| 表单 | `van-field`, `van-form` |
| 加载 | `van-loading` |
| 提示 | `van-toast` |
| 导航 | `van-nav-bar`, `van-tabbar` |

### A.2 UnoCSS 常用类

```css
/* 布局 */ flex items-center justify-between gap-4, grid grid-cols-2 gap-4
/* 尺寸 */ w-full h-screen min-h-screen
/* 间距 */ px-4 py-3 p-5 mb-6
/* 样式 */ bg-white bg-blue-600 rounded-xl shadow-md text-gray-800 text-sm font-bold
```

### A.3 资源规范

- 图标：本地 SVG 或 Vant 内置图标
- 图片：本地静态资源，不引入在线地址
- 字体：使用系统默认字体

---

> 本文档随项目发展持续更新。
