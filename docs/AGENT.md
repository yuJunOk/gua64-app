# Gua64 (六十四) 开发指南

> AI 开发助手专用指南，定义设计规范、技术栈偏好和开发标准。

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

**结构要求：** `<template>` → `<script setup lang="ts">` → `<style scoped lang="scss">`

### 0.2 主色调

| 用途 | 类名 |
|------|------|
| 主色 | `blue-600` (#2563EB) |
| 主色深 | `blue-700` |
| 主色浅 | `blue-100` |
| 背景渐变 | `from-blue-50 to-white` |
| 变卦强调 | `orange-600` |
| 文字主色 | `gray-800` |
| 文字次要 | `gray-600` |
| 边框 | `gray-200` |

### 0.3 交互方式

| 交互 | 类名 |
|------|------|
| 按钮点击 | `active:scale-95 hover:shadow-xl transition-all duration-300` |
| 卡片悬停 | `hover:shadow-lg transition-all duration-300` |
| 毛玻璃 | `bg-white/80 backdrop-blur-sm` |
| 圆角-按钮 | `rounded-full` |
| 圆角-卡片 | `rounded-xl` |

### 0.4 布局偏好（Flex 优先）

**核心原则：** 固定尺寸 + 自适应填充

```scss
// 固定元素 + 自适应元素
.container {
  display: flex;
  gap: 12px;
  
  .fixed {
    flex: 0 0 20%;  // 或 width: 40px; flex-shrink: 0;
  }
  
  .flexible {
    flex: 1;
    min-width: 0;
  }
}
```

**常用模式：**

| 场景 | 类名 |
|------|------|
| 横向排列 | `flex items-center gap-3` |
| 纵向排列 | `flex flex-col gap-3` |
| 自动换行 | `flex flex-wrap gap-3` |
| 两端对齐 | `flex items-center justify-between` |
| 完全居中 | `flex items-center justify-center` |
| 固定+自适应 | `flex items-center gap-3` + 子元素 `w-10 flex-shrink-0` + `flex-1` |

**对齐选择：**
- 导航栏/工具栏：`justify-between`
- 按钮组：`justify-center` 或 `justify-around`
- 列表项：`justify-start`

---

## 1. 基础要求

- 所有回复使用中文
- 优先复用现有封装和目录结构
- 不臆测未落地能力

---

## 2. 技术栈与优先级

### 2.1 技术栈

Vue 3 + Vite + TypeScript + Vant + UnoCSS + Sass + Capacitor

### 2.2 开发优先级

1. **Vant UI 组件** - 优先使用
2. **UnoCSS 原子类** - 动态效果、布局
3. **自定义 Sass** - 复杂样式覆盖

### 2.3 单位优先级

1. UnoCSS 工具类（`w-full`, `px-4`）
2. 百分比 / vw / vh
3. px

---

## 3. 设计规范速查

### 3.1 字体

| 元素 | 大小 | 字重 |
|------|------|------|
| 页面标题 | `text-xl` | `font-bold` |
| 卡片标题 | `text-lg` | `font-bold` |
| 小标题 | `text-base` | `font-semibold` |
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
| 图标按钮 | `w-10 h-10 rounded-full` |
| 卡片 | `rounded-xl shadow-md` |

---

## 4. 组件与样式

### 4.1 Vant 组件

| 场景 | 组件 |
|------|------|
| 按钮 | `van-button` |
| 列表 | `van-list`, `van-cell` |
| 弹窗 | `van-dialog`, `van-popup` |
| 表单 | `van-field`, `van-form` |
| 加载 | `van-loading` |
| 提示 | `van-toast` |
| 导航 | `van-nav-bar`, `van-tabbar` |

### 4.2 UnoCSS 常用类

```css
/* 布局 */ flex items-center justify-between gap-4, grid grid-cols-2 gap-4, sticky top-0
/* 尺寸 */ w-full h-screen min-h-screen
/* 间距 */ px-4 py-3 p-5 mb-6
/* 样式 */ bg-white bg-blue-600 bg-gradient-to-r, rounded-xl rounded-full shadow-md, text-gray-800 text-sm font-bold
```

**Sass 使用：** 仅当需要复杂嵌套或深度覆盖组件时使用，优先使用 `vw/vh` 相对单位。

---

## 5. 代码规范

### 5.1 命名规范

| 类型 | 命名 |
|------|------|
| 组件 | PascalCase (`UserProfile.vue`) |
| 组合式函数 | camelCase with `use` (`useAuth.ts`) |
| 工具函数 | camelCase (`formatDate.ts`) |
| 类型 | PascalCase (`UserType.ts`) |
| 样式类 | kebab-case (`user-profile`) |

### 5.2 代码组织规范

**组件内部组织顺序：** Props → Emits → 状态 → 计算属性 → 方法 → 生命周期

**类型规范：**
- `Props`、`Emits`、响应式状态都需要清晰类型
- 复杂类型组合优先使用 `type-fest`（`Simplify`、`PartialDeep`、`ReadonlyDeep`）
- 派生数据放入 `computed`，避免模板中重复计算
- 列表渲染必须提供稳定的 `key`
- **每行语句末尾加分号**（Java 风格）

**示例：**

```typescript
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Simplify } from 'type-fest';

// 1. Props
interface Props {
  userId: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
});

// 2. Emits
type Emits = {
  submit: [data: { id: string; name: string }];
  cancel: [];
};

const emit = defineEmits<Emits>();

// 3. 状态
const count = ref<number>(0);
const userList = ref<User[]>([]);
const loading = ref<boolean>(false);

// 4. 计算属性
const displayCount = computed<string>(() => {
  return `当前数量: ${count.value}`;
});

const filteredList = computed<User[]>(() => {
  return userList.value.filter(item => item.active);
});

// 5. 方法
const handleSubmit = () => {
  emit('submit', { id: props.userId, name: 'test' });
};

const fetchData = async () => {
  loading.value = true;
  try {
    // 请求数据
  } finally {
    loading.value = false;
  }
};

// 6. 生命周期
onMounted(() => {
  fetchData();
});
</script>
```

### 5.3 资源规范

- 图标：本地 SVG 或 Vant 内置图标
- 图片：本地静态资源，不引入在线地址
- 字体：使用系统默认字体

---

## 6. 开发日志

每次修改同步到 `AI_CHANGE_LOG.md`，包含：变更概览表格、新增/修改/修复分类、涉及文件路径。

---

## 7. 注意事项

1. **不引入在线资源**：图标、字体、图片使用本地资源
2. **移动端优先**：先设计移动端，再考虑响应式
3. **优先使用 UnoCSS**：减少自定义样式
4. **更新开发日志**：每次修改同步到 `AI_CHANGE_LOG.md`

---

## 8. 自检提示词

### 检查 AGENT.md 本身

当用户要求检查本文档时，使用以下提示词：

```
请检查 AGENT.md 文档：

1. 是否存在重复或冗余的内容？
2. 是否有可以合并的章节？
3. 示例代码是否过于冗长？
4. 表格和列表是否简洁明了？
5. 是否遗漏了重要的规范？
6. 文档结构是否清晰合理？

目标：保持简洁全面的原则，方便 AI 快速理解和执行。
```

### 检查代码是否符合规范

当用户要求检查代码时，使用以下自检清单：

```
请检查以下内容是否符合 AGENT.md 规范：

□ 是否使用了 Vant UI 组件而非自定义组件？
□ 样式是否优先使用 UnoCSS 原子类？
□ 自定义样式是否使用 Sass 且优先使用 vw/vh/百分比？
□ 每行语句末尾是否加了分号？
□ Props/Emits/响应式状态是否有清晰类型？
□ 组件内部是否按 Props → Emits → 状态 → 计算属性 → 方法 → 生命周期 顺序组织？
□ 派生数据是否放入 computed 而非模板计算？
□ 列表渲染是否提供了稳定的 key？
□ 颜色是否使用了规范中的主色调（blue-600 等）？
□ 布局是否使用了 Flex 优先策略（固定+自适应）？
□ 是否有冗余代码或重复内容可删除？
□ 是否更新了 AI_CHANGE_LOG.md？
```

---

> 本文档随项目发展持续更新。