<template>
    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4">My tasks</h1>
<!-- mine oppgaver -->
        <ul v-if="taskStore.createdTasks?.length">
            <li v-for="task in taskStore.createdTasks" :key="task.id"
                class="border p-4 mb-3 rounded-lg flex justify-between items-center bg-gray-200">
                <div>
                    <p class="font-semibold text-lg">{{ task.title }}</p>
                    <p class="text-gray-700">{{ task.description }}</p>
                    <p class="text-sm text-gray-500">Assigned to: {{ task.assigned_to }}</p>
                    
                    <p class="text-sm text-gray-600">
                        Deadline: {{ formatDate(task.deadline) }}
                    </p>

                    <p class="text-sm mt-1" :class="task.completed ? 'text-green-600' : 'text-yellow-500'">
                        Status: {{ task.completed ? 'Completed' : 'Pending' }}
                    </p>
                </div>

                <div class="flex space-x-2">
                    <button @click="editTask(task)" class="bg-yellow-500 text-white p-2 rounded">
                        Edit
                    </button>
                    <button @click="taskStore.deleteTask(task.id)" class="bg-red-500 text-white p-2 rounded">
                        Delete
                    </button>
                </div>
            </li>
        </ul>

        <p v-else class="text-gray-600">No tasks created by you.</p>


<!-- rediger oppgave popup -->
        <div v-if="isEditing" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg w-96">
                <h2 class="text-lg font-semibold mb-4">Edit Task</h2>
                <input v-model="editTitle" placeholder="Title" class="border p-2 w-full mb-2 rounded" />
                <textarea v-model="editDescription" placeholder="Description"
                    class="border p-2 w-full mb-2 rounded"></textarea>
                <input v-model="editAssignedTo" placeholder="Assign to (Email)"
                    class="border p-2 w-full mb-4 rounded" />

                <input type="date" v-model="editDeadline" class="border p-2 w-full mb-4 rounded" />

                <div class="flex justify-end space-x-2">
                    <button @click="saveTask" class="bg-blue-500 text-white p-2 rounded">
                        Save Changes
                    </button>
                    <button @click="isEditing = false" class="bg-gray-500 text-white p-2 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '~/stores/task'

const taskStore = useTaskStore()
const isEditing = ref(false)
const editTaskId = ref(null)
const editTitle = ref('')
const editDescription = ref('')
const editAssignedTo = ref('')
const editDeadline = ref('') 

// deadline 
const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'No deadline';
}

// rediger oppgave
const editTask = (task) => {
    editTaskId.value = task.id
    editTitle.value = task.title
    editDescription.value = task.description
    editAssignedTo.value = task.assigned_to
    editDeadline.value = task.deadline ? task.deadline.split('T')[0] : '' 
    isEditing.value = true
}

// lagre endringer
const saveTask = async () => {
    await taskStore.updateTask(editTaskId.value, editTitle.value, editDescription.value, editAssignedTo.value, editDeadline.value)
    isEditing.value = false
}
// hent oppgaver
onMounted(() => {
    taskStore.fetchTasks()
})
</script>
