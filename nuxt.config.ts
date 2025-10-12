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
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',
  experimental: {
    payloadExtraction: false
  },
  router: {
    options: {
      strict: false
    }
  },
  ui: {
    colorMode: true,
    fonts: true,
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      transitions: true,
      defaultVariants: {
        color: 'primary',
        size: 'md'
      }
    }
  },
  i18n: {
    strategy: 'prefix_except_default', // / (fr) et /en/...
    defaultLocale: 'fr',
    langDir: 'locales',
    locales: [
      { code: 'fr', language: 'fr-CA', name: 'Français', files: ['fr.json'] },
      { code: 'en', language: 'en-US', name: 'English',  files: ['en.json'] }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
      fallbackLocale: 'fr'
    },
    compilation: { strictMessage: false }
  },
  content: {
    // rien à forcer ici : on filtre par _locale côté requêtes
  }
})
