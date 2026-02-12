<script setup lang="ts">
import { ref } from 'vue'
import type { ArchivedRoast } from '@/types/archive'
import ShameScore from './ShameScore.vue'
import { archiveService } from '@/services/archiveService'

const props = defineProps<{
  item: ArchivedRoast
}>()

const emit = defineEmits<{
  deleted: []
}>()

const showCode = ref(false)

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this roast?')) {
    archiveService.deleteRoast(props.item.id)
    emit('deleted')
  }
}
</script>

<template>
  <div
    class="bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6"
  >
    <div class="flex justify-between items-start mb-4">
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <ShameScore v-if="item.score !== null" :score="item.score" />
          <span class="text-sm text-gray-500">{{ formatDate(item.timestamp) }}</span>
        </div>
      </div>
      <button
        @click="handleDelete"
        class="text-gray-400 hover:text-red-600 transition-colors p-2"
        title="Delete roast"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div class="mb-4">
      <p class="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">{{ item.roast }}</p>
    </div>

    <div v-if="item.explanation" class="mb-4 p-4 bg-gray-50 rounded-lg">
      <h4 class="font-semibold text-gray-700 mb-2">Explanation:</h4>
      <p class="text-gray-600 text-sm whitespace-pre-wrap">{{ item.explanation }}</p>
    </div>

    <div>
      <button
        @click="showCode = !showCode"
        class="text-sm font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-2 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 transition-transform"
          :class="{ 'rotate-90': showCode }"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        {{ showCode ? 'Hide' : 'Show' }} Original Code
      </button>

      <div v-if="showCode" class="mt-3">
        <pre
          class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
        ><code>{{ item.code }}</code></pre>
      </div>
    </div>
  </div>
</template>
