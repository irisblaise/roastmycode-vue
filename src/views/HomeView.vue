<script setup lang="ts">
import { ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import CodeEditor from '../components/CodeEditor.vue'
import RoastResults from '@/components/RoastResults.vue'

const result = ref({
  roast: 'Your code is so nested, it needs a GPS to find its way out!',
  score: 7,
  explanation: 'Consider refactoring to reduce complexity',
  error: undefined,
})

const loading = ref(false)
</script>

<template>
  <div>
    <TheWelcome />
    <CodeEditor />
    <RoastResults :result="result" :is-loading="loading" />
  </div>
</template>

<style scoped></style>
