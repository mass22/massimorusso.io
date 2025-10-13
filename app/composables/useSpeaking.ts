import { useAsyncData } from 'nuxt/app'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type SpeakingItem = {
  id: string
  title: string
  description?: string
  date?: string | Date
  type: 'podcast' | 'talk' | 'conference' | 'video'
  tags?: string[]
  link?: string
  speakers?: string[]
  path?: string
  _path?: string
  _locale?: string
  slug?: string
}

declare const queryCollection: <T = unknown>(...args: unknown[]) => {
  where?: (q: Record<string, unknown>) => unknown
  path?: (p: string) => { all: () => Promise<T[]> }
  all: () => Promise<T[]>
}

export function useSpeaking() {
  const { locale } = useI18n()
  const current = computed(() => locale.value.split('-')[0])

  const key = 'speaking-list'
  const { data, pending } = useAsyncData(key, () => queryCollection<SpeakingItem>('speaking').all(), { watch: [current] })

  const items = computed<SpeakingItem[]>(() => {
    const list = Array.isArray(data.value) ? (data.value as any[]) : []
    const loc = current.value
    const matches = (it: any) => {
      if (it?._locale) return it._locale === loc
      const id = String(it?.id || '')
      const stem = String(it?.stem || '')
      const isFR = id.includes('.fr.') || stem.includes('.fr')
      const isEN = id.includes('.en.') || stem.includes('.en')
      return loc === 'fr' ? isFR : isEN
    }
    const filtered = list.filter(matches)
    const base = filtered.length > 0 ? filtered : list
    return base
      .slice()
      .sort((a, b) => (new Date((b as any).date || 0).getTime()) - (new Date((a as any).date || 0).getTime())) as SpeakingItem[]
  })

  const filterByType = (type?: SpeakingItem['type']) => computed(() => {
    const list = items.value
    if (!type) return list
    return list.filter(i => i.type === type)
  })

  return { items, pending, filterByType }
}


