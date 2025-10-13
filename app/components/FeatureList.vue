<script setup lang="ts">
type Item = { title: string; description?: string };
defineProps<{ items: Item[] }>()
</script>

<template>
  <section class="grid md:grid-cols-3 gap-6 my-10">
    <article v-for="(it, i) in items" :key="i" class="p-6 rounded-2xl border shadow-sm">
      <h3 class="text-xl font-semibold">{{ it.title }}</h3>
      <p class="mt-2 text-gray-600">{{ it.description }}</p>
    </article>
    <div class="prose prose-slate dark:prose-invert max-w-none md:col-span-3 col-span-1 mt-6">
      <slot />
    </div>
  </section>
</template>