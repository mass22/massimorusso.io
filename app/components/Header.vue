<template>
  <UHeader>
    <template #left>
      <UButton
        to="/"
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
// Le composant LanguageSwitcher sera auto-importé
</script>
