/**
 * Composable pour gérer les routes localisées
 * Génère automatiquement les URLs avec le bon préfixe de langue
 */
export const useLocalizedRoute = () => {
  const { locale } = useI18n()

  /**
   * Génère une URL localisée
   * @param path - Le chemin de la route (ex: '/blog', '/contact')
   * @returns L'URL avec le bon préfixe de langue
   */
  const getLocalizedUrl = (path: string): string => {
    // Nettoyer le path (supprimer les slashes en début/fin)
    const cleanPath = path.replace(/^\/+|\/+$/g, '')

    // Si c'est la page d'accueil
    if (!cleanPath || cleanPath === '') {
      return locale.value === 'en' ? '/en' : '/'
    }

    // Pour les autres pages
    if (locale.value === 'en') {
      return `/en/${cleanPath}`
    } else {
      return `/${cleanPath}`
    }
  }

  /**
   * Génère l'URL de la page d'accueil selon la langue
   */
  const homeUrl = computed(() => getLocalizedUrl('/'))

  /**
   * Génère l'URL du blog selon la langue
   */
  const blogUrl = computed(() => getLocalizedUrl('/blog'))

  /**
   * Génère l'URL de la page about selon la langue
   */
  const aboutUrl = computed(() => getLocalizedUrl('/about'))

  /**
   * Génère l'URL de la page contact selon la langue
   */
  const contactUrl = computed(() => getLocalizedUrl('/contact'))

  return {
    getLocalizedUrl,
    homeUrl,
    blogUrl,
    aboutUrl,
    contactUrl
  }
}
