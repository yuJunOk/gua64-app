<template>
  <div class="rounded-[16px] bg-white/85 py-8 text-center shadow-sm backdrop-blur-sm">
    <div class="mb-4 text-3xl opacity-20">☯</div>
    <div class="text-base font-medium text-gray-700 mb-2">{{ title }}</div>
    <div class="text-sm text-gray-400 px-8 py-2 leading-relaxed mb-6 italic">
      <span class="text-gray-300 mr-1">「</span>{{ quote }}<span class="text-gray-300 ml-1">」</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getRandomQuote } from '@/data/quotes';

interface Props {
  title?: string;
  quoteText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '暂无记录',
  quoteText: ''
});

const quote = computed(() => {
  return props.quoteText || getRandomQuote();
});
</script>
