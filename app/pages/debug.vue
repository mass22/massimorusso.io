<script setup lang="ts">
// Page de debug pour tester queryCollection (remplace queryContent déprécié)
const error = ref<string | null>(null)
const allContent = ref<any[]>([])
const blogContent = ref<any[]>([])
const isLoading = ref(true)

// Fonction pour tester queryCollection
const testQueryCollection = async () => {
  try {
    isLoading.value = true
    error.value = null

    // Test de disponibilité de queryCollection
    // @ts-ignore
    if (typeof queryCollection === 'undefined') {
      throw new Error('queryCollection n\'est pas disponible. Vérifiez que @nuxt/content v3 est correctement installé.')
    }

    // Test de récupération du contenu avec queryCollection
    // @ts-ignore
    const allResult = await queryCollection('blog').all()
    allContent.value = allResult || []
    blogContent.value = allResult || [] // Même contenu pour les deux sections

    console.log('✅ queryCollection fonctionne correctement')
    console.log('📦 All content:', allContent.value)
    console.log('📚 Blog content:', blogContent.value)

    // Debug détaillé de la structure des articles
    if (allContent.value && allContent.value.length > 0) {
      console.log('🔍 Structure du premier article:', allContent.value[0])
      allContent.value.forEach((post, index) => {
        console.log(`📄 Article ${index + 1}:`, {
          title: post.title,
          _locale: post._locale,
          _path: post._path,
          date: post.date
        })
      })
    }

  } catch (err) {
    error.value = `Erreur: ${err}`
    console.error('❌ Erreur queryCollection:', err)
  } finally {
    isLoading.value = false
  }
}

// Test au montage du composant
onMounted(() => {
  testQueryCollection()
})

// Statistiques calculées
const stats = computed(() => {
  if (!allContent.value) return null

  const total = allContent.value.length
  const blogPosts = blogContent.value.length
  const locales = [...new Set(allContent.value.map((item: any) => item._locale).filter(Boolean))]

  return {
    total,
    blogPosts,
    locales: locales.length,
    localesList: locales
  }
})
</script>

<template>
  <div class="container mx-auto p-6 space-y-6">
    <!-- En-tête -->
    <UPageHeader>
      <template #headline>
        <UBadge color="warning" variant="soft">Debug</UBadge>
      </template>
      <template #title>
        Debug du contenu (queryCollection)
      </template>
      <template #description>
        Test de queryCollection pour remplacer queryContent déprécié
      </template>
    </UPageHeader>

    <!-- Indicateur de chargement -->
    <UCard v-if="isLoading">
      <div class="flex items-center justify-center py-8">
        <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin mr-2" />
        <span>Chargement du contenu...</span>
      </div>
    </UCard>

    <!-- Erreur si problème de chargement -->
    <UAlert v-if="error" color="error" variant="soft" :title="error" />

    <!-- Statistiques -->
    <UCard v-if="stats && !isLoading">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-chart-bar" class="w-5 h-5" />
          <h3 class="text-lg font-semibold">Statistiques du contenu</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-primary">{{ stats.total }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Total des articles</div>
        </div>
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-primary">{{ stats.blogPosts }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Articles de blog</div>
        </div>
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-primary">{{ stats.locales }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Langues disponibles</div>
        </div>
      </div>

      <div v-if="stats.localesList.length > 0" class="mt-4">
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="locale in stats.localesList"
            :key="locale"
            color="primary"
            variant="soft"
          >
            {{ locale }}
          </UBadge>
        </div>
      </div>
    </UCard>

    <!-- Contenu détaillé -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Articles trouvés -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-document-text" class="w-5 h-5" />
            <h3 class="text-lg font-semibold">Articles trouvés</h3>
          </div>
        </template>

        <div v-if="allContent.length > 0" class="space-y-2">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ allContent.length }} articles trouvés
          </div>
          <div class="space-y-2 max-h-96 overflow-y-auto">
            <UCard
              v-for="item in allContent"
              :key="item._path"
              class="p-3"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="font-medium">{{ item.title || 'Sans titre' }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">{{ item._path }}</div>
                  <div v-if="item._locale" class="text-xs mt-1">
                    <UBadge size="xs" color="primary" variant="soft">{{ item._locale }}</UBadge>
                  </div>
                  <div v-if="item.date" class="text-xs mt-1">
                    <UBadge size="xs" color="success" variant="soft">
                      {{ new Date(item.date).toLocaleDateString() }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-8">
          Aucun article trouvé
        </div>
      </UCard>

      <!-- Données brutes -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-code-bracket" class="w-5 h-5" />
            <h3 class="text-lg font-semibold">Données brutes</h3>
          </div>
        </template>

        <pre class="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto max-h-96">{{ JSON.stringify(allContent, null, 2) }}</pre>
      </UCard>
    </div>

    <!-- Instructions -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-information-circle" class="w-5 h-5" />
          <h3 class="text-lg font-semibold">Instructions</h3>
        </div>
      </template>

      <div class="space-y-2 text-sm">
        <p><strong>queryCollection</strong> remplace <code>queryContent</code> dans Nuxt Content v3.</p>
        <p>Assurez-vous que :</p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li>La collection "blog" est définie dans <code>content.config.ts</code></li>
          <li>Les fichiers Markdown sont dans <code>content/blog/</code></li>
          <li>Les fichiers ont les bonnes extensions (ex: <code>.fr.md</code>, <code>.en.md</code>)</li>
        </ul>
      </div>
    </UCard>
  </div>
</template>
