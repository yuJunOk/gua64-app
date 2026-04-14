<template>
    <van-tabbar v-model="activeIndex">
        <van-tabbar-item
                v-for="tab in tabs"
                :key="tab.name"
                :icon="tab.icon"
                :to="tab.path"
        >
            {{ tab.label }}
        </van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeIndex = computed(() => {
    const currentPath = route.path
    return tabs.findIndex(tab => tab.path === currentPath)
})

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
        label: '算卦',
        icon: 'stop-circle-o'
    },
    {
        name: 'history',
        path: '/history',
        label: '历史',
        icon: 'list-switch'
    }
]
</script>

<style scoped>

</style>