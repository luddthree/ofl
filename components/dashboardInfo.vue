<template>
    <!-- User Info -->
    <div class="mb-6 p-4 border rounded">
        <p class="text-lg font-semibold">Welcome, {{ authStore.user?.name }}!</p>
        <p>Email: {{ authStore.user?.email }}</p>
        <p>Role: {{ authStore.user?.role }}</p>
        <!-- <button @click="logout" class="bg-red-500 text-white p-2 rounded mt-2">Logout</button> -->
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