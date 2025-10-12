<template>
  <ClientOnly>
    <UButton
      @click="toggleColorMode"
      :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
      color="gray"
      variant="ghost"
      size="sm"
    />
    <template #fallback>
      <UButton
        icon="i-heroicons-sun"
        color="gray"
        variant="ghost"
        size="sm"
      />
    </template>
  </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
