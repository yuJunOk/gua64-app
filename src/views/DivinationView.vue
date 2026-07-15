<template>
    <div class="min-h-full bg-gradient-to-b from-blue-50 to-white pb-6">
        <!-- 顶部导航 -->
        <header class="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
            <div class="flex items-center gap-3">
                <AppLogo size="2.25rem" />
                <h1 class="text-lg font-bold text-gray-800">易经算卦</h1>
            </div>
            <div class="flex items-center gap-1.5 bg-blue-50 rounded-full px-2.5 py-1.5">
                <span class="text-xs font-medium text-blue-600">{{ isManualMode ? '✍️ 手动' : '🎲 自动' }}</span>
            </div>
        </header>

        <!-- 主内容区 -->
        <main class="px-4 py-5 space-y-4">
            <!-- FloatingBubble 模式切换 -->
            <van-floating-bubble
                axis="y"
                :gap="{ x: 24, y: 80 }"
                v-model:offset="bubbleOffset"
                @offset-change="handleBubbleOffsetChange"
                @click="isManualMode = !isManualMode"
            >
                <template #default>
                    <div class="flex h-full w-full items-center justify-center">
                        <svg v-if="!isManualMode" viewBox="0 0 24 24" class="h-6 w-6 text-white" fill="none" stroke="currentColor" stroke-width="2">
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

            <!-- 自动算卦模式 -->
            <div v-if="!isManualMode" class="space-y-6">
                <!-- 初始状态 -->
                <div v-if="!isDivining && !isComplete" class="rounded-xl bg-white/78 py-10 text-center shadow-sm backdrop-blur-sm">
                    <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100 p-3 shadow-[0_10px_24px_rgba(59,130,246,0.08)] ring-8 ring-blue-50/50">
                        <TaijiIcon size="xl" />
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-2">诚心问卜</h2>
                    <p class="text-gray-600 text-sm mb-8">静心凝神，默念所求之事</p>
                    <button @click="startDivination"
                        class="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(37,99,235,0.26)] transition-all duration-300 active:scale-95 hover:shadow-[0_22px_42px_rgba(37,99,235,0.3)]">
                        开始算卦
                    </button>
                </div>

                <!-- 算卦过程 -->
                <div v-if="isDivining" class="space-y-6">
                    <!-- 进度 -->
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

                    <!-- 硬币动画 -->
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

                    <!-- 爻值记录 -->
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

                <!-- 算卦结果 -->
                <div v-if="isComplete && divinationResult" class="space-y-6">
                    <!-- 结果标题 -->
                    <div class="text-center">
                        <h3 class="text-lg font-bold text-gray-800">算卦结果</h3>
                    </div>

                    <!-- 卦象展示 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- 本卦 -->
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

                        <!-- 变卦 -->
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

                    <!-- 六爻详情 -->
                    <div class="rounded-xl bg-white/88 p-5 shadow-sm">
                        <h4 class="text-sm font-bold text-gray-800 mb-3">六爻详情</h4>
                        <div class="space-y-2">
                            <div
                                v-for="row in originalYaoRows"
                                :key="row.indexFromBottom"
                                :class="['flex items-center justify-between gap-4 rounded-[14px] px-3 py-2.5 text-sm ring-1', row.yaoType && (row.yaoType === 6 || row.yaoType === 9) ? 'bg-orange-50 ring-orange-100/80' : 'bg-slate-50 ring-slate-100/80']"
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
                    <div>
                        <button @click="resetDivination" class="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(37,99,235,0.24)] transition-all duration-300 active:scale-95 hover:shadow-[0_22px_42px_rgba(37,99,235,0.3)]">
                            重新算卦
                        </button>
                    </div>
                </div>
            </div>

            <!-- 手动输入模式 -->
            <div v-if="isManualMode" class="space-y-6">
                <div class="rounded-xl bg-white/76 py-8 text-center shadow-sm backdrop-blur-sm">
                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100">
                        <span class="text-3xl">✍️</span>
                    </div>
                    <h2 class="text-lg font-bold text-gray-800 mb-2">手动输入爻值</h2>
                    <p class="text-gray-600 text-sm">从初爻到上爻依次输入</p>
                </div>

                <!-- 爻值输入 -->
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

                <!-- 提交按钮 -->
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
import { buildHexagramRows, getYaoKindLabel } from '../utils/yaoUtils';
import { DEFAULT_COIN_SET_ID } from '../assets/coins/coinSets';
import { useDivination } from '../composables/useDivination';
import { saveResult } from '../dao/historyDao';
import type { YaoType } from '../types';
import AppLogo from '../components/AppLogo.vue';
import TaijiIcon from '../components/TaijiIcon.vue';

