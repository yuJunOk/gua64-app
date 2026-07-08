<template>
  <div class="min-h-full bg-gradient-to-b from-blue-50 to-white pb-6">
    <!-- 顶部导航 -->
    <header class="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div class="flex items-center gap-3">
        <AppLogo size="2.25rem" />
        <h1 class="text-lg font-bold text-gray-800">历史记录</h1>
      </div>
      <button 
        v-if="historyRecords.length > 0"
        @click="showConfirmDialog = true"
        class="rounded-full bg-rose-50/80 px-4 py-2 text-sm font-medium text-rose-700 shadow-sm transition-all duration-300 active:scale-95 hover:bg-rose-100/70"
      >
        清空记录
      </button>
    </header>

    <!-- 主内容区 -->
    <main class="px-4 py-6">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="rounded-xl bg-white/78 py-12 text-center shadow-sm backdrop-blur-sm">
        <div class="mb-4 text-4xl">⏳</div>
        <p class="text-sm text-gray-600">加载历史记录中...</p>
      </div>

      <!-- 空状态（draw-empty） -->
      <div v-else-if="historyRecords.length === 0" class="py-6">
        <DrawEmpty
          title="暂无历史记录"
          description="开始算卦，记录将会保存在这里"
          illustration="Taking Notes"
          image-width="200px"
          class="history-empty"
        >
          <button
            type="button"
            @click="goToDivination"
            class="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(37,99,235,0.24)] transition-all duration-300 active:scale-95 hover:shadow-[0_22px_42px_rgba(37,99,235,0.3)]"
          >
            去算卦
          </button>
        </DrawEmpty>
      </div>

      <!-- 历史记录列表 -->
      <div v-else class="space-y-4">
        <div class="rounded-xl bg-white/82 px-4 py-3 shadow-sm backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-slate-800">共 {{ historyRecords.length }} 条记录</div>
              <div class="mt-1 text-xs text-slate-500">按时间倒序展示最近起卦结果</div>
            </div>
            <div class="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              历史档案
            </div>
          </div>
        </div>
        <div 
          v-for="record in historyRecords" 
          :key="record.id"
          class="rounded-xl bg-white/88 p-5 shadow-sm transition-all duration-300 hover:shadow-md"
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
              class="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50/80 text-base text-rose-700 shadow-sm transition-all duration-300 active:scale-95 hover:bg-rose-100"
            >
              🗑️
            </button>
          </div>
          
          <div class="rounded-[14px] bg-slate-50/80 p-4 ring-1 ring-slate-100/80">
            <div class="text-sm font-semibold text-gray-800 mb-3">爻值：</div>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(yao, index) in (record.yao_data ? JSON.parse(record.yao_data) : [])" 
                :key="index"
                :class="['rounded-[12px] px-3 py-2 text-sm font-bold ring-1', (yao === 6 || yao === 9) ? 'bg-orange-50 text-orange-700 ring-orange-100/80' : 'bg-blue-50 text-blue-700 ring-blue-100/80']"
              >
                {{ yao }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 清空确认弹窗 -->
      <van-dialog
        v-model:show="showConfirmDialog"
        title="确认清空"
        show-cancel-button
        confirm-button-text="确认清空"
        cancel-button-text="取消"
        confirm-button-color="#dc2626"
        @confirm="handleClearHistory"
      >
        <p class="text-sm text-gray-600 text-center py-4">
          确定要清空所有历史记录吗？此操作不可恢复。
        </p>
      </van-dialog>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import { getHistory, deleteHistory, clearHistory } from '../db';

const router = useRouter();

// 状态管理
const historyRecords = ref<any[]>([]);
const isLoading = ref(true);
const showConfirmDialog = ref(false);

// 方法
/** 加载历史记录列表；无入参无返回，失败时仅结束 loading，不主动抛错 */
const loadHistory = async () => {
  isLoading.value = true;
  try {
    historyRecords.value = await getHistory();
  } catch (error) {
    console.error('加载历史记录失败:', error);
    showFailToast('加载失败，请重试');
  } finally {
    isLoading.value = false;
  }
};

/** 删除单条历史记录；入参为记录 id，副作用是删库后刷新列表 */
const deleteRecord = async (id: number) => {
  try {
    await deleteHistory(id);
    showSuccessToast('已删除');
    await loadHistory();
  } catch (error) {
    console.error('删除历史记录失败:', error);
    showFailToast('删除失败，请重试');
  }
};

/** 清空全部历史记录；无入参无返回，副作用是清库、关闭弹窗并刷新列表 */
const handleClearHistory = async () => {
  try {
    await clearHistory();
    await loadHistory();
    showConfirmDialog.value = false;
    showSuccessToast('已清空');
  } catch (error) {
    console.error('清空历史记录失败:', error);
    showFailToast('清空失败，请重试');
  }
};

/** 跳转到问卦页；无入参无返回，副作用是触发路由导航 */
const goToDivination = () => {
  router.push({ name: 'divination' });
};

/** 格式化历史记录时间；入参为时间字符串，返回本地化年月日时分文本 */
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

<style scoped lang="scss">
.history-empty :deep(.draw-empty__title) {
  color: #1f2937;
}

.history-empty :deep(.draw-empty__description) {
  color: #6b7280;
}
</style>