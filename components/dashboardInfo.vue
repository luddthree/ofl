<template>
    <!-- bruker info -->
    <div class="mb-6 p-4">
        <p class="text-lg font-semibold">Welcome, {{ authStore.user?.name }}!</p>
        <p>Email: {{ authStore.user?.email }}</p>
        <p>Role: {{ authStore.user?.role }}</p>
    </div>
</template>


<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
    authStore.fetchUser()
})
</script>