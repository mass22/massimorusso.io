<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Nom" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormGroup>

    <UFormGroup label="Message" name="message">
      <UTextarea v-model="state.message" />
    </UFormGroup>

    <UButton
      type="submit"
      :loading="pending"
      :disabled="pending"
    >
      {{ $t('contact.send') }}
    </UButton>
  </UForm>
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
