<script setup lang="ts">
import { onMounted } from 'vue';
import TabBar from './components/TabBar.vue';
import { initDatabase } from './dao/database';
import { HISTORY_TABLE } from './dao/historyDao';

// 初始化数据库
onMounted(async () => {
    await initDatabase([HISTORY_TABLE]);
});
</script>

<template>
    <div id="app" class="app-shell flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden bg-gray-50">
        <div class="app-main flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
            <router-view v-slot="{ Component, route }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" :key="route.path" />
                </transition>
            </router-view>
        </div>
        <TabBar />
    </div>
</template>

<style>
/* 全局样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    width: 100vw;
}

button {
    border: none;
    outline: none;
    background: none;
    font: inherit;
    color: inherit;
    appearance: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
}
</style>
