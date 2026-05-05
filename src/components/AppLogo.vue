<script setup lang="ts">
import logoUrl from '../assets/logo.svg';

withDefaults(
  defineProps<{
    /** CSS 尺寸，如 2.25rem、48px */
    size?: string;
    /** true：圆角矩形；false：直角 */
    rounded?: boolean;
    /** 'xl' | 'full' — 圆角样式 */
    radius?: 'xl' | 'full';
  }>(),
  { size: '2.25rem', rounded: true, radius: 'xl' },
);
</script>

<template>
  <img
    :src="logoUrl"
    alt="Gua64"
    class="shrink-0 object-contain select-none"
    :class="rounded ? (radius === 'full' ? 'rounded-full' : 'rounded-xl') : ''"
    :style="{ width: size, height: size }"
    draggable="false"
  />
</template>
