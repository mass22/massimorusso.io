import { useAsyncData } from 'nuxt/app'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * Fonction utilitaire pour obtenir un document localisé depuis la collection Nuxt Content.
 * Utilise useI18n et queryCollection.
 */
declare const queryCollection: <T = unknown>(...args: unknown[]) => {
  path: (p: string) => { all: () => Promise<T[]> }
  all: () => Promise<T[]>
}

export function useLocalizedDoc(path: string) {
  const { locale } = useI18n()
  const current = computed(() => locale.value.split('-')[0]) // fr | en

  // Clé d'asyncData (ne dépend pas de la locale, on utilise watch pour re-fetch)
  const key = `content-${path}`
  const { data: docs, pending } = useAsyncData(key, () =>
    // On récupère toute la collection puis on filtre côté client
    queryCollection('pages').all()
  , { watch: [current] })

  /**
   * Représente un document de contenu localisé minimal.
   */
  type MDCNode = { tag?: string; props?: Record<string, unknown> }
  type LocalizedDoc = {
    id?: string
    stem?: string
    title?: string
    description?: string
    body?: { children?: MDCNode[] }
    _locale?: string
    _path?: string
    [key: string]: unknown
  }

  const doc = computed<LocalizedDoc | null>(() => {
    const list = Array.isArray(docs.value) ? (docs.value as LocalizedDoc[]) : []
    if (list.length === 0) return null
    const target = current.value
    const name = (String(path).replace(/^\//, '') || 'home').toLowerCase()

    const matchesName = (d: LocalizedDoc) => {
      const id = (d.id || '').toLowerCase()
      const stem = (d.stem || '').toLowerCase()
      const p = (d._path || '').toLowerCase()
      return stem.startsWith(name) || id.includes(`/${name}`) || p === `/${name}` || p.endsWith(`/${name}`)
    }

    const candidates = list.filter(matchesName)
    const pool = candidates.length > 0 ? candidates : list

    // 1) Sélection via _locale
    const byLocale = pool.find(d => d._locale === target)
    if (byLocale) return byLocale
    // 2) Fallback via suffixe
    const endsWithLocale = (s?: string) => !!s && (s.endsWith(`.${target}.md`) || s.endsWith(`.${target}.mdc`) || s.endsWith(`.${target}`))
    const bySuffix = pool.find(d => endsWithLocale(d.id) || endsWithLocale(d.stem))
    return bySuffix || pool[0] || null
  })

  return { doc, pending }
}