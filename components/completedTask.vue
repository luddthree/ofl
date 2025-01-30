<template>
    <!-- Completed Tasks List -->
    <h2 class="text-lg font-semibold mb-2 mt-6">Completed Tasks</h2>
    <ul v-if="taskStore.completedTasks.length">
        <li v-for="task in taskStore.completedTasks" :key="task.id" class="border p-2 mb-2 rounded bg-gray-200">
            <p><strong>{{ task.title }}</strong></p>
            <p>{{ task.description }}</p>
            <p class="text-sm text-gray-600">Created by: {{ task.created_by }}</p>
            <p class="text-green-600">Completed</p>
        </li>
    </ul>
    <p v-else class="text-gray-600">No completed tasks.</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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