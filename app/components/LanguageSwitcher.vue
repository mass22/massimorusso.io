<template>
  <div class="flex items-center space-x-2">
    <!-- Sélecteur de thème -->
    <ThemeToggle />

    <!-- Sélecteur de langue -->
    <UDropdownMenu :title="t('language.title')" :items="items">
      <UButton
        color="white"
        :label="currentLanguage.label"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdownMenu>
  </div>
</template>

<script setup>
const { locale, locales, setLocale, t } = useI18n()
const router = useRouter()
const route = useRoute()

const currentLanguage = computed(() => {
  return locales.value.find(l => l.code === locale.value) || locales.value[0]
})

const items = computed(() => [
  {
    label: '🇫🇷 Français',
    onSelect: () => switchLanguage('fr')
  },
  {
    label: '🇬🇧 English',
    onSelect: () => switchLanguage('en')
  }
])

const switchLanguage = (newLocale) => {
  setLocale(newLocale)

  // Construire la nouvelle URL en préservant le chemin actuel
  const currentPath = route.path

  // Si on est sur la page d'accueil, rediriger vers la nouvelle page d'accueil
  if (currentPath === '/' || currentPath === '/en') {
    if (newLocale === 'en') {
      router.push('/en')
    } else {
      router.push('/')
    }
    return
  }

  // Pour les autres pages, préserver le chemin et ajouter/supprimer le préfixe de langue
  let newPath = currentPath

  if (newLocale === 'en') {
    // Ajouter le préfixe /en si pas déjà présent
    if (!newPath.startsWith('/en')) {
      newPath = '/en' + newPath
    }
  } else {
    // Supprimer le préfixe /en pour la langue par défaut
    if (newPath.startsWith('/en')) {
      newPath = newPath.substring(3) // Supprimer '/en'
    }
  }

  router.push(newPath)
}
</script>
