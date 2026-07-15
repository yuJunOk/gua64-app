<template>
  <div class="min-h-full bg-gradient-to-b from-blue-50 to-white pb-6">
    <header class="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div class="flex items-center gap-3">
        <AppLogo size="2.25rem" />
        <h1 class="text-lg font-bold text-gray-800">历史记录</h1>
      </div>
      <button 
        v-if="divinationRecords.length > 0"
        @click="showConfirmDialog = true"
        class="rounded-full bg-rose-50/80 px-4 py-2 text-sm font-medium text-rose-700 shadow-sm transition-all duration-300 active:scale-95 hover:bg-rose-100/70"
      >
        清空记录
      </button>
    </header>

    <main class="px-4 py-5 space-y-4">
      <div v-if="isLoading" class="rounded-xl bg-white/78 py-12 text-center shadow-sm backdrop-blur-sm">
        <div class="mb-4 text-4xl">⏳</div>
        <p class="text-sm text-gray-600">加载历史记录中...</p>
      </div>

      <div v-else-if="divinationRecords.length === 0">
        <EmptyState title="暂无历史记录">
          <button
            type="button"
            @click="goToDivination"
            class="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(37,99,235,0.24)] transition-all duration-300 active:scale-95 hover:shadow-[0_22px_42px_rgba(37,99,235,0.3)]"
          >
            去算卦
          </button>
        </EmptyState>
      </div>

      <div v-else class="space-y-4">
        <div class="rounded-xl bg-white/82 px-4 py-3 shadow-sm backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-slate-800">共 {{ divinationRecords.length }} 条记录</div>
              <div class="mt-1 text-xs text-slate-500">按时间倒序展示最近起卦结果</div>
            </div>
            <div class="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              历史档案
            </div>
          </div>
        </div>
        <div 
          v-for="record in divinationRecords" 
          :key="record.id"
          class="rounded-xl bg-white/88 p-5 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
          @click="viewDetail(record)"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="text-base font-bold text-gray-800 mb-1">
                {{ getHexagramName(record.original_hexagram_seq) }}
              </h4>
              <p v-if="record.question" class="text-sm text-gray-500 mb-2">
                {{ record.question }}
              </p>
              <div class="flex items-center gap-3">
                <span :class="['px-3 py-1 rounded-full text-xs font-semibold', record.result_type === 'auto' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700']">
                  {{ record.result_type === 'auto' ? '自动算卦' : '手动输入' }}
                </span>
                <span class="text-gray-500 text-xs">
                  {{ formatDate(record.created_at) }}
                </span>
              </div>
            </div>
            <button 
              @click.stop="deleteRecord(record.id)"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50/80 text-base text-rose-700 shadow-sm transition-all duration-300 active:scale-95 hover:bg-rose-100"
            >
              🗑️
            </button>
          </div>
          
          <div class="rounded-[14px] bg-slate-50/80 p-4 ring-1 ring-slate-100/80">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-semibold text-gray-800">爻值</span>
              <span v-if="getMovingYaoCount(record) > 0" class="text-xs text-orange-600">
                {{ getMovingYaoCount(record) }}个动爻
              </span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(yao, index) in getYaoValues(record)" 
                :key="index"
                :class="['rounded-[12px] px-3 py-2 text-sm font-bold ring-1', isMovingYao(yao) ? 'bg-orange-50 text-orange-700 ring-orange-100/80' : 'bg-blue-50 text-blue-700 ring-blue-100/80']"
              >
                {{ yao }}
              </span>
            </div>
          </div>

          <div v-if="record.changed_hexagram_seq" class="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <span>变卦：</span>
            <span class="text-orange-600 font-semibold">{{ getHexagramName(record.changed_hexagram_seq) }}</span>
          </div>
        </div>
      </div>

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
import { getAllDivinations, deleteDivination, clearDivinations, type DivinationRecord } from '../dao/divinationDao';
import { getAllHexagrams } from '../dao/hexagramDao';
import EmptyState from "../components/EmptyState.vue";
import { isMovingYao } from '../enums';
import AppLogo from '../components/AppLogo.vue';

const router = useRouter();

const divinationRecords = ref<DivinationRecord[]>([]);
const isLoading = ref(true);
const showConfirmDialog = ref(false);
const hexagrams = getAllHexagrams();

const getHexagramName = (seq: number): string => {
    const hexagram = hexagrams.find(h => h.id === seq);
    return hexagram?.name || '未知';
};

const getYaoValues = (record: DivinationRecord): number[] => {
    try {
        return JSON.parse(record.yao_values);
    } catch {
        return [];
    }
};

const getMovingYaoCount = (record: DivinationRecord): number => {
    const yaoValues = getYaoValues(record);
    return yaoValues.filter(isMovingYao).length;
};

const loadHistory = async () => {
  isLoading.value = true;
  try {
    divinationRecords.value = await getAllDivinations();
  } catch (error) {
    console.error('加载历史记录失败:', error);
    showFailToast('加载失败，请重试');
  } finally {
    isLoading.value = false;
  }
};

const deleteRecord = async (id: number) => {
  try {
    await deleteDivination(id);
    showSuccessToast('已删除');
    await loadHistory();
  } catch (error) {
    console.error('删除历史记录失败:', error);
    showFailToast('删除失败，请重试');
  }
};

const handleClearHistory = async () => {
  try {
    await clearDivinations();
    await loadHistory();
    showConfirmDialog.value = false;
    showSuccessToast('已清空');
  } catch (error) {
    console.error('清空历史记录失败:', error);
    showFailToast('清空失败，请重试');
  }
};

const goToDivination = () => {
  router.push({ name: 'divination' });
};

const viewDetail = (record: DivinationRecord) => {
  router.push({ name: 'divination-detail', params: { id: record.id } });
};

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

onMounted(() => {
  loadHistory();
});
</script>