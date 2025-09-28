<template>
  <div>
    <NuxtRouteAnnouncer />
    <div class="min-h-screen bg-gray-50">
      <!-- Header avec sélecteur de langue -->
      <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold text-gray-900">
                {{ $t('welcome') }}
              </h1>
            </div>
            <div class="flex items-center space-x-4">
              <!-- Bouton de changement de langue -->
              <button
                @click="toggleLanguage"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {{ currentLocale === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN' }}
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Contenu principal -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div class="text-center">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">
                {{ $t('hello') }} !
              </h2>
              <p class="text-lg text-gray-600 mb-6">
                {{ $t('welcome') }} sur votre application Nuxt avec i18n
              </p>
              <div class="space-y-2">
                <p><strong>{{ $t('home') }}:</strong> {{ $t('welcome') }}</p>
                <p><strong>{{ $t('about') }}:</strong> {{ $t('hello') }}</p>
                <p><strong>{{ $t('contact') }}:</strong> {{ $t('goodbye') }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// Utiliser le composable useI18n de Nuxt
const { locale } = useI18n()
const route = useRoute()
const router = useRouter()

// Détecter la locale actuelle depuis l'URL
const currentLocale = computed(() => {
  return route.path.startsWith('/en') ? 'en' : 'fr'
})

// Fonction pour basculer entre les langues
const toggleLanguage = () => {
  if (currentLocale.value === 'fr') {
    router.push('/en')
  } else {
    router.push('/')
  }
}
</script>
