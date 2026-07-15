<template>
    <div class="min-h-full bg-gradient-to-b from-blue-50 to-white pb-6">
        <header class="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
            <div class="flex items-center gap-3">
                <AppLogo size="2.25rem" />
                <h1 class="text-lg font-bold text-gray-800">首页</h1>
            </div>
            <button @click="goToMore"
                class="w-10 h-10 rounded-full bg-gray-50 text-gray-600 shadow-sm transition-all duration-300 active:scale-95 hover:bg-gray-100 hover:text-blue-600">
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
            </button>
        </header>

        <main class="px-4 py-5 space-y-4">
            <AlmanacCard />

            <div class="space-y-2">
              <button
                  @click="startDivination"
                  class="w-full rounded-[22px] bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-left shadow-[0_18px_40px_rgba(37,99,235,0.25)] transition-all duration-300 active:scale-[0.98] hover:shadow-[0_22px_48px_rgba(37,99,235,0.3)]"
              >
                <div class="flex items-center gap-4">
                  <div class="flex-shrink-0">
                    <svg viewBox="0 0 64 64" class="w-14 h-14 taiji-spin">
                      <circle cx="32" cy="32" r="31" fill="white"/>
                      <path d="M32 1a31 31 0 0 1 0 62A15.5 15.5 0 0 1 32 32a15.5 15.5 0 0 0 0-31z" fill="#111827"/>
                      <circle cx="32" cy="16.5" r="5" fill="#111827"/>
                      <circle cx="32" cy="47.5" r="5" fill="white"/>
                      <circle cx="32" cy="16.5" r="2" fill="white"/>
                      <circle cx="32" cy="47.5" r="2" fill="#111827"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-xl font-bold text-white">立即问卦</div>
                    <div class="mt-1 text-sm text-blue-100/90">诚心求问，卦无不应</div>
                  </div>
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/85">
                    <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </div>
              </button>

              <div class="grid grid-cols-2 gap-2">
                <button
                    @click="goToHexagramList"
                    class="rounded-[20px] bg-white/80 backdrop-blur-md p-4 shadow-[0_14px_32px_rgba(15,23,42,0.05)] transition-all duration-300 active:scale-[0.97] hover:shadow-[0_18px_36px_rgba(15,23,42,0.07)] hover:bg-white/90"
                >
                  <div class="flex flex-col items-center text-center">
                    <div class="mb-3 w-12 h-12 rounded-[14px] bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                      <svg viewBox="0 0 48 48" class="w-7 h-7">
                        <rect x="10" y="6" width="28" height="6" rx="1" fill="#78716c"/>
                        <rect x="10" y="15" width="28" height="6" rx="1" fill="#78716c"/>
                        <rect x="10" y="24" width="28" height="6" rx="1" fill="#78716c"/>
                        <rect x="10" y="33" width="28" height="6" rx="1" fill="#78716c"/>
                        <rect x="18" y="6" width="6" height="6" rx="1" fill="#d6d3d1"/>
                        <rect x="26" y="15" width="6" height="6" rx="1" fill="#d6d3d1"/>
                        <rect x="18" y="24" width="6" height="6" rx="1" fill="#d6d3d1"/>
                        <rect x="26" y="33" width="6" height="6" rx="1" fill="#d6d3d1"/>
                      </svg>
                    </div>
                    <div class="text-sm font-bold text-gray-800">六十四卦</div>
                    <div class="mt-1 text-[11px] text-gray-400">卦象详解与爻辞</div>
                  </div>
                </button>

                <button
                    @click="goToManualGuide"
                    class="rounded-[20px] bg-white/80 backdrop-blur-md p-4 shadow-[0_14px_32px_rgba(15,23,42,0.05)] transition-all duration-300 active:scale-[0.97] hover:shadow-[0_18px_36px_rgba(15,23,42,0.07)] hover:bg-white/90"
                >
                  <div class="flex flex-col items-center text-center">
                    <div class="mb-3 w-12 h-12 rounded-[14px] bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                      <svg viewBox="0 0 48 48" class="w-8 h-8" style="filter: drop-shadow(0 2px 3px rgba(217,119,6,0.25));">
                        <defs>
                          <linearGradient id="coinGold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#fde68a"/>
                            <stop offset="40%" stop-color="#fbbf24"/>
                            <stop offset="70%" stop-color="#d97706"/>
                            <stop offset="100%" stop-color="#92400e"/>
                          </linearGradient>
                        </defs>
                        <g transform="translate(0, 3) rotate(-15, 24, 20)">
                          <circle cx="13" cy="20" r="9.5" fill="url(#coinGold)" opacity="0.9"/>
                          <circle cx="13" cy="20" r="6.5" fill="none" stroke="#92400e" stroke-width="0.7" opacity="0.4"/>
                          <rect x="10.5" y="17.5" width="5" height="5" rx="0.5" fill="#78350f" opacity="0.6"/>
                        </g>
                        <g>
                          <circle cx="24" cy="22" r="11" fill="url(#coinGold)"/>
                          <circle cx="24" cy="22" r="7.5" fill="none" stroke="#92400e" stroke-width="0.7" opacity="0.4"/>
                          <rect x="20.5" y="18.5" width="7" height="7" rx="0.5" fill="#78350f" opacity="0.75"/>
                          <text x="24" y="25" text-anchor="middle" fill="#fef3c7" font-size="4" font-weight="700" opacity="0.9">乾</text>
                        </g>
                        <g transform="translate(0, 3) rotate(15, 35, 20)">
                          <circle cx="35" cy="20" r="9.5" fill="url(#coinGold)" opacity="0.9"/>
                          <circle cx="35" cy="20" r="6.5" fill="none" stroke="#92400e" stroke-width="0.7" opacity="0.4"/>
                          <rect x="32.5" y="17.5" width="5" height="5" rx="0.5" fill="#78350f" opacity="0.6"/>
                        </g>
                      </svg>
                    </div>
                    <div class="text-sm font-bold text-gray-800">传统起卦</div>
                    <div class="mt-1 text-[11px] text-gray-400">三枚铜钱法</div>
                  </div>
                </button>
              </div>
            </div>

            <div class="rounded-[20px] bg-white/80 backdrop-blur-md p-4 shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-gray-800">最近十占</span>
                        <span class="text-xs text-gray-400">今日{{ todayCount }}卦</span>
                    </div>
                    <a
                        href="javascript:void(0)"
                        @click="goToHistory"
                        class="text-xs font-medium text-blue-600 transition-opacity hover:opacity-80"
                    >
                        更多 ›
                    </a>
                </div>

                <EmptyState v-if="historyRecords.length === 0" title="暂无占卜记录" />

                <div v-else class="space-y-2.5">
                    <div
                        v-for="record in historyRecords.slice(0, 3)"
                        :key="record.id"
                        class="rounded-[14px] bg-slate-50/80 p-3.5 transition-all duration-200 active:scale-[0.99] hover:bg-slate-100/60 cursor-pointer"
                        @click="goToHistoryDetail(record.id)"
                    >
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-sm font-bold text-gray-800">{{ record.hexagram_name }}</span>
                            <span class="text-xs text-gray-500">{{ formatDate(record.created_at) }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span
                                :class="['px-2 py-0.5 rounded-full text-[10px] font-semibold', record.result_type === 'auto' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700']">
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
import { showFailToast } from 'vant';
import AppLogo from "../components/AppLogo.vue";
import AlmanacCard from "../components/AlmanacCard.vue";
import EmptyState from "../components/EmptyState.vue";
import { getHistory } from '../dao/historyDao';
import type { HistoryRecord } from '../types';

const router = useRouter();
const historyRecords = ref<HistoryRecord[]>([]);

const todayCount = computed(() => {
    const today = new Date().toDateString();
    return historyRecords.value.filter(r => new Date(r.created_at).toDateString() === today).length;
});

const loadHistory = async (): Promise<void> => {
    try {
        historyRecords.value = await getHistory();
    } catch (error) {
        console.error('加载历史记录失败:', error);
        historyRecords.value = [];
        showFailToast('加载历史失败');
    }
};

const startDivination = (): void => {
    router.push({ name: 'divination' });
};

const goToMore = (): void => {
    router.push({ name: 'more' });
};

const goToHistory = (): void => {
    router.push({ name: 'history' });
};

const goToManualGuide = (): void => {
    router.push({ name: 'manual-guide' });
};

const goToHexagramList = (): void => {
    router.push({ name: 'hexagram-list' });
};

const goToHistoryDetail = (id: number): void => {
    router.push({ name: 'history', query: { id: String(id) } });
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
};

const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};

onMounted(() => {
    loadHistory();
});
</script>

<style scoped>
.taiji-spin {
    animation: taijiSpin 20s linear infinite;
}

@keyframes taijiSpin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
