<script setup lang="ts">
defineProps<{
  currentFilter: string
}>()

const emit = defineEmits<{
  filterChange: [filter: string]
}>()

const filters = [
  { value: 'all', label: 'All Roasts', description: 'Show everything' },
  { value: 'low', label: 'Mild (0-3)', description: 'Gentle criticism' },
  { value: 'medium', label: 'Medium (4-7)', description: 'Getting spicy' },
  { value: 'high', label: 'Brutal (8-10)', description: 'Maximum shame' },
]
</script>

<template>
  <div class="mb-8">
    <div class="flex flex-wrap gap-3 justify-center">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="emit('filterChange', filter.value)"
        :class="[
          'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
          'border-2 hover:scale-105 active:scale-95',
          currentFilter === filter.value
            ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white border-gray-900 shadow-lg'
            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 shadow-sm',
        ]"
      >
        <div class="text-sm font-bold">{{ filter.label }}</div>
        <div class="text-xs opacity-75">{{ filter.description }}</div>
      </button>
    </div>
  </div>
</template>
