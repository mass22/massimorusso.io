import { computed, type ComputedRef } from 'vue';

export type HeroData = { title: string; subtitle?: string; image?: string }
export type FeatureItem = { title: string; description?: string }
export type StatItem = { label: string; value: string }
export type TeamMember = { name: string; role?: string; avatar?: string }

/**
 * Extrait des blocs utiles d'un document Nuxt Content (MDC minimark):
 * - heroData: frontmatter meta.hero | hero, sinon depuis tuple <hero>
 * - features: frontmatter meta.features | features (tableau)
 * - restDoc: document avec body.value sans les tuples hero/feature-list
 */
type DocRecord = {
  meta?: { hero?: HeroData; features?: FeatureItem[]; stats?: StatItem[]; team?: TeamMember[] }
  hero?: HeroData
  features?: FeatureItem[]
  stats?: StatItem[]
  team?: TeamMember[]
  body?: { value?: unknown[]; type?: string }
  [key: string]: unknown
}

export function useMdcBlocks(doc: ComputedRef<DocRecord | null>) {
  type Tuple = [string, Record<string, unknown>?, ...unknown[]]
  const mdTuples = computed<Tuple[]>(() => {
    const valueNode = (doc.value?.body?.value ?? []) as unknown
    return Array.isArray(valueNode) ? (valueNode as Tuple[]) : []
  })
  const getTag = (t: Tuple | unknown) => (Array.isArray(t) ? String((t as Tuple)[0]).toLowerCase() : '')
  const heroTuple = computed<Tuple | null>(() => mdTuples.value.find(t => getTag(t) === 'hero') || null)
  const heroProps = computed<Record<string, unknown>>(() => ((heroTuple.value?.[1] as Record<string, unknown>) || {}))

  const heroData = computed<HeroData | null>(() => {
    const d: DocRecord = (doc.value as DocRecord | null) || {}
    const metaHero = d.meta?.hero
    const rootHero = d.hero
    if (metaHero && metaHero.title) return metaHero as HeroData
    if (rootHero && rootHero.title) return rootHero as HeroData
    if (heroTuple.value) {
      return {
        title: heroProps.value.title as string,
        subtitle: heroProps.value.subtitle as string | undefined,
        image: heroProps.value.image as string | undefined
      }
    }
    return null
  })

  const features = computed<FeatureItem[]>(() => {
    const d: DocRecord = (doc.value as DocRecord | null) || {}
    const metaFeatures = d.meta?.features as FeatureItem[] | undefined
    const rootFeatures = d.features as FeatureItem[] | undefined
    return metaFeatures || rootFeatures || []
  })

  const restTuples = computed<Tuple[]>(() => mdTuples.value.filter(t => {
    const tag = getTag(t)
    return tag !== 'hero' && tag !== 'feature-list' && tag !== 'stats-grid' && tag !== 'team-list'
  }))

  const restDoc = computed<DocRecord | null>(() => {
    const value = doc.value as DocRecord | null
    if (!value) return null
    return { ...value, body: { ...(value.body || {}), value: restTuples.value } }
  })

  const stats = computed<StatItem[]>(() => {
    const d: DocRecord = (doc.value as DocRecord | null) || {}
    return d.meta?.stats || d.stats || []
  })

  const team = computed<TeamMember[]>(() => {
    const d: DocRecord = (doc.value as DocRecord | null) || {}
    return d.meta?.team || d.team || []
  })

  return { heroData, features, stats, team, restDoc }
}