const manualYaoOptions: YaoType[] = [6, 7, 8, 9];

const { getDivinationResult } = useDivination();

// 状态管理
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
const isManualMode = ref(false);

/** 当前算卦使用的硬币套装（后续可接用户设置） */
const activeCoinSetId = ref(DEFAULT_COIN_SET_ID);

const coinFlipRefs: InstanceType<typeof CoinFlip>[] = [];

/** 收集硬币组件实例；el 为空时清掉旧引用，副作用是更新本地 ref 列表 */
const setCoinFlipRef = (el: unknown, index: number) => {
    if (el) {
        coinFlipRefs[index] = el as InstanceType<typeof CoinFlip>;
    } else {
        delete coinFlipRefs[index];
    }
};

/** 判断三枚硬币组件是否都已挂载；无入参，返回布尔值，无副作用 */
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
    return buildHexagramRows(originalHexagram.symbol, yaoValues.value);
});

// 方法
/** 执行完整自动算卦流程；无入参无返回，异常时中断并重置进行中状态 */
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
        showFailToast('算卦失败，请重试');
    }
};

/** 驱动三枚铜钱抛掷动画并写回结果；无入参无返回，副作用是更新 coins 状态 */
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

/** 根据三枚铜钱点数求爻值；无入参返回 6/7/8/9，异常和脏值回退为 7 */
const calculateYao = (): YaoType => {
    const sum = coins.value.reduce((acc, coin) => acc + coin.value, 0);
    if (sum === 6 || sum === 7 || sum === 8 || sum === 9) {
        return sum;
    }
    return 7;
};

/** 结束一次算卦并落库；入参为来源类型，副作用是生成结果并保存历史 */
const completeDivination = async (type: string) => {
    isDivining.value = false;
    divinationResult.value = getDivinationResult(yaoValues.value);
    await saveResult({
        hexagram_name: divinationResult.value.originalHexagram.name,
        result_type: type,
        yao_data: JSON.stringify(yaoValues.value)
    });
};

/** 清空当前算卦过程状态；无入参无返回，副作用是重置动画与结果数据 */
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

/** 监听模式切换；模式变化时重置算卦状态，避免状态残留 */
watch(isManualMode, (newMode) => {
    resetDivination();
    if (!newMode) {
        manualYaoValues.value = [null, null, null, null, null, null];
    }
});

/** 限制浮动气泡拖拽范围；避免挡住 header 和 TabBar */
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

/** 校验并提交手动六爻；缺失任一爻值则阻止提交，副作用是保存一条历史记录 */
const submitManualInput = async () => {
    const slots = manualYaoValues.value;
    const validInput = slots.every(
        (value): value is YaoType => value !== null && [6, 7, 8, 9].includes(value),
    );
    if (!validInput) {
        showToast('请为六爻各选一爻值');
        return;
    }
    yaoValues.value = slots.slice() as YaoType[];
    try {
        await completeDivination('manual');
    } catch (error) {
        console.error('保存手动算卦结果失败:', error);
        showFailToast('保存失败，请重试');
    }
};



</script>