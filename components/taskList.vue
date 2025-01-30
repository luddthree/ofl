<template>
    <!-- Task List -->
    <h2 class="text-lg font-semibold mb-2">My Assigned Tasks</h2>
    <ul v-if="taskStore.tasks.length">
        <li v-for="task in taskStore.tasks" :key="task.id" class="border p-2 mb-2 rounded">
            <p><strong>{{ task.title }}</strong></p>
            <p>{{ task.description }}</p>
            <p class="text-sm text-gray-600">Created by: {{ task.created_by }}</p>
            <button @click="completeTask(task.id)" class="bg-green-500 text-white p-2 rounded mt-2">Complete
                Task</button>
        </li>
    </ul>
    <p v-else class="text-gray-600">No tasks assigned.</p>
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