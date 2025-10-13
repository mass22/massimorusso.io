<script setup lang="ts">
type Member = { name: string; role?: string; avatar?: string }
defineProps<{ members: Member[] }>()
</script>

<template>
  <section class="grid md:grid-cols-3 gap-6 my-10">
    <article v-for="(m, i) in members" :key="i" class="p-6 rounded-2xl border shadow-sm">
      <img v-if="m.avatar" :src="m.avatar" :alt="m.name" class="w-16 h-16 rounded-full mb-3" />
      <h3 class="text-lg font-semibold">{{ m.name }}</h3>
      <p class="text-gray-600">{{ m.role }}</p>
    </article>
  </section>
</template>

<style scoped>
</style>

