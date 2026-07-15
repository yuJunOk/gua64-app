<template>
    <div class="min-h-full bg-gradient-to-b from-slate-50 to-white pb-6">
        <header class="sticky top-0 z-10 bg-white/95 px-4 py-3.5 shadow-sm backdrop-blur-md">
            <div class="flex items-center gap-3">
                <button @click="goBack" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 transition-all active:scale-95 hover:bg-gray-100">
                    <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"/>
                    </svg>
                </button>
                <h1 class="text-lg font-bold text-gray-800">{{ hexagram?.name }}卦</h1>
            </div>
        </header>

        <main v-if="hexagram && literature" class="px-4 py-5 space-y-5">
            <div class="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-xl shadow-indigo-200/50 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
                <div class="relative z-10">
                    <div class="text-center mb-6">
                        <div class="text-5xl font-bold mb-2 tracking-wider">{{ hexagram.name }}</div>
                        <div class="text-indigo-100 text-sm">{{ hexagram.nature }}</div>
                        <div class="flex items-center justify-center gap-2 mt-2">
                            <span class="text-xs text-indigo-200">第{{ hexagram.id }}卦</span>
                            <span class="text-indigo-300">·</span>
                            <span class="text-xs text-indigo-200">{{ hexagram.category }}</span>
                            <div :class="[
                                'ml-2 px-2.5 py-1 rounded-full text-[10px] font-bold',
                                getFortuneClass(literature.fortune)
                            ]">
                                {{ getFortuneLabel(literature.fortune as Fortune) }}
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-col items-center">
                        <div class="bg-white/10 rounded-xl p-5 backdrop-blur-md border border-white/10 hexagram-white">
                            <HexagramFigure :code="hexagram.symbol" />
                        </div>
                        <div class="mt-3 text-xs text-indigo-200 font-mono">{{ hexagram.symbol }}</div>
                    </div>
                </div>
            </div>

            <div class="flex gap-1 bg-gray-100/50 p-1 rounded-xl">
                <button
                    v-for="tab in tabs"
                    :key="tab.key"
                    @click="activeTab = tab.key"
                    :class="[
                        'flex-1 py-2.5 px-3 rounded-lg text-xs font-medium transition-all',
                        activeTab === tab.key
                            ? 'bg-white text-gray-800 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    ]"
                >
                    {{ tab.label }}
                </button>
            </div>

            <div class="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
                <div v-if="activeTab === 'text'">
                    <div class="mb-6">
                        <div class="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                            <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span class="text-sm font-bold text-gray-800">卦辞</span>
                        </div>
                        <div class="space-y-3">
                            <div>
                                <span class="text-xs text-blue-600 font-medium">原文</span>
                                <div class="text-base text-gray-800 font-medium mt-1 leading-relaxed">{{ literature.hexagramText }}</div>
                            </div>
                            <div>
                                <span class="text-xs text-blue-600 font-medium">译文</span>
                                <div class="text-sm text-gray-600 mt-1 leading-relaxed">{{ literature.hexagramTextTranslation }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-6">
                        <div class="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                            <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                            <span class="text-sm font-bold text-gray-800">彖辞</span>
                        </div>
                        <div>
                            <span class="text-xs text-purple-600 font-medium">原文</span>
                            <div class="text-sm text-gray-700 mt-1 leading-loose whitespace-pre-line">{{ literature.tuanText }}</div>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                            <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <span class="text-sm font-bold text-gray-800">象辞</span>
                        </div>
                        <div class="space-y-3">
                            <div>
                                <span class="text-xs text-amber-600 font-medium">原文</span>
                                <div class="text-sm text-gray-800 font-medium mt-1 leading-relaxed">{{ literature.xiangText }}</div>
                            </div>
                            <div>
                                <span class="text-xs text-amber-600 font-medium">译文</span>
                                <div class="text-sm text-gray-600 mt-1 leading-relaxed">{{ literature.xiangTextTranslation }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else-if="activeTab === 'helo'">
                    <div class="space-y-4">
                        <div>
                            <span class="text-xs text-amber-600 font-medium">河洛理数来源</span>
                            <div class="text-sm text-gray-800 font-medium mt-1 leading-relaxed">{{ literature.heloSource }}</div>
                        </div>
                        <div>
                            <span class="text-xs text-amber-600 font-medium">河洛理数描述</span>
                            <div class="text-sm text-gray-700 mt-1 leading-loose">{{ literature.heloDescription }}</div>
                        </div>
                    </div>
                </div>

                <div v-else-if="activeTab === 'yao'">
                    <div class="space-y-4">
                        <div
                            v-for="yao in yaoData"
                            :key="yao.position"
                            class="rounded-lg bg-slate-50/50 p-4 border border-gray-100"
                        >
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-3">
                                    <span class="w-6 h-6 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center">
                                        {{ yao.position }}
                                    </span>
                                    <span class="text-sm font-bold text-gray-800">{{ yao.yaoType }}</span>
                                </div>
                                <span :class="[
                                    'px-2.5 py-1 rounded-full text-[10px] font-bold',
                                    getYaoFortuneClass(yao.fortune)
                                ]">
                                    {{ getFortuneLabel(yao.fortune as Fortune) }}
                                </span>
                            </div>
                            
                            <div class="space-y-3">
                                <div>
                                    <span class="text-xs text-gray-500 font-medium">爻辞</span>
                                    <div class="text-sm text-gray-800 font-medium mt-1 leading-relaxed">{{ yao.yaoText }}</div>
                                </div>
                                <div>
                                    <span class="text-xs text-gray-500 font-medium">译文</span>
                                    <div class="text-sm text-gray-600 mt-1 leading-relaxed">{{ yao.yaoTextTranslation }}</div>
                                </div>
                                <div v-if="yao.xiangText">
                                    <span class="text-xs text-gray-500 font-medium">象曰</span>
                                    <div class="text-sm text-gray-700 mt-1 leading-relaxed">{{ yao.xiangText }}</div>
                                </div>
                                <div v-if="yao.heloDescription" class="pt-2 border-t border-gray-100">
                                    <span class="text-xs text-amber-600 font-medium">河洛理数</span>
                                    <div class="text-xs text-amber-800/90 mt-1 leading-relaxed">{{ yao.heloDescription }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getHexagramBySymbol, getLiteratureBySymbol, type Hexagram, type HexagramLiterature } from '../dao/hexagramDao';
import { getYaoDataBySymbol, type YaoData } from '../dao/yaoDao';
import HexagramFigure from '../components/HexagramFigure.vue';
import { Fortune, getColor as getFortuneColor, getCardColor as getFortuneCardColor, getLabel as getFortuneLabel } from '../enums/fortune';

const router = useRouter();
const route = useRoute();

const symbol = ref('111111');
const activeTab = ref('text');

const tabs = [
    { key: 'text', label: '卦辞' },
    { key: 'helo', label: '河洛理数' },
    { key: 'yao', label: '六爻详解' },
];

const getFortuneClass = (fortune: string) => {
    const f = fortune as Fortune;
    const colors = getFortuneColor(f);
    return `${colors.bg} ${colors.text}`;
};

const getYaoFortuneClass = (fortune: string) => {
    const f = fortune as Fortune;
    const colors = getFortuneCardColor(f);
    return `${colors.bg} ${colors.text}`;
};

const hexagram = computed<Hexagram | undefined>(() => {
    return getHexagramBySymbol(symbol.value);
});

const literature = computed<HexagramLiterature | undefined>(() => {
    return getLiteratureBySymbol(symbol.value);
});

const yaoData = computed<YaoData[]>(() => {
    return getYaoDataBySymbol(symbol.value);
});

const goBack = (): void => {
    router.back();
};

onMounted(() => {
    const paramSymbol = route.params.symbol as string;
    if (paramSymbol && paramSymbol.length === 6) {
        symbol.value = paramSymbol;
    }
});
</script>

<style scoped>
.hexagram-white :deep(.yao-segment--still) {
    background-color: white !important;
}
.hexagram-white :deep(.yao-segment--yin) {
    background-color: rgba(255, 255, 255, 0.6) !important;
}
</style>
