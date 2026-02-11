<script setup lang="ts">
interface Props {
  score: number
}

defineProps<Props>()

const getScoreColor = (score: number): string => {
  if (score >= 8) return 'text-red-600'
  if (score >= 6) return 'text-orange-500'
  if (score >= 4) return 'text-yellow-500'
  return 'text-green-500'
}

const getScoreLabel = (score: number): string => {
  if (score >= 8) return 'Catastrophic'
  if (score >= 6) return 'Needs Work'
  if (score >= 4) return 'Could Be Better'
  return 'Not Bad'
}
</script>

<template>
  <div class="flex flex-col items-center space-y-2">
    <div class="relative w-32 h-32">
      <svg class="transform -rotate-90 w-32 h-32">
        <circle
          cx="64"
          cy="64"
          r="56"
          stroke="currentColor"
          stroke-width="8"
          fill="none"
          class="text-gray-200"
        />
        <circle
          cx="64"
          cy="64"
          r="56"
          stroke="currentColor"
          stroke-width="8"
          fill="none"
          :class="getScoreColor(score)"
          :stroke-dasharray="`${(score / 10) * 351.86} 351.86`"
          class="transition-all duration-1000 ease-out"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <span :class="['text-4xl font-bold', getScoreColor(score)]">
          {{ score }}
        </span>
      </div>
    </div>
    <div class="text-center">
      <p :class="['text-sm font-medium', getScoreColor(score)]">
        {{ getScoreLabel(score) }}
      </p>
      <p class="text-xs text-gray-500">Shame Score</p>
    </div>
  </div>
</template>
