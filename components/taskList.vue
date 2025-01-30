<template>
    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4">My Assigned Tasks</h1>

        <ul v-if="taskStore.tasks.length">
            <li v-for="task in taskStore.tasks" :key="task.id"
                class="border p-4 mb-3 rounded-lg flex justify-between items-center bg-gray-200">
                <div>
                    <p class="font-semibold text-lg">{{ task.title }}</p>
                    <p class="text-gray-700">{{ task.description }}</p>
                    <p class="text-sm text-gray-500">Created by: {{ task.created_by }}</p>
                </div>

                <div class="flex space-x-2">
                    <button @click="completeTask(task.id)" class="bg-green-500 text-white p-2 rounded">
                        Complete Task
                    </button>
                </div>
            </li>
        </ul>

        <p v-else class="text-gray-600">No tasks assigned.</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from '~/stores/task'

const taskStore = useTaskStore()

onMounted(() => {
    taskStore.fetchTasks()
})

const completeTask = async (taskId) => {
    await taskStore.completeTask(taskId)
}
</script>
