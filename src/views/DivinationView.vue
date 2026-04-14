<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
        <!-- 顶部导航 -->
        <header class="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="text-3xl">☯</div>
                <h1 class="text-lg font-bold text-gray-800">易经算卦</h1>
            </div>
            <button @click="goToHistory"
                class="bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-full text-sm hover:bg-blue-200 transition-colors">
                历史记录
            </button>
        </header>

        <!-- 主内容区 -->
        <main class="px-4 py-6">
            <!-- 模式切换 -->
            <div class="flex gap-3 mb-8">
                <button :class="['flex-1 py-3 px-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2',
                    !isManualMode
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-300']" @click="switchToAutoMode">
                    <span>🎲</span>
                    <span>自动算卦</span>
                </button>
                <button :class="['flex-1 py-3 px-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2',
                    isManualMode
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-300']" @click="switchToManualMode">
                    <span>✍️</span>
                    <span>手动输入</span>
                </button>
            </div>

            <!-- 自动算卦模式 -->
            <div v-if="!isManualMode" class="space-y-6">
                <!-- 初始状态 -->
                <div v-if="!isDivining && !isComplete" class="text-center py-8">
                    <div class="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6">
                        <span class="text-5xl">☯</span>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-2">诚心问卜</h2>
                    <p class="text-gray-600 text-sm mb-8">静心凝神，默念所求之事</p>
                    <button @click="startDivination"
                        class="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-10 rounded-full text-sm shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                        开始算卦
                    </button>
                </div>

                <!-- 算卦过程 -->
                <div v-if="isDivining" class="space-y-6">
                    <!-- 进度 -->
                    <div class="bg-white rounded-xl p-5 shadow-md">
                        <div class="text-center mb-4">
                            <h3 class="text-base font-bold text-gray-800">正在算卦</h3>
                            <p class="text-blue-600 font-bold text-xl mt-1">第 {{ currentStep }} / {{ totalSteps }} 爻</p>
                        </div>
                        <div class="flex justify-center gap-2">
                            <div v-for="step in steps" :key="step" :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all',
                                step < currentStep ? 'bg-blue-500 text-white' :
                                    step === currentStep ? 'bg-blue-600 text-white ring-2 ring-blue-200' :
                                        'bg-gray-200 text-gray-400']">
                                {{ step }}
                            </div>
                        </div>
                    </div>

                    <!-- 硬币动画 -->
                    <div class="bg-white rounded-xl p-6 shadow-md">
                        <div class="flex justify-center gap-4">
                            <div v-for="(coin, index) in coins" :key="index" :class="['w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-2 transition-all',
                                coin.isFlipping ? 'animate-spin border-blue-400 bg-blue-50' :
                                    coin.value === 3 ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-gray-100 border-gray-400 text-gray-600']">
                                {{ coin.isFlipping ? '?' : coin.value === 3 ? '阳' : '阴' }}
                            </div>
                        </div>
                    </div>

                    <!-- 爻值记录 -->
                    <div class="bg-white rounded-xl p-5 shadow-md">
                        <h4 class="text-sm font-bold text-gray-800 mb-3">爻值记录</h4>
                        <div class="grid grid-cols-6 gap-2">
                            <div v-for="(yao, index) in yaoValues" :key="index" class="bg-blue-50 rounded-lg p-2 text-center">
                                <div class="text-lg font-bold text-blue-700">{{ yao }}</div>
                                <div class="text-xs text-gray-500">{{ 6 - index }}爻</div>
                            </div>
                            <div v-for="i in (totalSteps - yaoValues.length)" :key="`empty-${i}`" class="bg-gray-100 rounded-lg p-2 text-center">
                                <div class="text-lg font-bold text-gray-300">-</div>
                                <div class="text-xs text-gray-400">{{ 6 - (yaoValues.length + i - 1) }}爻</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 算卦结果 -->
                <div v-if="isComplete && divinationResult" class="space-y-6">
                    <!-- 结果标题 -->
                    <div class="text-center">
                        <h3 class="text-lg font-bold text-gray-800">算卦结果</h3>
                    </div>

                    <!-- 卦象展示 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- 本卦 -->
                        <div class="bg-white rounded-xl p-5 shadow-md">
                            <h4 class="text-sm font-bold text-blue-700 mb-3">本卦：{{ divinationResult.originalHexagram.name }}</h4>
                            <div class="flex flex-col items-center gap-1 mb-3">
                                <div v-for="(yao, index) in divinationResult.originalHexagram.code.split('').reverse()" :key="index"
                                    :class="['h-2 rounded-full', yao === '1' ? 'w-14 bg-gray-800' : 'w-14 bg-gray-800 relative']">
                                    <div v-if="yao === '0'" class="absolute left-1/2 top-0 w-3 h-2 bg-white transform -translate-x-1/2"></div>
                                </div>
                            </div>
                            <p class="text-gray-600 text-xs leading-relaxed text-center">{{ divinationResult.originalHexagram.desc }}</p>
                        </div>

                        <!-- 变卦 -->
                        <div class="bg-white rounded-xl p-5 shadow-md">
                            <h4 class="text-sm font-bold text-orange-600 mb-3">变卦：{{ divinationResult.changedHexagram.name }}</h4>
                            <div class="flex flex-col items-center gap-1 mb-3">
                                <div v-for="(yao, index) in divinationResult.changedHexagram.code.split('').reverse()" :key="index"
                                    :class="['h-2 rounded-full', yao === '1' ? 'w-14 bg-orange-600' : 'w-14 bg-orange-600 relative']">
                                    <div v-if="yao === '0'" class="absolute left-1/2 top-0 w-3 h-2 bg-white transform -translate-x-1/2"></div>
                                </div>
                            </div>
                            <p class="text-gray-600 text-xs leading-relaxed text-center">{{ divinationResult.changedHexagram.desc }}</p>
                        </div>
                    </div>

                    <!-- 爻值详情 -->
                    <div class="bg-white rounded-xl p-5 shadow-md">
                        <h4 class="text-sm font-bold text-gray-800 mb-3">六爻详情</h4>
                        <div class="space-y-2">
                            <div v-for="(yao, index) in yaoValues" :key="index" :class="['flex items-center justify-between p-3 rounded-lg text-sm',
                                (yao === 6 || yao === 9) ? 'bg-orange-50 border-l-4 border-orange-400' : 'bg-gray-50']">
                                <div class="flex items-center gap-2">
                                    <span class="font-semibold text-gray-700">第{{ 6 - index }}爻</span>
                                    <span class="text-gray-500 text-xs">{{ yao === 9 ? '老阳' : yao === 6 ? '老阴' : yao === 7 ? '少阳' : '少阴' }}</span>
                                </div>
                                <span class="font-bold" :class="yao % 2 === 1 ? 'text-blue-600' : 'text-gray-600'">{{ yao }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 操作按钮 -->
                    <div class="flex gap-4">
                        <button @click="resetDivination" class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-full text-sm shadow-lg hover:shadow-xl transition-all">
                            重新算卦
                        </button>
                        <button @click="goToHistory" class="flex-1 bg-white text-blue-700 font-bold py-3 px-6 rounded-full text-sm border border-blue-600 shadow-md hover:bg-blue-50 transition-all">
                            查看历史
                        </button>
                    </div>
                </div>
            </div>

            <!-- 手动输入模式 -->
            <div v-if="isManualMode" class="space-y-6">
                <div class="text-center py-4">
                    <div class="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <span class="text-3xl">✍️</span>
                    </div>
                    <h2 class="text-lg font-bold text-gray-800 mb-2">手动输入爻值</h2>
                    <p class="text-gray-600 text-sm">从初爻到上爻依次输入</p>
                </div>

                <!-- 爻值输入 -->
                <div class="bg-white rounded-xl p-5 shadow-md">
                    <div class="space-y-3">
                        <div v-for="(_, index) in manualYaoValues" :key="index" class="flex items-center gap-3">
                            <span class="text-sm font-semibold text-gray-700 w-12">第{{ 6 - index }}爻</span>
                            <div class="flex-1 grid grid-cols-4 gap-2">
                                <button v-for="option in [6, 7, 8, 9]" :key="option"
                                    :class="['py-2 px-3 rounded-lg font-bold text-sm transition-all', manualYaoValues[index] === option ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
                                    @click="manualYaoValues[index] = option">
                                    {{ option }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 提交按钮 -->
                <button @click="submitManualInput" class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-10 rounded-full text-sm shadow-lg hover:shadow-xl transition-all">
                    提交算卦
                </button>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDivination } from '../useDivination';
import { saveResult } from '../db';
import type { YaoType } from '../types';

const router = useRouter();
const { getDivinationResult } = useDivination();

// 状态管理
const isDivining = ref(false);
const currentStep = ref(0);
const totalSteps = 6;
const coins = ref<Array<{ value: number; isFlipping: boolean }>>([
    { value: 0, isFlipping: false },
    { value: 0, isFlipping: false },
    { value: 0, isFlipping: false }
]);
const yaoValues = ref<YaoType[]>([]);
const divinationResult = ref<any>(null);
const manualYaoValues = ref<YaoType[]>([0, 0, 0, 0, 0, 0]);
const isManualMode = ref(false);

// 计算属性
const isComplete = computed(() => currentStep.value === totalSteps);
const steps = computed(() => Array.from({ length: totalSteps }, (_, i) => i + 1));

// 方法
const startDivination = async () => {
    isDivining.value = true;
    currentStep.value = 0;
    yaoValues.value = [];
    divinationResult.value = null;

    try {
        for (let i = 0; i < totalSteps; i++) {
            currentStep.value = i + 1;
            await flipCoins();
            const yao = await calculateYao();
            yaoValues.value.push(yao);
            await new Promise(resolve => setTimeout(resolve, 800));
        }
        await completeDivination('auto');
    } catch (error) {
        console.error('算卦过程出错:', error);
        isDivining.value = false;
    }
};

const flipCoins = async () => {
    coins.value.forEach(coin => coin.isFlipping = true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    coins.value.forEach(coin => {
        coin.value = Math.random() > 0.5 ? 3 : 2;
        coin.isFlipping = false;
    });
};

const calculateYao = () => {
    return coins.value.reduce((acc, coin) => acc + coin.value, 0);
};

const completeDivination = async (type: string) => {
    isDivining.value = false;
    divinationResult.value = getDivinationResult(yaoValues.value);
    await saveResult({
        hexagram_name: divinationResult.value.originalHexagram.name,
        result_type: type,
        yao_data: JSON.stringify(yaoValues.value)
    });
};

const resetDivination = () => {
    isDivining.value = false;
    currentStep.value = 0;
    yaoValues.value = [];
    divinationResult.value = null;
    coins.value.forEach(coin => {
        coin.value = 0;
        coin.isFlipping = false;
    });
};

const switchToManualMode = () => {
    isManualMode.value = true;
    resetDivination();
};

const switchToAutoMode = () => {
    isManualMode.value = false;
    resetDivination();
    manualYaoValues.value = [0, 0, 0, 0, 0, 0];
};

const submitManualInput = async () => {
    const validInput = manualYaoValues.value.every(value => [6, 7, 8, 9].includes(value));
    if (!validInput) {
        alert('请输入有效的爻值（6、7、8、9）');
        return;
    }
    yaoValues.value = manualYaoValues.value;
    await completeDivination('manual');
};

const goToHistory = () => {
    router.push('/history');
};

onMounted(() => { });
</script>

<style scoped>
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.animate-spin {
    animation: spin 0.4s linear infinite;
}
</style>