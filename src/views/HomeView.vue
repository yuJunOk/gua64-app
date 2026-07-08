<template>
    <div class="min-h-full bg-gradient-to-b from-blue-50 to-white pb-6">
        <header class="sticky top-0 z-10 border-b border-slate-100/80 bg-white/78 backdrop-blur-xl shadow-[0_8px_24px_rgba(15,23,42,0.04)] px-4 py-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <AppLogo size="2.25rem" />
                    <div>
                        <h1 class="text-lg font-bold text-gray-800">G64</h1>
                        <p class="text-xs text-gray-500">易经六十四卦</p>
                    </div>
                </div>
                <button
                    @click="goToMore"
                    class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/90 text-gray-600 shadow-[0_6px_16px_rgba(15,23,42,0.05)] transition-all duration-300 active:scale-95 hover:text-blue-600"
                >
                    <span>⚙️</span>
                </button>
            </div>
        </header>

        <main class="px-4 py-5 space-y-4">
            <div class="rounded-[20px] border border-slate-100/80 bg-white/88 p-4 shadow-[0_14px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 ring-1 ring-blue-100">
                            <span class="text-blue-600 text-lg">📅</span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-semibold text-gray-700">{{ lunarDateText }}</div>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="text-blue-500 text-xs">✦</span>
                                <span class="text-xs text-gray-500">节日：{{ currentFestival }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                    <div class="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
                        <span class="text-green-500 text-xs">✓</span>
                        <span class="text-green-700 text-xs font-medium">宜</span>
                        <span class="text-xs text-green-700">动土</span>
                    </div>
                    <div class="flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5">
                        <span class="text-red-500 text-xs">✕</span>
                        <span class="text-red-700 text-xs font-medium">忌</span>
                        <span class="text-xs text-red-700">嫁娶</span>
                    </div>
                </div>
            </div>

            <div class="rounded-[22px] border border-slate-100/80 bg-white/65 p-2.5 shadow-[0_16px_34px_rgba(37,99,235,0.08)] backdrop-blur-md">
                <button
                    @click="startDivination"
                    class="w-full rounded-[18px] border border-blue-500/8 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 p-4 shadow-[0_16px_30px_rgba(37,99,235,0.24)] transition-all duration-300 active:scale-95 hover:shadow-[0_20px_38px_rgba(37,99,235,0.28)]"
                >
                    <div class="flex items-center gap-3">
                        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/25 backdrop-blur-sm">
                            <span class="text-white text-2xl">🔮</span>
                        </div>
                        <div class="flex-1 text-left">
                            <div class="text-lg font-bold text-white">立即问卦</div>
                            <div class="mt-1 text-xs text-blue-100/95">诚心求问，卦无不应</div>
                        </div>
                        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-white/14 text-white/85 ring-1 ring-white/18">›</div>
                    </div>
                </button>

                <div class="mt-2.5 grid grid-cols-2 gap-2.5">
                    <button
                        @click="goToMore"
                        class="border-none rounded-[16px] bg-white/92 p-3.5 shadow-[0_10px_20px_rgba(15,23,42,0.05)] ring-1 ring-slate-100/80 transition-all duration-300 active:scale-95 hover:shadow-[0_14px_24px_rgba(15,23,42,0.07)]"
                    >
                        <div class="flex flex-col items-center">
                            <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
                                <span class="text-blue-600">📖</span>
                            </div>
                            <div class="text-xs font-bold text-gray-800">易经卦象</div>
                            <div class="mt-1 text-[11px] text-slate-400">查阅与延展</div>
                        </div>
                    </button>

                    <button
                        @click="startDivination"
                        class="border-none rounded-[16px] bg-white/92 p-3.5 shadow-[0_10px_20px_rgba(15,23,42,0.05)] ring-1 ring-slate-100/80 transition-all duration-300 active:scale-95 hover:shadow-[0_14px_24px_rgba(15,23,42,0.07)]"
                    >
                        <div class="flex flex-col items-center">
                            <div class="mb-2 flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
                                <span class="text-blue-600">🪙</span>
                            </div>
                            <div class="text-xs font-bold text-gray-800">传统起卦</div>
                            <div class="mt-1 text-[11px] text-slate-400">进入起卦页</div>
                        </div>
                    </button>
                </div>
            </div>

            <div class="rounded-[20px] border border-slate-100/80 bg-white/88 p-4 shadow-[0_14px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <span class="text-amber-500 text-sm">📜</span>
                        <span class="text-sm font-bold text-gray-800">最近占十</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-500">今日未起卦 / 今日0卦</span>
                        <a
                            href="javascript:void(0)"
                            @click="goToHistory"
                            class="text-xs font-medium text-blue-600 transition-opacity hover:opacity-80"
                        >
                            更多 ›
                        </a>
                    </div>
                </div>

                <div v-if="historyRecords.length === 0" class="rounded-[16px] bg-slate-50/80 py-7 text-center ring-1 ring-slate-100/80">
                    <div class="mb-2 text-2xl text-gray-300">🔮</div>
                    <div class="text-xs text-gray-400">暂无占卜记录</div>
                </div>

                <div v-else class="space-y-3">
                    <div
                        v-for="record in historyRecords.slice(0, 3)"
                        :key="record.id"
                        class="rounded-[16px] bg-slate-50/80 p-3.5 ring-1 ring-slate-100/80"
                    >
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-sm font-bold text-gray-800">{{ record.hexagram_name }}</span>
                            <span class="text-xs text-gray-500">{{ formatDate(record.created_at) }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span :class="['px-2 py-1 rounded-full text-xs font-semibold', record.result_type === 'auto' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700']">
                                {{ record.result_type === 'auto' ? '自动' : '手动' }}
                            </span>
                            <span class="text-xs text-gray-500">{{ formatTime(record.created_at) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getHistory } from '../db';
import type { HistoryRecord } from '../types';

const router = useRouter();
const historyRecords = ref<HistoryRecord[]>([]);

const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
const zodiacYears = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const dayPeriods = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'];
const celestialStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const lunarDateText = computed(() => {
    const now = new Date();
    const year = now.getFullYear();
    const zodiacIndex = (year - 4) % 12;
    const yearStemIndex = (year - 4) % 10;
    const monthIndex = (year - 4) % 12;

    const yearStem = celestialStems[yearStemIndex];
    const yearBranch = earthlyBranches[monthIndex];
    const zodiacYear = zodiacYears[zodiacIndex];

    const monthIndexReal = now.getMonth();
    const dayIndexReal = now.getDate() - 1;

    return `${yearStem}${yearBranch}${zodiacYear}年·${lunarMonths[monthIndexReal]}·${lunarDays[dayIndexReal]}·${dayPeriods[Math.floor(now.getHours() / 2)]}`;
});

const currentFestival = computed(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const festivals: Record<string, string> = {
        '1-1': '元旦',
        '2-14': '情人节',
        '3-8': '妇女节',
        '3-12': '植树节',
        '4-1': '愚人节',
        '5-1': '劳动节',
        '5-4': '青年节',
        '6-1': '儿童节',
        '7-1': '建党节',
        '8-1': '建军节',
        '9-10': '教师节',
        '10-1': '国庆节',
        '12-25': '圣诞节'
    };

    return festivals[`${month}-${day}`] || '无';
});

/** 加载历史记录；失败清空列表 */
const loadHistory = async (): Promise<void> => {
    try {
        historyRecords.value = await getHistory();
    } catch (error) {
        console.error('加载历史记录失败:', error);
        historyRecords.value = [];
    }
};

/** 跳转到算卦页面 */
const startDivination = (): void => {
    router.push({ name: 'divination' });
};

/** 跳转到更多页面 */
const goToMore = (): void => {
    router.push({ name: 'more' });
};

/** 跳转到历史页面 */
const goToHistory = (): void => {
    router.push({ name: 'history' });
};

/** 格式化日期 */
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
};

/** 格式化时间 */
const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};

onMounted(() => {
    loadHistory();
});
</script>
