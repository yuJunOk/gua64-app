<script setup lang="ts">
import { onMounted } from 'vue';
import TabBar from './components/TabBar.vue';
import { initDatabase } from './dao/database';
import { DIVINATION_TABLE } from './dao/divinationDao';
import { COLLECTION_TABLE } from './dao/collectionDao';
import { CATEGORY_TABLE } from './dao/categoryDao';
import { TAG_TABLE, DIVINATION_TAG_TABLE } from './dao/tagDao';
import { SETTINGS_TABLE } from './dao/settingsDao';

// 初始化数据库
onMounted(async () => {
    await initDatabase([DIVINATION_TABLE, COLLECTION_TABLE, CATEGORY_TABLE, TAG_TABLE, DIVINATION_TAG_TABLE, SETTINGS_TABLE]);
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
