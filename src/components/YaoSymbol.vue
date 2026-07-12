<template>
    <div class="relative flex items-center justify-center">
        <svg viewBox="0 0 52 18" class="w-11 h-5">
            <g v-if="type === 'yang'">
                <line 
                    x1="4" y1="9" x2="48" y2="9" 
                    :stroke="isOld ? '#d97706' : '#374151'"
                    stroke-width="4"
                    stroke-linecap="round"
                />
                <circle 
                    v-if="isOld"
                    cx="26" cy="9" 
                    r="4" 
                    fill="none"
                    stroke="#d97706"
                    stroke-width="1.5"
                />
            </g>
            
            <g v-else>
                <line 
                    x1="4" y1="9" x2="22" y2="9" 
                    :stroke="isOld ? '#ef4444' : '#6b7280'"
                    stroke-width="3"
                    stroke-linecap="round"
                />
                <line 
                    x1="30" y1="9" x2="48" y2="9" 
                    :stroke="isOld ? '#ef4444' : '#6b7280'"
                    stroke-width="3"
                    stroke-linecap="round"
                />
                <g v-if="isOld">
                    <line x1="23" y1="4" x2="29" y2="14" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" />
                    <line x1="29" y1="4" x2="23" y2="14" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" />
                </g>
            </g>
        </svg>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    type: 'yang' | 'yin';
    isOld: boolean;
}>();
</script>