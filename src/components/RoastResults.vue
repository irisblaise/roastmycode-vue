<script setup lang="ts">
import ShameScore from './ShameScore.vue'
import type { RoastResult } from '@/types/roast'

interface Props {
  result: RoastResult
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
})
</script>

<template>
  <div
    v-if="isLoading"
    class="text-center p-8 backdrop-blur-sm bg-white/30 rounded-lg border border-gray-200 shadow-lg"
  >
    <div class="animate-pulse space-y-4">
      <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
  </div>

  <div
    v-else-if="result.error"
    class="text-center p-8 backdrop-blur-sm bg-white/30 rounded-lg border border-red-200 shadow-lg"
  >
    <p class="text-red-500 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
      {{ result.error }}
    </p>
  </div>

  <div
    v-else-if="result.roast && result.score !== null"
    class="space-y-6 p-8 mt-4 backdrop-blur-sm bg-white/30 rounded-lg border border-gray-200 shadow-lg"
  >
    <div class="flex flex-col md:flex-row md:items-start gap-8">
      <div class="flex-1">
        <p
          class="text-xl font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900"
        >
          {{ result.roast }}
        </p>
        <p v-if="result.explanation" class="text-gray-600 mt-2">
          {{ result.explanation }}
        </p>
      </div>
      <div class="flex-shrink-0 mx-auto md:mx-0">
        <ShameScore :score="result.score" />
      </div>
    </div>
  </div>
</template>
