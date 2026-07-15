<template>
    <div class="min-h-full bg-gradient-to-b from-blue-50/60 via-slate-50/90 to-white pb-6">
        <header class="sticky top-0 z-10 bg-white/95 px-4 py-3.5 shadow-sm backdrop-blur-md">
            <div class="flex items-center gap-3">
                <button @click="goBack" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 transition-all active:scale-95 hover:bg-gray-100">
                    <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"/>
                    </svg>
                </button>
                <h1 class="text-lg font-bold text-gray-800">六十四卦</h1>
            </div>
        </header>

        <main class="px-4 py-5 space-y-6">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg viewBox="0 0 24 24" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                </div>
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索卦名、卦性..."
                    class="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm"
                />
                <button v-if="searchQuery" @click="clearSearch" class="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>

            <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    v-for="cat in categories"
                    :key="cat"
                    @click="selectedCategory = cat"
                    :class="[
                        'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all',
                        selectedCategory === cat
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                            : 'bg-white/80 text-gray-600 hover:bg-white shadow-sm'
                    ]"
                >
                    {{ cat }}
                </button>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div
                    v-for="hex in filteredHexagrams"
                    :key="hex.id"
                    @click="goToDetail(hex)"
                    class="rounded-xl p-4 shadow-sm border border-gray-100 bg-white transition-all duration-200 active:scale-[0.98] hover:shadow-md hover:-translate-y-0.5 hover:border-blue-100 cursor-pointer"
                >
                    <div class="flex items-center gap-3">
                        <div class="flex-shrink-0 w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center">
                            <HexagramFigure :code="hex.symbol" gap-class="gap-1" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between mb-1.5">
                                <span class="text-sm font-bold text-gray-800">{{ hex.name }}</span>
                                <span :class="[
                                    'px-2.5 py-0.5 rounded-full text-[10px] font-bold',
                                    getFortune(hex.id) === '吉' ? 'bg-emerald-100/80 text-emerald-700' :
                                    getFortune(hex.id) === '凶' ? 'bg-red-100/80 text-red-700' :
                                    'bg-yellow-100/80 text-yellow-700'
                                ]">
                                    {{ getFortune(hex.id) }}
                                </span>
                            </div>
                            <div class="text-xs text-gray-600/80 truncate mb-1">{{ hex.nature }}</div>
                            <div class="text-[10px] text-gray-400/70">第{{ hex.id }}卦</div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredHexagrams.length === 0" class="text-center py-16">
                <div class="text-gray-400 text-sm">未找到匹配的卦</div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAllHexagrams, getLiteratureByHexagramId, getCategories, type Hexagram } from '../dao/hexagramDao';
import HexagramFigure from '../components/HexagramFigure.vue';

const router = useRouter();
const searchQuery = ref('');
const selectedCategory = ref('全部');

const categories = getCategories();

const filteredHexagrams = computed(() => {
    let result = getAllHexagrams();
    
    if (selectedCategory.value !== '全部') {
        result = result.filter(h => h.category === selectedCategory.value);
    }
    
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(h => 
            h.name.toLowerCase().includes(query) ||
            h.nature.toLowerCase().includes(query) ||
            h.category.toLowerCase().includes(query)
        );
    }
    
    return result;
});

const getFortune = (id: number): string => {
    const literature = getLiteratureByHexagramId(id);
    return literature?.fortune || '';
};

const goBack = (): void => {
    router.back();
};

const clearSearch = (): void => {
    searchQuery.value = '';
};

const goToDetail = (hex: Hexagram): void => {
    router.push({ name: 'hexagram-detail', params: { symbol: hex.symbol } });
};
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
