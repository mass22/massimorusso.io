<template>
  <UContainer>
    <div class="py-12">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">
          {{ $t('about.title') }}
        </h1>

        <div class="prose prose-lg max-w-none">
          <p class="text-lg text-gray-600 mb-6">
            {{ $t('about.description') }}
          </p>

          <div class="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 class="text-xl font-semibold text-blue-900 mb-4">
              {{ $t('about.skills') }}
            </h2>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="skill in skills"
                :key="skill"
                color="blue"
                variant="soft"
              >
                {{ skill }}
              </UBadge>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UCard>
              <template #header>
                <h3 class="text-lg font-semibold">{{ $t('about.experience') }}</h3>
              </template>
              <p>{{ $t('about.experience_description') }}</p>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="text-lg font-semibold">{{ $t('about.passion') }}</h3>
              </template>
              <p>{{ $t('about.passion_description') }}</p>
            </UCard>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
const skills = [
  'Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript',
  'CSS', 'HTML', 'Node.js', 'Git'
]

// Meta tags
useHead({
  title: 'À propos',
  meta: [
    { name: 'description', content: 'Découvrez mon parcours et mes compétences en développement web' }
  ]
})
</script>
