<script setup lang="ts">
import { onMounted } from 'vue';
import TabBar from './components/TabBar.vue';
import { initDatabase } from './db';

// 初始化数据库
onMounted(async () => {
    await initDatabase();
});
</script>

<template>
    <div id="app">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
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
    height: 100vh;
}
</style>