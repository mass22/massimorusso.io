<script setup lang="ts">
defineProps<{
  title?: string
  doc: any
  extra?: Record<string, unknown>
}>()

const stringify = (v: unknown) => {
  try { return JSON.stringify(v, null, 2) } catch { return String(v) }
}
</script>

<template>
  <div class="mb-6 space-y-2">
    <UAlert :title="title || 'Debug'" color="info" variant="soft">
      <template #description>
        <div class="space-y-1 text-xs">
          <div>title: {{ doc?.title }}</div>
          <div>_path: {{ doc?._path }}</div>
          <div>_locale: {{ doc?._locale }}</div>
          <div>body.type: {{ doc?.body?.type }}</div>
          <div>tuples length: {{ doc?.body?.value?.length || 0 }}</div>
        </div>
      </template>
    </UAlert>

    <details>
      <summary class="cursor-pointer text-xs">doc JSON</summary>
      <pre class="text-xs overflow-auto max-h-64">{{ stringify(doc || {}) }}</pre>
    </details>

    <details v-if="extra">
      <summary class="cursor-pointer text-xs">extra JSON</summary>
      <pre class="text-xs overflow-auto max-h-64">{{ stringify(extra) }}</pre>
    </details>
  </div>
</template>

<style scoped>
</style>

