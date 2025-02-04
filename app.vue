<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>

<script setup>
import Header from '~/components/header.vue'
import { useAuthStore } from '~/stores/auth'
import { onMounted } from 'vue'

const auth = useAuthStore()

onMounted(() => {
  console.log('Running auth store initialize() in onMounted')
  auth.initialize()
})
</script>
