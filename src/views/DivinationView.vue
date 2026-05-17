<template>
    <div class="min-h-full bg-gradient-to-b from-blue-50 to-white pb-6">
        <!-- 顶部导航 -->
        <header class="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <AppLogo size="2.25rem" />
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
                    <div class="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6 p-3">
                        <AppLogo size="4.5rem" radius="full" />
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
                        <div class="flex justify-center gap-5">
                            <div
                                v-for="(coin, index) in coins"
                                :key="index"
                                class="flex flex-col items-center gap-2"
                            >
                                <CoinFlip
                                    :ref="(el) => setCoinFlipRef(el, index)"
                                    :coin-set-id="activeCoinSetId"
                                    size="4rem"
                                />
                                <span
                                    v-if="coin.isFlipping"
                                    class="text-xs font-medium text-gray-400"
                                >抛掷中</span>
                                <span
                                    v-else-if="coin.value"
                                    class="text-sm font-bold"
                                    :class="coin.value === 3 ? 'text-blue-600' : 'text-gray-600'"
                                >{{ coin.value === 3 ? '阳' : '阴' }}</span>
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
                            <HexagramFigure
                                class="mb-2"
                                :code="divinationResult.originalHexagram.code"
                                :yao-data="yaoValues"
                                highlight-moving
                            />
                            <p class="text-gray-600 text-xs leading-relaxed text-center mt-2">{{ divinationResult.originalHexagram.desc }}</p>
                        </div>

                        <!-- 变卦 -->
                        <div class="bg-white rounded-xl p-5 shadow-md">
                            <h4 class="text-sm font-bold text-orange-600 mb-3">变卦：{{ divinationResult.changedHexagram.name }}</h4>
                            <HexagramFigure
                                class="mb-3"
                                :code="divinationResult.changedHexagram.code"
                                :highlight-moving="false"
                            />
                            <p class="text-gray-600 text-xs leading-relaxed text-center">{{ divinationResult.changedHexagram.desc }}</p>
                        </div>
                    </div>

                    <!-- 六爻详情 -->
                    <div class="bg-white rounded-xl p-5 shadow-md">
                        <h4 class="text-sm font-bold text-gray-800 mb-3">六爻详情</h4>
                        <div class="space-y-2">
                            <div
                                v-for="row in originalYaoRows"
                                :key="row.indexFromBottom"
                                :class="['flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm', row.yaoType && (row.yaoType === 6 || row.yaoType === 9) ? 'bg-orange-50' : 'bg-gray-50']"
                            >
                                <div class="min-w-0">
                                    <span class="font-semibold text-gray-700">{{ row.positionName }}</span>
                                    <span v-if="row.yaoType != null" class="ml-2 text-xs text-gray-500">{{ getYaoKindLabel(row.yaoType) }}</span>
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
                                <button v-for="option in manualYaoOptions" :key="option"
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
import { ref, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import CoinFlip from '../components/CoinFlip.vue';
import HexagramFigure from '../components/HexagramFigure.vue';
import YaoLine from '../components/YaoLine.vue';
import { buildHexagramRows, getYaoKindLabel } from '../utils/yaoUtils';
import { DEFAULT_COIN_SET_ID } from '../assets/coins/coinSets';
import { useDivination } from '../composables/useDivination';
import { saveResult } from '../db';
import type { YaoType } from '../types';

const manualYaoOptions: YaoType[] = [6, 7, 8, 9];

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
const manualYaoValues = ref<(YaoType | null)[]>([null, null, null, null, null, null]);
const isManualMode = ref(false);

/** 当前算卦使用的硬币套装（后续可接用户设置） */
const activeCoinSetId = ref(DEFAULT_COIN_SET_ID);

const coinFlipRefs: InstanceType<typeof CoinFlip>[] = [];

const setCoinFlipRef = (el: unknown, index: number) => {
    if (el) {
        coinFlipRefs[index] = el as InstanceType<typeof CoinFlip>;
    } else {
        delete coinFlipRefs[index];
    }
};

const coinFlipRefsReady = () =>
    coins.value.every((_, i) => coinFlipRefs[i] != null);

/** 等铜钱组件挂载完成（首轮 isDivining 刚打开时 ref 会晚一拍） */
const waitForCoinFlipRefs = async () => {
    for (let i = 0; i < 20; i++) {
        if (coinFlipRefsReady()) return;
        await nextTick();
    }
};

// 计算属性
const isComplete = computed(() => currentStep.value === totalSteps);
const steps = computed(() => Array.from({ length: totalSteps }, (_, i) => i + 1));

const originalYaoRows = computed(() => {
    if (!divinationResult.value) return [];
    const { originalHexagram } = divinationResult.value;
    return buildHexagramRows(originalHexagram.code, yaoValues.value);
});

// 方法
const startDivination = async () => {
    isDivining.value = true;
    currentStep.value = 0;
    yaoValues.value = [];
    divinationResult.value = null;

    try {
        await nextTick();
        await waitForCoinFlipRefs();
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
    coins.value.forEach((coin) => {
        coin.isFlipping = true;
        coin.value = 0;
    });

    const results = coins.value.map(() => (Math.random() > 0.5 ? 3 : 2));

    await waitForCoinFlipRefs();

    await Promise.all(
        coins.value.map((_, i) => {
            const yang = results[i] === 3;
            return coinFlipRefs[i]?.flip(yang) ?? Promise.resolve();
        }),
    );

    coins.value.forEach((coin, i) => {
        coin.value = results[i]!;
        coin.isFlipping = false;
    });
};

const calculateYao = (): YaoType => {
    const sum = coins.value.reduce((acc, coin) => acc + coin.value, 0);
    if (sum === 6 || sum === 7 || sum === 8 || sum === 9) {
        return sum;
    }
    return 7;
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
    manualYaoValues.value = [null, null, null, null, null, null];
};

const submitManualInput = async () => {
    const slots = manualYaoValues.value;
    const validInput = slots.every(
        (value): value is YaoType => value !== null && [6, 7, 8, 9].includes(value),
    );
    if (!validInput) {
        alert('请为六爻各选一爻值（6、7、8、9）');
        return;
    }
    yaoValues.value = slots.slice() as YaoType[];
    await completeDivination('manual');
};

const goToHistory = () => {
    router.push('/history');
};

</script>