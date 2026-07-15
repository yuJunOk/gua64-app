<template>
    <div class="min-h-full bg-gradient-to-b from-blue-50 to-white pb-6">
        <header class="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
            <div class="flex items-center gap-3">
                <AppLogo size="2.25rem" />
                <h1 class="text-lg font-bold text-gray-800">易经算卦</h1>
            </div>
            <div class="flex items-center gap-1.5 bg-blue-50 rounded-full px-2.5 py-1.5">
                <span class="text-xs font-medium text-blue-600">{{ divinationMode === DivinationMode.Manual ? `${getModeIcon(DivinationMode.Manual)} ${getModeLabel(DivinationMode.Manual)}` : `${getModeIcon(DivinationMode.Auto)} ${getModeLabel(DivinationMode.Auto)}` }}</span>
            </div>
        </header>

        <main class="px-4 py-5 space-y-4">
            <van-floating-bubble
                axis="y"
                :gap="{ x: 24, y: 80 }"
                v-model:offset="bubbleOffset"
                @offset-change="handleBubbleOffsetChange"
                @click="toggleDivinationMode"
            >
                <template #default>
                    <div class="flex h-full w-full items-center justify-center">
                        <svg v-if="divinationMode === DivinationMode.Auto" viewBox="0 0 24 24" class="h-6 w-6 text-white" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="6" y="6" width="12" height="12" rx="2" />
                            <circle cx="10" cy="10" r="1.5" />
                            <circle cx="14" cy="14" r="1.5" />
                        </svg>
                        <svg v-else viewBox="0 0 24 24" class="h-6 w-6 text-white" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 19V5M8 12l4-4 4 4" />
                            <path d="M6 15h12" />
                        </svg>
                    </div>
                </template>
            </van-floating-bubble>

            <div v-if="divinationMode === DivinationMode.Auto" class="space-y-6">
                <div v-if="!isDivining && !isComplete" class="space-y-4">
                    <div class="rounded-xl bg-white/78 py-10 text-center shadow-sm backdrop-blur-sm">
                        <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100 p-3 shadow-[0_10px_24px_rgba(59,130,246,0.08)] ring-8 ring-blue-50/50">
                            <TaijiIcon size="xl" />
                        </div>
                        <h2 class="text-xl font-bold text-gray-800 mb-2">诚心问卜</h2>
                        <p class="text-gray-600 text-sm">静心凝神，默念所求之事</p>
                    </div>

                    <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">所问之事</label>
                        <textarea
                            v-model="questionInput"
                            placeholder="请输入您想要问的事情，例如：事业发展、感情婚姻、财运健康等..."
                            class="w-full rounded-[14px] border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 resize-none focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            rows="3"
                            maxlength="200"
                        ></textarea>
                        <div class="text-right mt-2">
                            <span class="text-xs text-gray-400">{{ questionInput.length }}/200</span>
                        </div>
                        <div class="mt-3 flex flex-wrap gap-2">
                            <button
                                v-for="category in QUESTION_CATEGORIES"
                                :key="category"
                                :class="['px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                                    questionInput === getDefaultQuestion(category) ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-gray-600 hover:bg-slate-200']"
                                @click="questionInput = getDefaultQuestion(category)"
                            >
                                {{ getQuestionCategoryLabel(category) }}
                            </button>
                        </div>
                    </div>

                    <button @click="startDivination"
                        class="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(37,99,235,0.26)] transition-all duration-300 active:scale-95 hover:shadow-[0_22px_42px_rgba(37,99,235,0.3)]">
                        开始算卦
                    </button>
                </div>

                <div v-if="isDivining" class="space-y-6">
                    <div class="rounded-xl bg-white/88 p-5 shadow-sm">
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

                    <div class="rounded-xl bg-white/88 p-6 shadow-sm">
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

                    <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                        <h4 class="text-sm font-bold text-gray-800 mb-3">爻值记录</h4>
                        <div class="grid grid-cols-6 gap-2">
                            <div v-for="(yao, index) in yaoValues" :key="index" class="rounded-[14px] bg-blue-50/80 p-2 text-center ring-1 ring-blue-100/80">
                                <div class="text-lg font-bold text-blue-700">{{ yao }}</div>
                                <div class="text-xs text-gray-500">{{ 6 - index }}爻</div>
                            </div>
                            <div v-for="i in (totalSteps - yaoValues.length)" :key="`empty-${i}`" class="rounded-[14px] bg-slate-50 p-2 text-center ring-1 ring-slate-100/80">
                                <div class="text-lg font-bold text-gray-300">-</div>
                                <div class="text-xs text-gray-400">{{ 6 - (yaoValues.length + i - 1) }}爻</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="isComplete && divinationResult" class="space-y-6">
                    <div class="text-center">
                        <h3 class="text-lg font-bold text-gray-800">算卦结果</h3>
                        <p v-if="questionInput" class="text-sm text-gray-500 mt-1">所问之事：{{ questionInput }}</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                            <h4 class="text-sm font-bold text-blue-700 mb-3">本卦：{{ divinationResult.originalHexagram.name }}</h4>
                            <HexagramFigure
                                class="mb-2"
                                :code="divinationResult.originalHexagram.symbol"
                                :yao-data="yaoValues"
                                highlight-moving
                            />
                            <p class="text-gray-600 text-xs leading-relaxed text-center mt-2">{{ divinationResult.originalHexagram.nature }}</p>
                        </div>

                        <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                            <h4 class="text-sm font-bold text-orange-600 mb-3">变卦：{{ divinationResult.changedHexagram.name }}</h4>
                            <HexagramFigure
                                class="mb-3"
                                :code="divinationResult.changedHexagram.symbol"
                                :highlight-moving="false"
                            />
                            <p class="text-gray-600 text-xs leading-relaxed text-center">{{ divinationResult.changedHexagram.nature }}</p>
                        </div>
                    </div>

                    <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                        <h4 class="text-sm font-bold text-gray-800 mb-3">解卦结果</h4>
                        <div v-if="divinationResult.interpretation" class="space-y-3">
                            <div class="flex items-center gap-2">
                                <span class="px-2 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                                    {{ getScenarioLabel(divinationResult.interpretation.scenario) }}
                                </span>
                            </div>
                            <div v-if="divinationResult.interpretation.primaryText" class="p-3 rounded-[14px] bg-blue-50 border border-blue-100">
                                <p class="text-sm text-gray-800 leading-relaxed">{{ divinationResult.interpretation.primaryText }}</p>
                            </div>
                            <div v-if="divinationResult.interpretation.secondaryText" class="p-3 rounded-[14px] bg-orange-50 border border-orange-100">
                                <p class="text-sm text-gray-800 leading-relaxed">{{ divinationResult.interpretation.secondaryText }}</p>
                            </div>
                            <div v-if="divinationResult.interpretation.yaoTexts?.length" class="space-y-2">
                                <div v-for="yao in divinationResult.interpretation.yaoTexts" :key="yao.position" 
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
                            <div v-if="divinationResult.interpretation.notes?.length" class="space-y-1">
                                <p v-for="(note, index) in divinationResult.interpretation.notes" :key="index" class="text-xs text-gray-500 flex items-start gap-1">
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
                                v-for="row in originalYaoRows"
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

                    <div>
                        <button @click="resetDivination" class="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(37,99,235,0.24)] transition-all duration-300 active:scale-95 hover:shadow-[0_22px_42px_rgba(37,99,235,0.3)]">
                            重新算卦
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="divinationMode === DivinationMode.Manual" class="space-y-6">
                <div class="rounded-xl bg-white/76 py-8 text-center shadow-sm backdrop-blur-sm">
                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100">
                        <span class="text-3xl">✍️</span>
                    </div>
                    <h2 class="text-lg font-bold text-gray-800 mb-2">手动输入爻值</h2>
                    <p class="text-gray-600 text-sm">从初爻到上爻依次输入</p>
                </div>

                <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">所问之事</label>
                    <textarea
                        v-model="questionInput"
                        placeholder="请输入您想要问的事情..."
                        class="w-full rounded-[14px] border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 resize-none focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        rows="2"
                        maxlength="200"
                    ></textarea>
                    <div class="mt-3 flex flex-wrap gap-2">
                        <button
                            v-for="category in QUESTION_CATEGORIES"
                            :key="category"
                            :class="['px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                                questionInput === getDefaultQuestion(category) ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-gray-600 hover:bg-slate-200']"
                            @click="questionInput = getDefaultQuestion(category)"
                        >
                            {{ getQuestionCategoryLabel(category) }}
                        </button>
                    </div>
                </div>

                <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                    <div class="space-y-3">
                        <div v-for="(_, index) in manualYaoValues" :key="index" class="flex items-center gap-3">
                            <span class="text-sm font-semibold text-gray-700 w-12">第{{ 6 - index }}爻</span>
                            <div class="flex-1 grid grid-cols-4 gap-2">
                                <button v-for="option in manualYaoOptions" :key="option"
                                    :class="['rounded-[14px] px-3 py-2.5 text-sm font-bold transition-all duration-300', manualYaoValues[index] === option ? 'bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.18)]' : 'bg-slate-50 text-slate-700 ring-1 ring-slate-100/80 hover:bg-slate-100']"
                                    @click="manualYaoValues[index] = option">
                                    {{ option }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <button @click="submitManualInput" class="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(37,99,235,0.24)] transition-all duration-300 active:scale-95 hover:shadow-[0_22px_42px_rgba(37,99,235,0.3)]">
                    提交算卦
                </button>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';
import { showToast, showFailToast } from 'vant';
import CoinFlip from '../components/CoinFlip.vue';
import HexagramFigure from '../components/HexagramFigure.vue';
import YaoLine from '../components/YaoLine.vue';
import { buildHexagramRows, getYaoLabel } from '../utils/yaoUtils';
import { DEFAULT_COIN_SET_ID } from '../assets/coins/coinSets';
import { useDivination } from '../composables/useDivination';
import { saveDivination } from '../dao/divinationDao';
import { interpretHexagram, getScenarioLabel } from '../utils/hexagramInterpreter';
import type { YaoType } from '../types';
import { YAO_TYPE_LIST, DivinationMode, isMovingYao, getDivinationModeIcon as getModeIcon, getDivinationModeLabel as getModeLabel, QUESTION_CATEGORIES, getQuestionCategoryLabel, getDefaultQuestion } from '../enums';
import AppLogo from '../components/AppLogo.vue';
import TaijiIcon from '../components/TaijiIcon.vue';

const manualYaoOptions: YaoType[] = YAO_TYPE_LIST;

const { getDivinationResult } = useDivination();

const isDivining = ref(false);
const bubbleOffset = ref({ x: 24, y: window.innerHeight - 120 });
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
const divinationMode = ref<DivinationMode>(DivinationMode.Auto);
const questionInput = ref('');

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

const waitForCoinFlipRefs = async () => {
    for (let i = 0; i < 20; i++) {
        if (coinFlipRefsReady()) return;
        await nextTick();
    }
};

const isComplete = computed(() => currentStep.value === totalSteps);
const steps = computed(() => Array.from({ length: totalSteps }, (_, i) => i + 1));

const originalYaoRows = computed(() => {
    if (!divinationResult.value) return [];
    const { originalHexagram } = divinationResult.value;
    return buildHexagramRows(originalHexagram.symbol, yaoValues.value);
});

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
        await completeDivination(DivinationMode.Auto);
    } catch (error) {
        console.error('算卦过程出错:', error);
        isDivining.value = false;
        showFailToast('算卦失败，请重试');
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

const completeDivination = async (type: DivinationMode) => {
    isDivining.value = false;
    divinationResult.value = getDivinationResult(yaoValues.value);
    
    const interpretation = interpretHexagram({
        originalHexagram: divinationResult.value.originalHexagram,
        changedHexagram: divinationResult.value.changedHexagram,
        yaoValues: yaoValues.value,
        movingYao: divinationResult.value.movingYao
    });
    divinationResult.value.interpretation = interpretation;

    const movingYaoPositions = divinationResult.value.movingYao;
    
    await saveDivination({
        created_at: new Date().toISOString(),
        divination_time: new Date().toISOString(),
        question: questionInput.value,
        title: divinationResult.value.originalHexagram.name,
        original_hexagram_seq: divinationResult.value.originalHexagram.id,
        changed_hexagram_seq: divinationResult.value.changedHexagram.id,
        yao_values: JSON.stringify(yaoValues.value),
        moving_yao_positions: JSON.stringify(movingYaoPositions),
        result_type: type,
        is_collected: 0,
        note: ''
    });
};

const resetDivination = () => {
    isDivining.value = false;
    currentStep.value = 0;
    yaoValues.value = [];
    divinationResult.value = null;
    questionInput.value = '';
    coins.value.forEach(coin => {
        coin.value = 0;
        coin.isFlipping = false;
    });
};

watch(divinationMode, (newMode) => {
    resetDivination();
    if (newMode === DivinationMode.Auto) {
        manualYaoValues.value = [null, null, null, null, null, null];
    }
});

const toggleDivinationMode = () => {
    divinationMode.value = divinationMode.value === DivinationMode.Auto ? DivinationMode.Manual : DivinationMode.Auto;
};

const handleBubbleOffsetChange = (offset: { x: number; y: number }) => {
    const headerHeight = 60;
    const tabBarHeight = 60;
    const bubbleSize = 48;
    const minY = headerHeight + 16;
    const maxY = window.innerHeight - tabBarHeight - bubbleSize - 16;
    
    if (offset.y < minY) {
        bubbleOffset.value = { ...offset, y: minY };
    } else if (offset.y > maxY) {
        bubbleOffset.value = { ...offset, y: maxY };
    }
};

const submitManualInput = async () => {
    const slots = manualYaoValues.value;
    const validInput = slots.every(
        (value): value is YaoType => value !== null && YAO_TYPE_LIST.includes(value),
    );
    if (!validInput) {
        showToast('请为六爻各选一爻值');
        return;
    }
    yaoValues.value = slots.slice() as YaoType[];
    try {
        await completeDivination(DivinationMode.Manual);
    } catch (error) {
        console.error('保存手动算卦结果失败:', error);
        showFailToast('保存失败，请重试');
    }
};
</script>