<script setup lang="ts">
import { computed } from 'vue';
import type { YaoType } from '../types';
import { buildHexagramRows } from '../utils/yaoUtils';
import YaoLine from './YaoLine.vue';

const props = withDefaults(
  defineProps<{
    code: string;
    yaoData?: YaoType[];
    variant?: 'original' | 'changed';
    highlightMoving?: boolean;
    gapClass?: string;
  }>(),
  {
    variant: 'original',
    highlightMoving: true,
    gapClass: 'gap-1.5',
  },
);

const rows = computed(() => buildHexagramRows(props.code, props.yaoData));
</script>

<template>
  <div class="flex flex-col items-center py-1" :class="gapClass">
    <YaoLine
      v-for="row in rows"
      :key="row.indexFromBottom"
      compact
      :bit="row.bit"
      :yao-type="row.yaoType"
      :variant="variant"
      :highlight-moving="highlightMoving"
    />
  </div>
</template>
