// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'nuxt-mcp',
    '@nuxtjs/i18n'
  ],
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',
  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR' },
      { code: 'en', language: 'en-US' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    messages: {
      fr: {
        welcome: 'Bienvenue',
        hello: 'Bonjour',
        goodbye: 'Au revoir',
        home: 'Accueil',
        about: 'À propos',
        contact: 'Contact',
        language: 'Langue'
      },
      en: {
        welcome: 'Welcome',
        hello: 'Hello',
        goodbye: 'Goodbye',
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        language: 'Language'
      }
    }
  }
})
