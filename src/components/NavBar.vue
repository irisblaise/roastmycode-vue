<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="bg-white/50 backdrop-blur-sm border-b border-gray-100">
    <div class="mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <RouterLink
          to="/"
          class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
        >
          RoastMyCode
        </RouterLink>
        <div class="flex space-x-4">
          <RouterLink to="/archive" class="text-gray-600 hover:text-gray-900 transition-colors">
            Archive
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
