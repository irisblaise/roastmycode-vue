<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-1 mx-auto w-full p-5 px-4">
      <slot></slot>
    </main>
    <FooterBar />
  </div>
</template>
