<template>
  <ClientOnly>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="Nom" name="name">
        <UInput v-model="state.name" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="state.email" type="email" />
      </UFormField>

      <UFormField label="Message" name="message">
        <UTextarea v-model="state.message" />
      </UFormField>

      <UButton
        type="submit"
        :loading="pending"
        :disabled="pending"
      >
        {{ $t('contact.send') }}
      </UButton>
    </UForm>

    <template #fallback>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom</label>
          <div class="h-10 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <div class="h-10 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
          <div class="h-24 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
        </div>
        <div class="h-10 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse w-24"></div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { z } from 'zod'

const { t } = useI18n()
const toast = useToast()

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères')
})

const state = reactive({
  name: '',
  email: '',
  message: ''
})

const pending = ref(false)

const onSubmit = async () => {
  pending.value = true

  try {
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.add({
      title: t('contact.success'),
      description: t('contact.success_message')
    })

    // Reset form
    Object.assign(state, {
      name: '',
      email: '',
      message: ''
    })
  } catch (error) {
    toast.add({
      title: t('contact.error'),
      description: t('contact.error_message'),
      color: 'red'
    })
  } finally {
    pending.value = false
  }
}
</script>
