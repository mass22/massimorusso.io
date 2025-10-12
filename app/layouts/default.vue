<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Header />

    <main>
      <slot />
    </main>

    <UFooter>
      <template #left>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          © {{ new Date().getFullYear() }} {{ $t('footer.copyright') }}
        </p>
      </template>

      <template #right>
        <div class="flex items-center space-x-4">
          <UButton
            :to="homeUrl"
            color="gray"
            variant="ghost"
            size="sm"
          >
            {{ $t('home') }}
          </UButton>
          <UButton
            :to="aboutUrl"
            color="gray"
            variant="ghost"
            size="sm"
          >
            {{ $t('about.title') || 'À propos' }}
          </UButton>
          <UButton
            :to="contactUrl"
            color="gray"
            variant="ghost"
            size="sm"
          >
            {{ $t('contact.title') || 'Contact' }}
          </UButton>
        </div>
      </template>
    </UFooter>
  </div>
</template>

<script setup>
const { homeUrl, aboutUrl, contactUrl } = useLocalizedRoute()
</script>
