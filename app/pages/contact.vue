<template>
  <UContainer>
    <div class="py-12">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {{ $t('contact.title') }}
        </h1>

        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('contact.description') }}
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Formulaire de contact -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {{ $t('contact.send_message') }}
            </h2>
            <ContactForm />
          </div>

          <!-- Informations de contact -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {{ $t('contact.info') }}
            </h2>

            <div class="space-y-4">
              <div class="flex items-center">
                <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span class="text-gray-700 dark:text-gray-300">contact@example.com</span>
              </div>

              <div class="flex items-center">
                <UIcon name="i-heroicons-phone" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span class="text-gray-700 dark:text-gray-300">+33 1 23 45 67 89</span>
              </div>

              <div class="flex items-center">
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span class="text-gray-700 dark:text-gray-300">Paris, France</span>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {{ $t('contact.social') }}
              </h3>
              <div class="flex space-x-4">
                <UButton
                  icon="i-simple-icons-github"
                  color="gray"
                  variant="outline"
                  to="https://github.com"
                  external
                />
                <UButton
                  icon="i-simple-icons-linkedin"
                  color="gray"
                  variant="outline"
                  to="https://linkedin.com"
                  external
                />
                <UButton
                  icon="i-simple-icons-twitter"
                  color="gray"
                  variant="outline"
                  to="https://twitter.com"
                  external
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
// Meta tags
useHead({
  title: 'Contact',
  meta: [
    { name: 'description', content: 'Contactez-moi pour discuter de vos projets' }
  ]
})
</script>
