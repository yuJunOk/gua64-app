<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
        <!-- 顶部导航 -->
        <header
            class="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="text-3xl">☯</div>
                <h1 class="text-lg font-bold text-gray-800">易经算卦</h1>
            </div>
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <div class="text-lg">👤</div>
            </div>
        </header>

        <!-- 主内容区 -->
        <main class="px-4 py-6">
            <!-- Hero 区域 -->
            <section class="text-center mb-8">
                <h2 class="text-xl font-bold text-gray-800 mb-4">探索易经智慧</h2>
                <p class="text-sm text-gray-600 mb-8">
                    六十四卦，四千零九十六变。变的是象，定的是心。
                </p>
                <button @click="startDivination"
                    class="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-10 rounded-full text-sm shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                    开始算卦
                </button>
            </section>

            <!-- 功能特点 -->
            <section class="mb-12">
                <h3 class="text-lg font-bold text-gray-800 mb-6 text-center">核心功能</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- 功能卡片 1 -->
                    <div class="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
                        <div class="text-3xl mb-3">☷</div>
                        <h4 class="text-base font-bold text-gray-800 mb-2">自动算卦</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            模拟三枚硬币抛六次，自动生成卦象和解析，体验传统算卦的全过程
                        </p>
                    </div>

                    <!-- 功能卡片 2 -->
                    <div class="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
                        <div class="text-3xl mb-3">✍️</div>
                        <h4 class="text-base font-bold text-gray-800 mb-2">手动输入</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            支持线下抛掷硬币，手动输入结果，让您可以在任何地方进行算卦
                        </p>
                    </div>

                    <!-- 功能卡片 3 -->
                    <div class="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
                        <div class="text-3xl mb-3">📖</div>
                        <h4 class="text-base font-bold text-gray-800 mb-2">卦象解析</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            详细展示本卦、变卦及对应卦辞爻辞，帮助您理解卦象的含义
                        </p>
                    </div>

                    <!-- 功能卡片 4 -->
                    <div class="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
                        <div class="text-3xl mb-3">📋</div>
                        <h4 class="text-base font-bold text-gray-800 mb-2">历史记录</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            自动保存算卦结果，方便您回顾历史记录，追踪个人运势变化
                        </p>
                    </div>
                </div>
            </section>

            <!-- 算卦规则 -->
            <section class="bg-white rounded-xl p-5 shadow-md">
                <h3 class="text-lg font-bold text-gray-800 mb-5">算卦规则</h3>

                <div class="space-y-5">
                    <!-- 规则 1 -->
                    <div>
                        <h4 class="text-base font-semibold text-gray-800 mb-2">硬币规则</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            背面(3)为阳，正面(2)为阴。每次抛掷三枚硬币，记录结果。
                        </p>
                    </div>

                    <!-- 规则 2 -->
                    <div>
                        <h4 class="text-base font-semibold text-gray-800 mb-2">爻的生成</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            三枚硬币的和：6(老阴)、7(少阳)、8(少阴)、9(老阳)
                        </p>
                    </div>

                    <!-- 规则 3 -->
                    <div>
                        <h4 class="text-base font-semibold text-gray-800 mb-2">变卦逻辑</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            老阴变阳，老阳变阴。根据变化生成变卦。
                        </p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const startDivination = () => {
    router.push('/divination');
};
</script>

<style scoped lang="scss"></style>