<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { ArchivedRoast } from '@/types/archive'
import { archiveService } from '@/services/archiveService'
import ArchiveItem from '@/components/ArchiveItem.vue'
import ShameScoreFilter from '@/components/ShameScoreFilter.vue'

const archivedRoasts = ref<ArchivedRoast[]>([])
const filter = ref('all')

const loadRoasts = () => {
  archivedRoasts.value = archiveService.getAllRoasts()
}

onMounted(() => {
  loadRoasts()
})

const filteredRoasts = computed(() => {
  return archivedRoasts.value.filter((roast) => {
    if (!roast.score) return false
    switch (filter.value) {
      case 'low':
        return roast.score >= 0 && roast.score <= 3
      case 'medium':
        return roast.score >= 4 && roast.score <= 7
      case 'high':
        return roast.score >= 8 && roast.score <= 10
      default:
        return true
    }
  })
})

const handleFilterChange = (newFilter: string) => {
  filter.value = newFilter
}
</script>

<template>
  <main class="flex justify-center px-4 py-8">
    <div class="w-full max-w-[70%] flex flex-col gap-5">
      <header class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl uppercase font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
        >
          Code Roast Archive
        </h1>
        <p class="text-xl text-gray-600">
          Your collection of brutal honesty and programming wisdom
        </p>
      </header>

      <ShameScoreFilter :current-filter="filter" @filter-change="handleFilterChange" />

      <div class="flex flex-col gap-5 space-y-8 mt-8">
        <div
          v-if="filteredRoasts.length === 0"
          class="text-center p-12 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm"
        >
          <div class="max-w-md mx-auto">
            <p class="text-2xl font-semibold text-gray-800 mb-2">
              {{
                archivedRoasts.length === 0
                  ? 'No roasts yet!'
                  : 'No roasts match the selected filter'
              }}
            </p>
            <p class="text-gray-600">
              {{
                archivedRoasts.length === 0
                  ? 'Submit some code to get roasted and build your collection of programming wisdom.'
                  : 'Try selecting a different filter to see more roasts.'
              }}
            </p>
          </div>
        </div>

        <ArchiveItem
          v-for="roast in filteredRoasts"
          :key="roast.id"
          :item="roast"
          @deleted="loadRoasts"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
