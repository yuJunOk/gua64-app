<template>
    <van-tabbar v-model="activeIndex" :fixed="false" class="tab-bar-shell">
        <van-tabbar-item
                v-for="tab in tabs"
                :key="tab.name"
                :icon="tab.icon"
                :to="tab.path"
                class="tab-bar-item"
        >
            {{ tab.label }}
        </van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeIndex = computed(() => {
    const currentPath = route.path;
    return tabs.findIndex(tab => tab.path === currentPath);
});

const tabs = [
    {
        name: 'home',
        path: '/',
        label: '首页',
        icon: 'home-o'
    },
    {
        name: 'divination',
        path: '/divination',
        label: '问卦',
        icon: 'stop-circle-o'
    },
    {
        name: 'history',
        path: '/history',
        label: '历史',
        icon: 'list-switch'
    },
    {
        name: 'more',
        path: '/more',
        label: '更多',
        icon: 'more-o'
    }
];
</script>

<style scoped>
.tab-bar-shell {
    border-top: 1px solid rgba(226, 232, 240, 0.72);
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(14px);
    box-shadow: 0 -8px 24px rgba(15, 23, 42, 0.05);
}

.tab-bar-shell :deep(.van-tabbar) {
    height: 60px;
}

.tab-bar-shell :deep(.van-tabbar-item) {
    color: #64748b;
    transition: color 0.25s ease, transform 0.25s ease;
}

.tab-bar-shell :deep(.van-tabbar-item--active) {
    color: #2563eb;
    background: transparent;
}

.tab-bar-item :deep(.van-tabbar-item__icon) {
    font-size: 1.25rem;
    margin-bottom: 0.2rem;
}

.tab-bar-item :deep(.van-tabbar-item__text) {
    font-size: 0.625rem;
    font-weight: 600;
}
</style>