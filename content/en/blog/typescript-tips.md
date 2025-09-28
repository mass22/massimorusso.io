---
title: "TypeScript Tips for Vue 3"
description: "Discover TypeScript best practices to improve your Vue 3 development."
date: "2024-01-05"
category:
  name: "TypeScript"
  color: "purple"
tags: ["typescript", "vue", "types", "development"]
image: "/images/typescript-vue.jpg"
---

# TypeScript with Vue 3

TypeScript brings type safety and a better developer experience to your Vue 3 projects.

## Basic configuration

### Optimized tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Component typing

### Typed props

```typescript
interface Props {
  title: string
  count?: number
  items: string[]
}

const props = defineProps<Props>()
```

### Typed emits

```typescript
interface Emits {
  update: [value: string]
  delete: [id: number]
}

const emit = defineEmits<Emits>()
```

### Typed slots

```typescript
interface Slots {
  default(): any
  header(props: { title: string }): any
}

const slots = defineSlots<Slots>()
```

## Typed composables

```typescript
interface UseCounterOptions {
  initialValue?: number
  step?: number
}

interface UseCounterReturn {
  count: Ref<number>
  increment: () => void
  decrement: () => void
  reset: () => void
}

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { initialValue = 0, step = 1 } = options

  const count = ref(initialValue)

  const increment = () => count.value += step
  const decrement = () => count.value -= step
  const reset = () => count.value = initialValue

  return {
    count: readonly(count),
    increment,
    decrement,
    reset
  }
}
```

## Error handling

```typescript
interface ApiError {
  message: string
  code: number
  details?: Record<string, any>
}

const handleError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 500
    }
  }

  return {
    message: 'An unknown error occurred',
    code: 500
  }
}
```

## Conclusion

TypeScript with Vue 3 offers a robust and maintainable development experience.
