<script setup lang="ts">
import { computed } from 'vue';
import type { YaoType } from '../types';
import { getYaoKindLabel, isMovingYao } from '../utils/yaoUtils';

const props = withDefaults(
  defineProps<{
    bit: '0' | '1';
    yaoType?: YaoType;
    variant?: 'original' | 'changed';
    highlightMoving?: boolean;
    showMeta?: boolean;
    positionName?: string;
    /** 仅爻辞专页使用；卦象图内不展示 */
    yaoCi?: string;
    showYaoCi?: boolean;
    /** 卦象内紧凑线条 */
    compact?: boolean;
  }>(),
  {
    variant: 'original',
    highlightMoving: true,
    showMeta: false,
    showYaoCi: false,
    compact: false,
  },
);

const isYang = computed(() => props.bit === '1');
const moving = computed(() => props.yaoType != null && isMovingYao(props.yaoType));

const segmentColor = computed(() => {
  if (props.highlightMoving && moving.value) return 'yao-segment--moving';
  return 'yao-segment--still';
});

const lineWidth = computed(() => (props.compact ? 'w-14' : 'w-[5rem]'));
</script>

<template>
  <div
    class="flex flex-col items-center"
    :class="compact ? 'gap-0' : showMeta ? 'gap-1.5' : 'gap-0'"
  >
    <div
      v-if="showMeta && (positionName || yaoType != null)"
      class="flex items-center gap-1.5 text-xs text-gray-500"
    >
      <span v-if="positionName" class="font-medium text-gray-600">{{ positionName }}</span>
      <span v-if="yaoType != null" class="text-gray-400">{{ getYaoKindLabel(yaoType) }}</span>
    </div>

    <div
      class="flex items-center justify-center"
      :class="lineWidth"
      role="presentation"
      aria-hidden="true"
    >
      <div
        v-if="isYang"
        class="yao-segment yao-segment--yang"
        :class="[segmentColor, compact ? 'yao-segment--compact' : '']"
      />
      <div v-else class="flex w-full items-center justify-between gap-2">
        <div
          class="yao-segment yao-segment--yin"
          :class="[segmentColor, compact ? 'yao-segment--compact' : '']"
        />
        <div
          class="yao-segment yao-segment--yin"
          :class="[segmentColor, compact ? 'yao-segment--compact' : '']"
        />
      </div>
    </div>

    <p
      v-if="showYaoCi && yaoCi"
      class="mt-2 max-w-xs text-center text-xs leading-relaxed text-gray-600"
    >
      {{ yaoCi }}
    </p>

    <slot />
  </div>
</template>

<style scoped lang="scss">
.yao-segment {
  height: 5px;
  border-radius: 9999px;
  transition: background-color 0.2s ease;
}

.yao-segment--compact {
  height: 4px;
}

.yao-segment--yang {
  width: 100%;
}

.yao-segment--yin {
  flex: 1 1 0;
  min-width: 0;
}

.yao-segment--still {
  background-color: #334155; /* slate-700 */
}

.yao-segment--moving {
  background-color: #f97316; /* orange-500 */
}
</style>
