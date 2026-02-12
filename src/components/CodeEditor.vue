<script setup lang="ts">
import { ref, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

interface Props {
  isLoading?: boolean
  defaultValue?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  defaultValue: '',
  placeholder: '// Enter your code here...',
})

const emit = defineEmits<{
  submit: [code: string]
}>()

const code = ref(props.defaultValue)
const error = ref<string | null>(null)

const extensions = [javascript({ jsx: true })]

const handleSubmit = () => {
  if (!code.value.trim()) {
    error.value = 'Please enter some code before submitting'
    return
  }
  emit('submit', code.value)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault()
    handleSubmit()
  }
}

watch(code, () => {
  if (error.value) error.value = null
})
</script>

<template>
  <div class="gap-2.5 flex flex-col space-y-4" @keydown="handleKeyDown">
    <div
      class="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden shadow-sm"
      :class="{ 'opacity-60 pointer-events-none': isLoading }"
    >
      <div
        class="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/80"
      >
        <div class="flex space-x-2">
          <div class="w-3 h-3 rounded-full bg-red-500/80" />
          <div class="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div class="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div class="text-gray-400 text-sm font-medium">JavaScript</div>
      </div>
      <Codemirror
        v-model="code"
        :style="{ height: '400px' }"
        :theme="oneDark"
        :extensions="extensions"
        :placeholder="placeholder"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :disabled="isLoading"
      />
    </div>

    <div
      v-if="error"
      class="bg-red-50/50 backdrop-blur-sm text-red-600 p-4 rounded-xl border border-red-100"
    >
      {{ error }}
    </div>

    <div class="flex justify-end">
      <button
        @click="handleSubmit"
        :disabled="isLoading || !code.trim()"
        aria-label="Submit code for roasting"
        class="group relative px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden transition-all duration-200"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        ></div>
        <span class="relative">
          <div v-if="isLoading" class="flex items-center space-x-2">
            <div
              class="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce"
              style="animation-delay: 0ms"
            ></div>
            <div
              class="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce"
              style="animation-delay: 150ms"
            ></div>
            <div
              class="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce"
              style="animation-delay: 300ms"
            ></div>
          </div>
          <span v-else>Roast My Code</span>
        </span>
      </button>
    </div>
  </div>
</template>
