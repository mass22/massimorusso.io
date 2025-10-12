<template>
  <UHeader>
    <template #left>
      <UButton
        :to="homeUrl"
        color="gray"
        variant="ghost"
        icon="i-heroicons-home"
        :label="$t('home')"
      />
    </template>

    <template #right>
      <LanguageSwitcher />
    </template>
  </UHeader>
</template>

<script setup>
const { homeUrl } = useLocalizedRoute()
</script>
