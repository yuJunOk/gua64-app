<template>
    <div class="min-h-full bg-gradient-to-b from-blue-50 to-white pb-6">
        <header class="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
            <button @click="goBack" class="flex items-center gap-2 text-gray-600">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 19l-7-7 7-7" />
                </svg>
                <span class="text-sm font-medium">返回</span>
            </button>
            <h1 class="text-lg font-bold text-gray-800">卦局详情</h1>
            <div class="w-16"></div>
        </header>

        <main class="px-4 py-5 space-y-4">
            <div v-if="isLoading" class="rounded-xl bg-white/78 py-12 text-center shadow-sm backdrop-blur-sm">
                <div class="mb-4 text-4xl">⏳</div>
                <p class="text-sm text-gray-600">加载中...</p>
            </div>

            <div v-else-if="!record" class="rounded-xl bg-white/78 py-12 text-center shadow-sm backdrop-blur-sm">
                <div class="mb-4 text-4xl">📭</div>
                <p class="text-sm text-gray-600">未找到卦局记录</p>
            </div>

            <div v-else class="space-y-6">
                <div class="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-5 shadow-lg">
                    <div class="flex items-center justify-between mb-3">
                        <h2 class="text-xl font-bold text-white">{{ originalHexagram?.name }}</h2>
                        <span :class="['px-2.5 py-1 rounded-full text-[10px] font-bold', record.result_type === 'auto' ? 'bg-blue-400/30 text-blue-100' : 'bg-green-400/30 text-green-100']">
                            {{ record.result_type === 'auto' ? '自动算卦' : '手动输入' }}
                        </span>
                    </div>
                    <p class="text-blue-100 text-sm mb-4">{{ originalHexagram?.nature }}</p>
                    <p v-if="record.question" class="text-white/80 text-sm bg-white/10 rounded-lg p-3">
                        所问之事：{{ record.question }}
                    </p>
                    <div class="flex items-center gap-4 mt-3 text-xs text-blue-200">
                        <span>起卦时间：{{ formatDate(record.created_at) }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                        <h4 class="text-sm font-bold text-blue-700 mb-3">本卦</h4>
                        <HexagramFigure
                            class="mb-2"
                            :code="originalHexagram?.symbol || ''"
                            :yao-data="yaoValues"
                            highlight-moving
                        />
                        <p class="text-gray-600 text-xs leading-relaxed text-center">{{ originalHexagram?.nature }}</p>
                    </div>

                    <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                        <h4 class="text-sm font-bold text-orange-600 mb-3">变卦</h4>
                        <HexagramFigure
                            class="mb-3"
                            :code="changedHexagram?.symbol || ''"
                            :highlight-moving="false"
                        />
                        <p class="text-gray-600 text-xs leading-relaxed text-center">{{ changedHexagram?.nature }}</p>
                    </div>
                </div>

                <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                    <h4 class="text-sm font-bold text-gray-800 mb-3">解卦结果</h4>
                    <div v-if="interpretation" class="space-y-3">
                        <div class="flex items-center gap-2">
                            <span class="px-2 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                                {{ getScenarioLabel(interpretation.scenario) }}
                            </span>
                            <span v-if="movingYao.length > 0" class="px-2 py-1 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700">
                                {{ movingYao.length }}个动爻
                            </span>
                        </div>
                        <div v-if="interpretation.primaryText" class="p-3 rounded-[14px] bg-blue-50 border border-blue-100">
                            <p class="text-sm text-gray-800 leading-relaxed">{{ interpretation.primaryText }}</p>
                        </div>
                        <div v-if="interpretation.secondaryText" class="p-3 rounded-[14px] bg-orange-50 border border-orange-100">
                            <p class="text-sm text-gray-800 leading-relaxed">{{ interpretation.secondaryText }}</p>
                        </div>
                        <div v-if="interpretation.yaoTexts?.length" class="space-y-2">
                            <div v-for="yao in interpretation.yaoTexts" :key="yao.position" 
                                class="rounded-[14px] bg-slate-50 p-3 border border-slate-100">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="font-semibold text-gray-700">{{ yao.positionName }}</span>
                                    <span :class="['px-1.5 py-0.5 rounded text-[10px] font-bold',
                                        yao.fortune === '吉' ? 'bg-emerald-100 text-emerald-700' :
                                        yao.fortune === '凶' ? 'bg-red-100 text-red-700' :
                                        yao.fortune === '小凶' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-600']">
                                        {{ yao.fortune }}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-800 mb-1">{{ yao.yaoText }}</p>
                                <p class="text-xs text-gray-500">{{ yao.yaoTextTranslation }}</p>
                            </div>
                        </div>
                        <div v-if="interpretation.notes?.length" class="space-y-1">
                            <p v-for="(note, index) in interpretation.notes" :key="index" class="text-xs text-gray-500 flex items-start gap-1">
                                <span class="text-blue-500">•</span>
                                <span>{{ note }}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                    <h4 class="text-sm font-bold text-gray-800 mb-3">六爻详情</h4>
                    <div class="space-y-2">
                        <div
                            v-for="row in yaoRows"
                            :key="row.indexFromBottom"
                            :class="['flex items-center justify-between gap-4 rounded-[14px] px-3 py-2.5 text-sm ring-1', row.yaoType && isMovingYao(row.yaoType) ? 'bg-orange-50 ring-orange-100/80' : 'bg-slate-50 ring-slate-100/80']"
                        >
                            <div class="min-w-0">
                                <span class="font-semibold text-gray-700">{{ row.positionName }}</span>
                                <span v-if="row.yaoType != null" class="ml-2 text-xs text-gray-500">{{ getYaoLabel(row.yaoType) }}</span>
                            </div>
                            <YaoLine
                                compact
                                :bit="row.bit"
                                :yao-type="row.yaoType"
                                highlight-moving
                            />
                        </div>
                    </div>
                </div>

                <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                    <h4 class="text-sm font-bold text-gray-800 mb-3">卦辞文献</h4>
                    <div v-if="literature" class="space-y-4">
                        <div class="rounded-[14px] bg-blue-50 p-3 border border-blue-100">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-xs font-bold text-blue-700">卦辞</span>
                                <span :class="['px-1.5 py-0.5 rounded text-[10px] font-bold',
                                    literature.fortune === '吉' ? 'bg-emerald-100 text-emerald-700' :
                                    literature.fortune === '凶' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700']">
                                    {{ literature.fortune }}
                                </span>
                            </div>
                            <p class="text-sm text-gray-800 mb-1">{{ literature.hexagramText }}</p>
                            <p class="text-xs text-gray-500">{{ literature.hexagramTextTranslation }}</p>
                        </div>
                        <div class="rounded-[14px] bg-slate-50 p-3 border border-slate-100">
                            <div class="text-xs font-bold text-gray-700 mb-2">彖辞</div>
                            <p class="text-sm text-gray-800 leading-relaxed">{{ literature.tuanText }}</p>
                        </div>
                        <div class="rounded-[14px] bg-slate-50 p-3 border border-slate-100">
                            <div class="text-xs font-bold text-gray-700 mb-2">象辞</div>
                            <p class="text-sm text-gray-800 mb-1">{{ literature.xiangText }}</p>
                            <p class="text-xs text-gray-500">{{ literature.xiangTextTranslation }}</p>
                        </div>
                        <div class="rounded-[14px] bg-slate-50 p-3 border border-slate-100">
                            <div class="text-xs font-bold text-gray-700 mb-2">河洛理数</div>
                            <p class="text-sm text-gray-800">{{ literature.heloDescription }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="record.note" class="rounded-xl bg-white/88 p-5 shadow-sm">
                    <h4 class="text-sm font-bold text-gray-800 mb-3">个人笔记</h4>
                    <p class="text-sm text-gray-700">{{ record.note }}</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { showFailToast } from 'vant';
import { getDivinationById, type DivinationRecord } from '../dao/divinationDao';
import { getHexagramById, getLiteratureByHexagramId, type Hexagram, type HexagramLiterature } from '../dao/hexagramDao';
import { interpretHexagram, getScenarioLabel } from '../utils/hexagramInterpreter';
import { buildHexagramRows, getYaoLabel } from '../utils/yaoUtils';
import HexagramFigure from '../components/HexagramFigure.vue';
import YaoLine from '../components/YaoLine.vue';
import { isMovingYao } from '../enums';

const router = useRouter();
const route = useRoute();

const isLoading = ref(true);
const record = ref<DivinationRecord | null>(null);

const originalHexagram = computed<Hexagram | undefined>(() => {
    if (!record.value) return undefined;
    return getHexagramById(record.value.original_hexagram_seq);
});

const changedHexagram = computed<Hexagram | undefined>(() => {
    if (!record.value?.changed_hexagram_seq) return undefined;
    return getHexagramById(record.value.changed_hexagram_seq);
});

const yaoValues = computed(() => {
    if (!record.value) return [];
    try {
        return JSON.parse(record.value.yao_values) as number[];
    } catch {
        return [];
    }
});

const movingYao = computed(() => {
    if (!record.value) return [];
    try {
        return JSON.parse(record.value.moving_yao_positions) as number[];
    } catch {
        return [];
    }
});

const literature = computed<HexagramLiterature | undefined>(() => {
    if (!record.value) return undefined;
    return getLiteratureByHexagramId(record.value.original_hexagram_seq);
});

const interpretation = computed(() => {
    if (!record.value || !originalHexagram.value || !changedHexagram.value) return undefined;
    return interpretHexagram({
        originalHexagram: originalHexagram.value,
        changedHexagram: changedHexagram.value,
        yaoValues: yaoValues.value,
        movingYao: movingYao.value
    });
});

const yaoRows = computed(() => {
    if (!originalHexagram.value) return [];
    return buildHexagramRows(originalHexagram.value.symbol, yaoValues.value);
});

const loadDetail = async () => {
    isLoading.value = true;
    try {
        const id = parseInt(route.params.id as string);
        const data = await getDivinationById(id);
        record.value = data || null;
    } catch (error) {
        console.error('加载卦局详情失败:', error);
        showFailToast('加载失败，请重试');
    } finally {
        isLoading.value = false;
    }
};

const goBack = () => {
    router.back();
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

onMounted(() => {
    loadDetail();
});
</script>