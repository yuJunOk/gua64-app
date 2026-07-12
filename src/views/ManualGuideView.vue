<template>
    <div class="min-h-full bg-gradient-to-b from-blue-50 to-indigo-50/30 pb-6">
        <header class="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
            <button @click="$router.back()" class="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                <span class="text-sm font-medium">返回</span>
            </button>
            <h1 class="text-lg font-bold text-gray-800">传统起卦</h1>
            <div class="w-12"></div>
        </header>

        <main class="px-4 py-6 space-y-5">
            <div class="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-xl shadow-blue-600/20">
                <div class="flex items-center gap-3 mb-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <span class="text-xl">📿</span>
                    </div>
                    <h2 class="text-lg font-bold">三枚硬币摇卦法</h2>
                </div>
                <p class="text-blue-100/90 text-sm leading-relaxed">
                    三枚硬币摇卦法（又称钱币法）是易经卜卦中最常用、最便捷的起卦方式之一。其核心在于通过硬币的正反面组合，模拟阴阳爻的生成，进而组成六十四卦。
                </p>
            </div>

            <div class="rounded-2xl bg-white/85 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div class="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                    工具准备
                </h3>
                <div class="grid grid-cols-3 gap-4">
                    <div class="flex flex-col items-center text-center p-3 rounded-xl bg-blue-50/60">
                        <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2">
                            <span class="text-xl">🪙</span>
                        </div>
                        <span class="text-sm font-medium text-gray-700">三枚硬币</span>
                        <span class="text-xs text-gray-400 mt-0.5">面值大小相同</span>
                    </div>
                    <div class="flex flex-col items-center text-center p-3 rounded-xl bg-indigo-50/60">
                        <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2">
                            <span class="text-xl">📝</span>
                        </div>
                        <span class="text-sm font-medium text-gray-700">纸笔</span>
                        <span class="text-xs text-gray-400 mt-0.5">记录结果</span>
                    </div>
                    <div class="flex flex-col items-center text-center p-3 rounded-xl bg-purple-50/60">
                        <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2">
                            <span class="text-xl">🧘</span>
                        </div>
                        <span class="text-sm font-medium text-gray-700">静心环境</span>
                        <span class="text-xs text-gray-400 mt-0.5">排除杂念</span>
                    </div>
                </div>
            </div>

            <div class="rounded-2xl bg-white/85 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div class="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                    操作步骤
                </h3>

                <div class="space-y-5">
                    <div class="flex gap-4">
                        <div class="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/30">1</div>
                        <div>
                            <h4 class="font-medium text-gray-800 mb-1">定阴阳</h4>
                            <p class="text-gray-600 text-sm">设定硬币的一面为"阳"（如：有数字的一面），另一面为"阴"（如：有花或国徽的一面）。一旦设定，整个占卜过程不可更改。</p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30">2</div>
                        <div>
                            <h4 class="font-medium text-gray-800 mb-1">摇卦</h4>
                            <p class="text-gray-600 text-sm">将三枚硬币置于双手掌心，静心默念所问之事。摇晃后抛在桌面上，观察正反面组合。<strong class="text-blue-600">记录顺序：从下往上记录</strong>，即第一次为初爻（最下），第六次为上爻（最上）。</p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-purple-500/30">3</div>
                        <div class="flex-1">
                            <h4 class="font-medium text-gray-800 mb-3">判定爻性</h4>
                            <div class="grid grid-cols-2 gap-3">
                                <div class="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 border border-gray-100">
                                    <div class="flex items-center justify-between mb-3">
                                        <span class="text-xs text-gray-500">1阳 2阴</span>
                                        <span class="text-xs font-bold text-gray-400">数值: 7</span>
                                    </div>
                                    <div class="flex items-center gap-3 mb-2">
                                        <YaoSymbol type="yang" :isOld="false" />
                                        <span class="font-medium text-gray-800">少阳</span>
                                    </div>
                                    <p class="text-xs text-gray-500">阳爻，不变</p>
                                </div>

                                <div class="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 border border-gray-100">
                                    <div class="flex items-center justify-between mb-3">
                                        <span class="text-xs text-gray-500">2阳 1阴</span>
                                        <span class="text-xs font-bold text-gray-400">数值: 8</span>
                                    </div>
                                    <div class="flex items-center gap-3 mb-2">
                                        <YaoSymbol type="yin" :isOld="false" />
                                        <span class="font-medium text-gray-800">少阴</span>
                                    </div>
                                    <p class="text-xs text-gray-500">阴爻，不变</p>
                                </div>

                                <div class="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-4 border border-amber-200">
                                    <div class="flex items-center justify-between mb-3">
                                        <span class="text-xs text-amber-700">3阳 0阴</span>
                                        <span class="text-xs font-bold text-amber-600">数值: 9</span>
                                    </div>
                                    <div class="flex items-center gap-3 mb-2">
                                        <YaoSymbol type="yang" :isOld="true" />
                                        <span class="font-medium text-amber-800">老阳</span>
                                    </div>
                                    <p class="text-xs text-amber-600">阳爻，动，变阴</p>
                                </div>

                                <div class="rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 p-4 border border-rose-200">
                                    <div class="flex items-center justify-between mb-3">
                                        <span class="text-xs text-rose-700">0阳 3阴</span>
                                        <span class="text-xs font-bold text-rose-600">数值: 6</span>
                                    </div>
                                    <div class="flex items-center gap-3 mb-2">
                                        <YaoSymbol type="yin" :isOld="true" />
                                        <span class="font-medium text-rose-800">老阴</span>
                                    </div>
                                    <p class="text-xs text-rose-600">阴爻，动，变阳</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/30">4</div>
                        <div>
                            <h4 class="font-medium text-gray-800 mb-1">成卦</h4>
                            <p class="text-gray-600 text-sm">重复上述步骤6次，得到六个爻，自下而上排列，即得本卦。若有动爻（老阴或老阳），该爻阴阳互变，所得新卦为变卦。</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="rounded-2xl bg-white/85 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div class="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                    解卦规则：朱熹解卦法
                </h3>

                <div class="space-y-2.5">
                    <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80">
                        <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">1</span>
                        <div>
                            <span class="font-medium text-gray-800">六爻皆不变</span>
                            <span class="text-gray-500 text-sm ml-2">：以本卦卦辞解之</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80">
                        <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">2</span>
                        <div>
                            <span class="font-medium text-gray-800">一爻变</span>
                            <span class="text-gray-500 text-sm ml-2">：以本卦变爻爻辞解之</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80">
                        <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">3</span>
                        <div>
                            <span class="font-medium text-gray-800">二爻变</span>
                            <span class="text-gray-500 text-sm ml-2">：以本卦两个变爻爻辞解之，以上爻为主</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80">
                        <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">4</span>
                        <div>
                            <span class="font-medium text-gray-800">三爻变</span>
                            <span class="text-gray-500 text-sm ml-2">：以本卦与变卦卦辞合参</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80">
                        <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">5</span>
                        <div>
                            <span class="font-medium text-gray-800">四爻变</span>
                            <span class="text-gray-500 text-sm ml-2">：以变卦中两个不变爻爻辞解之，以下爻为主</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80">
                        <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">6</span>
                        <div>
                            <span class="font-medium text-gray-800">五爻变</span>
                            <span class="text-gray-500 text-sm ml-2">：以变卦中唯一不变爻爻辞解之</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80">
                        <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">7</span>
                        <div>
                            <span class="font-medium text-gray-800">六爻全变</span>
                            <span class="text-gray-500 text-sm ml-2">：乾卦用"用九"，坤卦用"用六"，其他卦以变卦卦辞解之</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="rounded-2xl bg-white/85 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div class="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                    注意事项
                </h3>
                <div class="grid grid-cols-2 gap-3">
                    <div class="flex items-start gap-2 p-3 rounded-xl bg-red-50/60">
                        <svg viewBox="0 0 24 24" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <span class="text-xs text-gray-700"><strong>一事一占</strong>：每次占卜仅限一个明确问题</span>
                    </div>
                    <div class="flex items-start gap-2 p-3 rounded-xl bg-red-50/60">
                        <svg viewBox="0 0 24 24" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <span class="text-xs text-gray-700"><strong>心诚则灵</strong>：起卦时需专注，排除杂念</span>
                    </div>
                    <div class="flex items-start gap-2 p-3 rounded-xl bg-red-50/60">
                        <svg viewBox="0 0 24 24" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <span class="text-xs text-gray-700"><strong>客观记录</strong>：不可因期望结果而主观修改</span>
                    </div>
                    <div class="flex items-start gap-2 p-3 rounded-xl bg-red-50/60">
                        <svg viewBox="0 0 24 24" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <span class="text-xs text-gray-700"><strong>学术态度</strong>：保持理性、客观的学术态度</span>
                    </div>
                </div>
            </div>

            <van-floating-bubble 
                axis="y" 
                :gap="{ x: 24, y: 80 }"
                @click="$router.push('/divination')"
            >
                <template #default>
                    <div class="flex h-full w-full items-center justify-center">
                        <CoinIcon />
                    </div>
                </template>
            </van-floating-bubble>
        </main>
    </div>
</template>

<script setup lang="ts">
import YaoSymbol from '../components/YaoSymbol.vue';
import CoinIcon from '../components/CoinIcon.vue';
</script>