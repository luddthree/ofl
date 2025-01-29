<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    
    <!-- User Info -->
    <div class="mb-6 p-4 border rounded">
      <p class="text-lg font-semibold">Welcome, {{ authStore.user?.name }}!</p>
      <p>Email: {{ authStore.user?.email }}</p>
      <p>Role: {{ authStore.user?.role }}</p>
      <!-- <button @click="logout" class="bg-red-500 text-white p-2 rounded mt-2">Logout</button> -->
    </div>
    
    <!-- Task Creation Form -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">Create a New Task</h2>
      <input v-model="title" placeholder="Title" class="border p-2 w-full mb-2" />
      <textarea v-model="description" placeholder="Description" class="border p-2 w-full mb-2"></textarea>
      <input v-model="assignedTo" placeholder="Assign to (Email)" class="border p-2 w-full mb-2" />
      <button @click="createTask" class="bg-blue-500 text-white p-2 rounded">Add Task</button>
    </div>
    
    <!-- Task List -->
    <h2 class="text-lg font-semibold mb-2">My Assigned Tasks</h2>
    <ul v-if="taskStore.tasks.length">
      <li v-for="task in taskStore.tasks" :key="task.id" class="border p-2 mb-2 rounded">
        <p><strong>{{ task.title }}</strong></p>
        <p>{{ task.description }}</p>
        <p class="text-sm text-gray-600">Created by: {{ task.created_by }}</p>
        <button @click="completeTask(task.id)" class="bg-green-500 text-white p-2 rounded mt-2">Complete Task</button>
      </li>
    </ul>
    <p v-else class="text-gray-600">No tasks assigned.</p>
    
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useTaskStore } from '~/stores/task'

const authStore = useAuthStore()
const taskStore = useTaskStore()
const title = ref('')
const description = ref('')
const assignedTo = ref('')

onMounted(() => {
  authStore.fetchUser()
  taskStore.fetchTasks()
})

const createTask = () => {
  if (!title.value || !assignedTo.value) {
    alert('Title and email are required.')
    return
  }
  taskStore.createTask(title.value, description.value, assignedTo.value)
  title.value = ''
  description.value = ''
  assignedTo.value = ''
}

const completeTask = async (taskId) => {
  await taskStore.completeTask(taskId)
}


</script>

<style scoped>
/* Optional styling */
</style>
