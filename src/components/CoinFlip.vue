<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import {
  DEFAULT_COIN_SET_ID,
  getCoinSet,
  type CoinSetId,
} from '../assets/coins/coinSets';

const props = withDefaults(
  defineProps<{
    /** 硬币套装 id，与 obvSrc/revSrc 二选一；未传图时走套装 */
    coinSetId?: CoinSetId;
    /** 正面图 URL（覆盖 coinSetId） */
    obvSrc?: string;
    /** 背面图 URL（覆盖 coinSetId） */
    revSrc?: string;
    /** CSS 宽高，如 5rem、80px */
    size?: string;
    /** 是否正在翻转（可外部驱动，与内部 flip 叠加） */
    spinning?: boolean;
  }>(),
  {
    coinSetId: DEFAULT_COIN_SET_ID,
    size: '5rem',
    spinning: false,
  },
);

const coinSet = computed(() => getCoinSet(props.coinSetId));
const obvUrl = computed(() => props.obvSrc ?? coinSet.value.obv);
const revUrl = computed(() => props.revSrc ?? coinSet.value.rev);
const ariaLabel = computed(() => `${coinSet.value.label}铜钱`);

const rotationY = ref(0);
const isAnimating = ref(false);

const transformStyle = computed(() => ({
  transform: `rotateY(${rotationY.value}deg)`,
}));

const busy = computed(() => props.spinning || isAnimating.value);

const FLIP_MS = 850;

const afterPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

/** 抛掷翻转：多圈后停在正面或背面；未传 endOnObv 则随机 */
const flip = async (endOnObv?: boolean) => {
  if (busy.value) return;
  isAnimating.value = true;

  const extraTurns = 2 + Math.floor(Math.random() * 2);
  const endObv = endOnObv ?? Math.random() > 0.5;
  const currentSide = ((rotationY.value % 360) + 360) % 360;
  const targetSide = endObv ? 0 : 180;
  let delta = targetSide - currentSide;
  if (delta <= 0) delta += 360;

  await nextTick();
  await afterPaint();
  rotationY.value += extraTurns * 360 + delta;
  await new Promise((r) => setTimeout(r, FLIP_MS));
  isAnimating.value = false;
};

defineExpose({ flip, rotationY, busy });
</script>

<template>
  <div
    class="coin-scene inline-block select-none"
    :style="{ width: size, height: size }"
    role="img"
    :aria-label="ariaLabel"
  >
    <div
      class="coin-inner"
      :class="{ 'coin-inner--busy': busy }"
      :style="transformStyle"
    >
      <div class="coin-face coin-face--obv">
        <img :src="obvUrl" alt="" class="coin-img" draggable="false" />
      </div>
      <div class="coin-face coin-face--rev">
        <img :src="revUrl" alt="" class="coin-img" draggable="false" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.coin-scene {
  perspective: 720px;
  perspective-origin: center center;
}

.coin-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.85s cubic-bezier(0.35, 0.12, 0.2, 1);
  will-change: transform;
}

.coin-inner--busy {
  transition-duration: 0.85s;
}

.coin-face {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
}

.coin-face--obv {
  transform: rotateY(0deg) translateZ(1px);
}

.coin-face--rev {
  transform: rotateY(180deg) translateZ(1px);
}

.coin-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  pointer-events: none;
}
</style>
