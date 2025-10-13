<script setup lang="ts">
defineProps<{ title: string; subtitle?: string; image?: string }>()
</script>

<template>
  <section class="relative overflow-hidden rounded-2xl">
    <img v-if="image" :src="image" :alt="title" class="w-full h-64 object-cover" />
    <div v-if="image" class="absolute inset-0 bg-black/40" />
    <div class="p-8 md:p-12 relative">
      <h1 class="text-3xl md:text-5xl font-bold" :class="image ? 'text-white drop-shadow' : ''">{{ title }}</h1>
      <p class="mt-3 text-lg md:text-xl" :class="image ? 'text-white/90' : 'text-gray-600'">{{ subtitle }}</p>
      <div class="mt-6">
        <slot />
      </div>
    </div>
  </section>
</template>