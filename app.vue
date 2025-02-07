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

const authStore = useAuthStore()

onMounted(() => {
  console.log('Running auth store initialize() in onMounted')
  authStore.initialize()

})


</script>
