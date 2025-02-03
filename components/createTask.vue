<template>
    <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Create a New Task</h2>
        
        <input v-model="title" placeholder="Title" class="border p-2 w-full mb-2" />
        <textarea v-model="description" placeholder="Description" class="border p-2 w-full mb-2"></textarea>
        <input v-model="assignedTo" placeholder="Assign to (Email)" class="border p-2 w-full mb-2" />

        <!-- Deadline Picker -->
        <input type="date" v-model="deadline" class="border p-2 w-full mb-2" />

        <button @click="createTask" class="bg-blue-500 text-white p-2 rounded">Add Task</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '~/stores/task'

const taskStore = useTaskStore()
const title = ref('')
const description = ref('')
const assignedTo = ref('')
const deadline = ref('') // Add deadline field

onMounted(() => {
    taskStore.fetchTasks()
})

const createTask = () => {
    if (!title.value || !assignedTo.value) {
        alert('Title and email are required.')
        return
    }
    
    taskStore.createTask(title.value, description.value, assignedTo.value, deadline.value)
    
    title.value = ''
    description.value = ''
    assignedTo.value = ''
    deadline.value = '' // Clear input after submitting
}

</script>
