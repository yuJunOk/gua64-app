<template>
    <div class="min-h-full bg-gradient-to-b from-blue-50 to-white pb-6">
        <header class="sticky top-0 z-10 border-b border-slate-100/80 bg-white/78 px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
            <div class="rounded-[20px] border border-slate-100/70 bg-white/88 px-5 py-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                <div class="flex items-center gap-4">
                    <div class="flex h-18 w-18 items-center justify-center rounded-[16px] bg-gradient-to-br from-blue-50 to-blue-100">
                        <AppLogo size="4.25rem" />
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-baseline gap-2">
                            <span class="text-xl font-bold text-gray-800">G64</span>
                            <span class="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">V1.0</span>
                        </div>
                        <div class="mt-2 text-xs leading-relaxed text-gray-500">
                            六十四卦，四千零九十六变。<br />
                            变的是象，定的是心。
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <main class="px-4 py-5 space-y-4">
            <div class="overflow-hidden rounded-[18px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] ring-1 ring-slate-100/80">
                <div class="bg-slate-50/70 px-4 py-2.5">
                    <span class="text-xs font-medium text-slate-500">卦象浏览</span>
                </div>
                <div
                    v-for="item in menuGroupKnowledge"
                    :key="item.name"
                    @click="handleMenuClick(item.name)"
                    @touchstart="activeItem = item.name"
                    @touchend="activeItem = ''"
                    @mouseup="activeItem = ''"
                    :class="[
                        'flex items-center justify-between px-4 py-4 transition-all duration-200',
                        activeItem === item.name ? 'bg-slate-50 scale-[0.995]' : ''
                    ]"
                >
                    <div class="flex items-center gap-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-[12px] bg-blue-50 text-blue-600">
                            <span class="text-blue-600">{{ item.icon }}</span>
                        </div>
                        <div>
                            <div class="text-sm font-semibold text-gray-800">{{ item.label }}</div>
                            <div class="mt-0.5 text-xs text-slate-400">{{ item.subtitle }}</div>
                        </div>
                    </div>
                    <div class="text-gray-400">›</div>
                </div>
            </div>

            <div class="overflow-hidden rounded-[18px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] ring-1 ring-slate-100/80">
                <div class="bg-slate-50/70 px-4 py-2.5">
                    <span class="text-xs font-medium text-slate-500">卦局管理</span>
                </div>
                <div
                    v-for="item in menuGroupManagement"
                    :key="item.name"
                    @click="handleMenuClick(item.name)"
                    @touchstart="activeItem = item.name"
                    @touchend="activeItem = ''"
                    @mouseup="activeItem = ''"
                    :class="[
                        'flex items-center justify-between px-4 py-4 transition-all duration-200',
                        activeItem === item.name ? 'bg-slate-50 scale-[0.995]' : ''
                    ]"
                >
                    <div class="flex items-center gap-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-[12px] bg-blue-50 text-blue-600">
                            <span class="text-blue-600">{{ item.icon }}</span>
                        </div>
                        <div>
                            <div class="text-sm font-semibold text-gray-800">{{ item.label }}</div>
                            <div class="mt-0.5 text-xs text-slate-400">{{ item.subtitle }}</div>
                        </div>
                    </div>
                    <div class="text-gray-400">›</div>
                </div>
            </div>

            <div class="overflow-hidden rounded-[18px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] ring-1 ring-slate-100/80">
                <div class="bg-slate-50/70 px-4 py-2.5">
                    <span class="text-xs font-medium text-slate-500">其他</span>
                </div>
                <div
                    v-for="item in menuGroupOther"
                    :key="item.name"
                    @click="handleMenuClick(item.name)"
                    @touchstart="activeItem = item.name"
                    @touchend="activeItem = ''"
                    @mouseup="activeItem = ''"
                    :class="[
                        'flex items-center justify-between px-4 py-4 transition-all duration-200',
                        activeItem === item.name ? 'bg-slate-50 scale-[0.995]' : ''
                    ]"
                >
                    <div class="flex items-center gap-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-[12px] bg-blue-50 text-blue-600">
                            <span class="text-blue-600">{{ item.icon }}</span>
                        </div>
                        <div>
                            <div class="text-sm font-semibold text-gray-800">{{ item.label }}</div>
                            <div class="mt-0.5 text-xs text-slate-400">{{ item.subtitle }}</div>
                        </div>
                    </div>
                    <div class="text-gray-400">›</div>
                </div>
            </div>

            <div class="text-center py-6">
                <div class="text-xs text-gray-400">Gua64 · 易经六十四卦</div>
                <div class="mt-1 text-xs text-gray-400">v1.0.0</div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';

const activeItem = ref('');

interface MenuItem {
    name: string;
    label: string;
    icon: string;
    subtitle: string;
}

const menuGroupKnowledge: MenuItem[] = [
    { name: 'knowledge', label: '六十四卦', icon: '📖', subtitle: '基础卦象与说明' }
];

const menuGroupManagement: MenuItem[] = [
    { name: 'statistics', label: '数据统计', icon: '📊', subtitle: '汇总分析卦局数据' },
    { name: 'collection', label: '卦局收藏', icon: '⭐', subtitle: '收藏重要卦局' },
    { name: 'importexport', label: '数据管理', icon: '💾', subtitle: '导入与导出卦局数据' }
];

const menuGroupOther: MenuItem[] = [
    { name: 'settings', label: '应用设置', icon: '⚙️', subtitle: '应用偏好与设置' }
];

/** 响应更多页菜单点击；入参为菜单名，当前阶段统一提示功能开发中 */
const handleMenuClick = (name: string): void => {
    const messages: Record<string, string> = {
        knowledge: '六十四卦功能开发中',
        statistics: '数据统计功能开发中',
        collection: '卦局收藏功能开发中',
        importexport: '卦局数据导入导出功能开发中',
        settings: '应用设置功能开发中'
    };
    showToast(messages[name] || '功能开发中');
};
</script>
