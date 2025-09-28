<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UButton
      color="white"
      :label="currentLanguage.label"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
  </UDropdown>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()
const router = useRouter()
const route = useRoute()

const currentLanguage = computed(() => {
  return locales.value.find(l => l.code === locale.value) || locales.value[0]
})

const items = computed(() => [
  [{
    label: '🇫🇷 Français',
    click: () => switchLanguage('fr')
  }],
  [{
    label: '🇬🇧 English',
    click: () => switchLanguage('en')
  }]
])

const switchLanguage = (newLocale) => {
  setLocale(newLocale)
  // Rediriger vers la nouvelle locale
  if (newLocale === 'en') {
    router.push('/en')
  } else {
    router.push('/')
  }
}
</script>
