<template>
    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4">My Assigned Tasks</h1>
        <!-- vise oppgaver tildelt -->
        <ul v-if="activeTasks.length">
            <li v-for="task in activeTasks" :key="task.id"
                class="border p-4 mb-3 rounded-lg flex justify-between items-center bg-gray-200">
                <div>
                    <p class="font-semibold text-lg">{{ task.title }}</p>
                    <p class="text-gray-700">{{ task.description }}</p>
                    <p class="text-sm text-gray-500">Created by: {{ task.created_by }}</p>

                    <p class="text-sm text-gray-600">
                        Deadline: {{ formatDate(task.deadline) }}
                    </p>
                </div>

                <div class="flex space-x-2">
                    <button @click="completeTask(task.id)" class="bg-green-500 hover:bg-green-600 font-bold text-white p-2 rounded">
                        Complete Task
                    </button>
                </div>
            </li>
        </ul>

        <p v-else class="text-gray-600">No active tasks.</p>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTaskStore } from '~/stores/task'

const taskStore = useTaskStore()

// fjerne overdue tasks
const activeTasks = computed(() => {
    const now = new Date()
    return taskStore.tasks.filter(task => new Date(task.deadline) >= now)
})

// Format deadline 
const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'No deadline';
}

onMounted(() => {
    taskStore.fetchTasks()
})

const completeTask = async (taskId) => {
    await taskStore.completeTask(taskId)
}
</script>
