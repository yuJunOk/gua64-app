<template>
    <svg viewBox="0 0 64 64" :class="['taiji-spin', sizeClass]">
        <circle cx="32" cy="32" r="31" fill="white"/>
        <path d="M32 1a31 31 0 0 1 0 62A15.5 15.5 0 0 1 32 32a15.5 15.5 0 0 0 0-31z" fill="#111827"/>
        <circle cx="32" cy="16.5" r="5" fill="#111827"/>
        <circle cx="32" cy="47.5" r="5" fill="white"/>
        <circle cx="32" cy="16.5" r="2" fill="white"/>
        <circle cx="32" cy="47.5" r="2" fill="#111827"/>
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
    size: 'md'
});

const sizeClass = computed(() => {
    const sizes: Record<string, string> = {
        sm: 'w-8 h-8',
        md: 'w-14 h-14',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20'
    };
    return sizes[props.size];
});
</script>

<style scoped>
.taiji-spin {
    animation: taijiSpin 20s linear infinite;
}

@keyframes taijiSpin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>