<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
    <!-- 顶部导航 -->
    <header class="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="text-3xl">☯</div>
        <h1 class="text-lg font-bold text-gray-800">历史记录</h1>
      </div>
      <button 
        v-if="historyRecords.length > 0"
        @click="showConfirmDialog = true"
        class="bg-red-100 text-red-700 font-medium py-2 px-4 rounded-full text-sm hover:bg-red-200 transition-colors"
      >
        清空记录
      </button>
    </header>

    <!-- 主内容区 -->
    <main class="px-4 py-6">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
        <div class="text-4xl mb-4">⏳</div>
        <p class="text-sm text-gray-600">加载历史记录中...</p>
      </div>

      <!-- 空状态 -->
      <div v-else-if="historyRecords.length === 0" class="flex flex-col items-center justify-center py-12">
        <div class="text-5xl mb-6">📋</div>
        <h3 class="text-lg font-bold text-gray-800 mb-4">暂无历史记录</h3>
        <p class="text-sm text-gray-600 mb-8 text-center">
          开始算卦，记录将会保存在这里
        </p>
        <button 
          @click="goToDivination" 
          class="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-10 rounded-full text-sm shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        >
          去算卦
        </button>
      </div>

      <!-- 历史记录列表 -->
      <div v-else class="space-y-4">
        <div 
          v-for="record in historyRecords" 
          :key="record.id"
          class="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="text-base font-bold text-gray-800 mb-2">
                {{ record.hexagram_name }}
              </h4>
              <div class="flex items-center gap-3 mb-3">
                <span :class="['px-3 py-1 rounded-full text-xs font-semibold', record.result_type === 'auto' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700']">
                  {{ record.result_type === 'auto' ? '自动算卦' : '手动输入' }}
                </span>
                <span class="text-gray-500 text-xs">
                  {{ formatDate(record.created_at) }}
                </span>
              </div>
            </div>
            <button 
              @click="deleteRecord(record.id)"
              class="bg-red-100 text-red-700 p-2 rounded-full hover:bg-red-200 transition-colors text-lg"
            >
              🗑️
            </button>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="text-sm font-semibold text-gray-800 mb-3">爻值：</div>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(yao, index) in (record.yao_data ? JSON.parse(record.yao_data) : [])" 
                :key="index"
                :class="['px-3 py-2 rounded-lg font-bold text-sm', (yao === 6 || yao === 9) ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-700']"
              >
                {{ yao }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 清空确认弹窗 -->
      <div v-if="showConfirmDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
          <h3 class="text-lg font-bold text-gray-800 mb-4">确认清空</h3>
          <p class="text-sm text-gray-600 mb-6">
            确定要清空所有历史记录吗？此操作不可恢复。
          </p>
          <div class="flex gap-4">
            <button 
              @click="showConfirmDialog = false"
              class="flex-1 bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button 
              @click="handleClearHistory"
              class="flex-1 bg-red-600 text-white font-bold py-3 px-6 rounded-full text-sm hover:bg-red-700 transition-colors"
            >
              确认清空
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getHistory, deleteHistory, clearHistory } from '../db';

const router = useRouter();

// 状态管理
const historyRecords = ref<any[]>([]);
const isLoading = ref(true);
const showConfirmDialog = ref(false);

// 方法
const loadHistory = async () => {
  isLoading.value = true;
  try {
    historyRecords.value = await getHistory();
  } catch (error) {
    console.error('加载历史记录失败:', error);
  } finally {
    isLoading.value = false;
  }
};

const deleteRecord = async (id: number) => {
  try {
    await deleteHistory(id);
    await loadHistory();
  } catch (error) {
    console.error('删除历史记录失败:', error);
  }
};

const handleClearHistory = async () => {
  try {
    await clearHistory();
    await loadHistory();
    showConfirmDialog.value = false;
  } catch (error) {
    console.error('清空历史记录失败:', error);
  }
};

const goToDivination = () => {
  router.push('/divination');
};

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 生命周期
onMounted(() => {
  loadHistory();
});
</script>

<style scoped>

</style>