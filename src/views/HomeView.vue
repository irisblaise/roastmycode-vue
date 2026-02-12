<script setup lang="ts">
import { ref } from 'vue'
import CodeEditor from '../components/CodeEditor.vue'
import RoastResults from '@/components/RoastResults.vue'
import { roastCode } from '@/services/roastApi'
import { archiveService } from '@/services/archiveService'
import type { RoastResult } from '@/types/roast'

const result = ref<RoastResult>({
  roast: null,
  score: null,
})

const loading = ref(false)
const submittedCode = ref('')

const handleCodeSubmit = async (code: string) => {
  loading.value = true
  submittedCode.value = code
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

    if (roastResult.roast && roastResult.score !== null) {
      archiveService.archiveRoast(code, {
        roast: roastResult.roast,
        score: roastResult.score,
        explanation: roastResult.explanation,
      })
    }
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
  <main class="flex justify-center px-4 py-8">
    <div class="w-full max-w-[70%] flex flex-col gap-5">
      <header class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl uppercase font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
        >
          Roast My Code
        </h1>
        <p class="text-xl text-gray-600">
          Get your code roasted by AI. Prepare for brutal honesty and a dash of humor!
        </p>
      </header>

      <CodeEditor :is-loading="loading" @submit="handleCodeSubmit" />
      <RoastResults :result="result" :is-loading="loading" />
    </div>
  </main>
</template>

<style scoped></style>
