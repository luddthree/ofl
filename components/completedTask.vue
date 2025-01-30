<template>
    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4">Completed Tasks</h1>

        <ul v-if="taskStore.completedTasks.length">
            <li v-for="task in taskStore.completedTasks" :key="task.id"
                class="border p-4 mb-3 rounded-lg flex justify-between items-center bg-gray-200">
                <div>
                    <p class="font-semibold text-lg">{{ task.title }}</p>
                    <p class="text-gray-700">{{ task.description }}</p>
                    <p class="text-sm text-gray-500">Created by: {{ task.created_by }}</p>
                    <p class="text-green-600">Completed</p>
                </div>
            </li>
        </ul>

        <p v-else class="text-gray-600">No completed tasks.</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useTaskStore } from '~/stores/task'

const authStore = useAuthStore()
const taskStore = useTaskStore()

onMounted(() => {
    authStore.fetchUser()
    taskStore.fetchTasks()
})
</script>

<style scoped>
/* Optional styling */
</style>
