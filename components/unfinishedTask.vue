<template>
    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4">Overdue Tasks</h1>
        <!-- oppgaer over tidsfristen -->
        <ul v-if="overdueTasks.length">
            <li v-for="task in overdueTasks" :key="task.id"
                class="border p-4 mb-3 rounded-lg flex justify-between items-center bg-gray-200">
                <div>
                    <p class="font-semibold text-lg">{{ task.title }}</p>
                    <p class="text-gray-700">{{ task.description }}</p>
                    <p class="text-sm text-gray-500">Created by: {{ task.created_by }}</p>

                    <p class="text-sm text-red-600 font-bold">
                        Deadline: {{ formatDate(task.deadline) }} (Overdue)
                    </p>
                </div>

                <div class="flex space-x-2">
                    <button @click="completeTask(task.id)" class="bg-gray-300 hover:bg-gray-400 text-red-600 text-sm font-bold p-2 rounded">
                        Complete Task late
                    </button>
                </div>
            </li>
        </ul>

        <p v-else class="text-gray-600">No overdue tasks.</p>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTaskStore } from '~/stores/task'

const taskStore = useTaskStore()

// fjerne ikke overdue tasks
const overdueTasks = computed(() => {
    const now = new Date()
    return taskStore.tasks.filter(task => new Date(task.deadline) < now)
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
