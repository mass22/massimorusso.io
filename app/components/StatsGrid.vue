<script setup lang="ts">
type Stat = { label: string; value: string }
defineProps<{ stats: Stat[] }>()
</script>

<template>
  <section class="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
    <div v-for="(s, i) in stats" :key="i" class="p-6 rounded-2xl border shadow-sm text-center">
      <div class="text-3xl font-bold">{{ s.value }}</div>
      <div class="text-gray-600 mt-1">{{ s.label }}</div>
    </div>
  </section>
</template>

<style scoped>
</style>

