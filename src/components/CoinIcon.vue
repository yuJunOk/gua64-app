<template>
    <svg viewBox="0 0 48 48" class="w-6 h-6" fill="none">
        <defs>
            <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fcd34d" />
                <stop offset="40%" stop-color="#f59e0b" />
                <stop offset="70%" stop-color="#d97706" />
                <stop offset="100%" stop-color="#92400e" />
            </linearGradient>
        </defs>
        
        <g transform="translate(0, 2) rotate(-15, 24, 18)">
            <circle cx="14" cy="18" r="8" fill="url(#coinGradient)" />
            <circle cx="14" cy="18" r="5" fill="none" stroke="#78350f" stroke-width="0.6" opacity="0.4" />
            <rect x="11.5" y="15.5" width="5" height="5" rx="0.5" fill="#78350f" opacity="0.7" />
        </g>
        
        <g>
            <circle cx="24" cy="20" r="9" fill="url(#coinGradient)" />
            <circle cx="24" cy="20" r="6" fill="none" stroke="#78350f" stroke-width="0.6" opacity="0.4" />
            <rect x="20.5" y="16.5" width="7" height="7" rx="0.5" fill="#78350f" opacity="0.85" />
            <text x="24" y="21.5" text-anchor="middle" fill="#fef3c7" font-size="3.5" font-weight="700" opacity="0.9">乾</text>
        </g>
        
        <g transform="translate(0, 2) rotate(15, 34, 18)">
            <circle cx="34" cy="18" r="8" fill="url(#coinGradient)" />
            <circle cx="34" cy="18" r="5" fill="none" stroke="#78350f" stroke-width="0.6" opacity="0.4" />
            <rect x="31.5" y="15.5" width="5" height="5" rx="0.5" fill="#78350f" opacity="0.7" />
        </g>
    </svg>
</template>

<script setup lang="ts">
</script>