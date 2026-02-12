<script setup lang="ts">
import { ref } from 'vue'
import CodeEditor from '../components/CodeEditor.vue'
import RoastResults from '@/components/RoastResults.vue'
import { roastCode } from '@/services/roastApi'
import type { RoastResult } from '@/types/roast'

const result = ref<RoastResult>({
  roast: null,
  score: null,
})

const loading = ref(false)

const handleCodeSubmit = async (code: string) => {
  loading.value = true
  result.value = {
    roast: null,
    score: null,
  }

  try {
    const roastResult = await roastCode({
      code,
      language: 'javascript',
    })
    result.value = roastResult
  } catch {
    result.value = {
      roast: null,
      score: null,
      error: 'Failed to roast your code. Please try again.',
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <CodeEditor :is-loading="loading" @submit="handleCodeSubmit" />
    <RoastResults :result="result" :is-loading="loading" />
  </div>
</template>

<style scoped></style>
