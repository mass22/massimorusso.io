<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <main>
      <slot />
    </main>

    <UFooter>
      <template #left>
        <p class="text-sm text-gray-500">
          © 2024 {{ $t('footer.copyright') }}
        </p>
      </template>

      <template #right>
        <div class="flex items-center space-x-4">
          <UButton
            to="/"
            color="gray"
            variant="ghost"
            size="sm"
          >
            {{ $t('home') }}
          </UButton>
          <UButton
            to="/about"
            color="gray"
            variant="ghost"
            size="sm"
          >
            {{ $t('about') }}
          </UButton>
          <UButton
            to="/contact"
            color="gray"
            variant="ghost"
            size="sm"
          >
            {{ $t('contact') }}
          </UButton>
        </div>
      </template>
    </UFooter>
  </div>
</template>

<script setup>
// Layout par défaut avec header et footer
</script>
