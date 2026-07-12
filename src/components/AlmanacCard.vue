<template>
    <div class="rounded-xl bg-white/80 backdrop-blur-sm p-5 shadow-sm">
        <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.7">
                        <rect x="3.5" y="5" rx="2" ry="2" width="17" height="15" />
                        <path d="M8 3.5v3" />
                        <path d="M16 3.5v3" />
                        <path d="M4 10.5h16" />
                    </svg>
                </div>
                <div>
                    <div class="text-xs font-medium text-gray-800">{{ lunarDateText }}</div>
                    <div class="mt-0.5 text-[11px] text-gray-400">节日：{{ festivalText }}</div>
                </div>
            </div>
        </div>
        <van-swipe
            ref="almanacSwipeRef"
            :loop="false"
            :show-indicators="false"
            @change="handleAlmanacSwipeChange"
            class="mt-1"
        >
            <van-swipe-item class="pb-2">
                <div class="text-xs">
                    <div class="mb-1 text-[11px] text-gray-400">此刻宜忌提示</div>
                    <div class="flex items-center gap-2">
                        <span class="inline-flex min-w-[1.75rem] justify-center rounded px-1.5 py-0.5 bg-emerald-50 text-[10px] font-semibold text-emerald-700">
                            宜
                        </span>
                        <span class="text-gray-700">{{ currentHourYi }}</span>
                    </div>
                    <div class="mt-1 flex items-center gap-2">
                        <span class="inline-flex min-w-[1.75rem] justify-center rounded px-1.5 py-0.5 bg-rose-50 text-[10px] font-semibold text-rose-600">
                            忌
                        </span>
                        <span class="text-gray-700">{{ currentHourJi }}</span>
                    </div>
                </div>
            </van-swipe-item>
            <van-swipe-item class="pb-2">
                <div class="text-xs">
                    <div class="mb-1 text-[11px] text-gray-400">今日整体宜忌</div>
                    <div class="flex items-center gap-2">
                        <span class="inline-flex min-w-[1.75rem] justify-center rounded px-1.5 py-0.5 bg-emerald-50 text-[10px] font-semibold text-emerald-700">
                            宜
                        </span>
                        <span class="text-gray-700">{{ dayYi }}</span>
                    </div>
                    <div class="mt-1 flex items-center gap-2">
                        <span class="inline-flex min-w-[1.75rem] justify-center rounded px-1.5 py-0.5 bg-rose-50 text-[10px] font-semibold text-rose-600">
                            忌
                        </span>
                        <span class="text-gray-700">{{ dayJi }}</span>
                    </div>
                </div>
            </van-swipe-item>
        </van-swipe>
        <div class="flex items-center justify-end gap-1.5">
            <span
                class="h-1 rounded-full bg-blue-500 transition-all duration-300 cursor-pointer"
                :class="activeAlmanacTab === 'now' ? 'w-5 opacity-100' : 'w-2 opacity-40'"
                @click="setActiveAlmanacTab('now')"
            ></span>
            <span
                class="h-1 rounded-full bg-blue-500 transition-all duration-300 cursor-pointer"
                :class="activeAlmanacTab === 'today' ? 'w-5 opacity-100' : 'w-2 opacity-40'"
                @click="setActiveAlmanacTab('today')"
            ></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Solar, Lunar } from 'lunar-typescript';

const activeAlmanacTab = ref<'now' | 'today'>('now');
const almanacSwipeRef = ref<{ swipeTo: (index: number) => void } | null>(null);
const currentLunar = ref<Lunar | null>(null);

const lunarDateText = computed(() => {
    if (!currentLunar.value) return '';
    const lunar = currentLunar.value;
    const yearInGanZhi = lunar.getYearInGanZhi();
    const yearShengXiao = lunar.getYearShengXiao();
    const monthInChinese = lunar.getMonthInChinese();
    const dayInChinese = lunar.getDayInChinese();
    const timeZhi = lunar.getTime().getZhi();
    return `${yearInGanZhi}${yearShengXiao}年 · ${monthInChinese}月${dayInChinese} · ${timeZhi}时`;
});

const festivalText = computed(() => {
    if (!currentLunar.value) return '无';
    const festivals = currentLunar.value.getFestivals();
    return festivals.length > 0 ? festivals.join('、') : '无';
});

const dayYi = computed(() => {
    if (!currentLunar.value) return '';
    const yi = currentLunar.value.getDayYi();
    return yi.length > 0 ? yi.slice(0, 3).join('、') : '无';
});

const dayJi = computed(() => {
    if (!currentLunar.value) return '';
    const ji = currentLunar.value.getDayJi();
    return ji.length > 0 ? ji.slice(0, 3).join('、') : '无';
});

const currentHourYi = computed(() => {
    if (!currentLunar.value) return '';
    const currentTime = currentLunar.value.getTime();
    const yi = currentTime.getYi();
    return yi.length > 0 ? yi.slice(0, 2).join('、') : '无';
});

const currentHourJi = computed(() => {
    if (!currentLunar.value) return '';
    const currentTime = currentLunar.value.getTime();
    const ji = currentTime.getJi();
    return ji.length > 0 ? ji.slice(0, 2).join('、') : '无';
});

/** 切换黄历标签；入参为 'now' 或 'today'，同步 Swipe 与指示条 */
const setActiveAlmanacTab = (tab: 'now' | 'today'): void => {
    activeAlmanacTab.value = tab;
    const index = tab === 'now' ? 0 : 1;
    almanacSwipeRef.value?.swipeTo(index);
};

/** 黄历左右滑动切换；入参为当前页索引，副作用为同步标签状态 */
const handleAlmanacSwipeChange = (index: number): void => {
    activeAlmanacTab.value = index === 0 ? 'now' : 'today';
};

/** 初始化黄历数据；根据当前时间计算农历信息 */
const initAlmanac = (): void => {
    const now = new Date();
    const solar = Solar.fromDate(now);
    currentLunar.value = solar.getLunar();
};

onMounted(() => {
    initAlmanac();
});
</script>