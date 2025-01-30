import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [], // Ensure tasks are initialized
    completedTasks: [], // Ensure completedTasks are initialized
    createdTasks: [] // Ensure this is initialized
  }),
  actions: {
    async fetchTasks() {
      try {
        const authStore = useAuthStore()
        const response = await $fetch('http://localhost:8000/api/tasks', {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        this.tasks = response.assigned_tasks.filter(task => !task.completed)
        this.completedTasks = response.assigned_tasks.filter(task => task.completed)
        this.createdTasks = response.created_tasks // Store created tasks
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    },

    async deleteTask(taskId) {
      try {
        const authStore = useAuthStore();
        await $fetch(`http://localhost:8000/api/tasks/${taskId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
    
        // Remove the task from the store
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.createdTasks = this.createdTasks.filter(task => task.id !== taskId);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    },

    async createTask(title, description, assignedTo) {
      try {
        const authStore = useAuthStore()
        const newTask = await $fetch('http://localhost:8000/api/tasks', {
          method: 'POST',
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: { title, description, assigned_to: assignedTo }
        })
        this.tasks.push(newTask)
      } catch (error) {
        console.error('Failed to create task:', error)
      }
    },

    async updateTask(taskId, title, description, assignedTo) {
      try {
        const authStore = useAuthStore();
        const updatedTask = await $fetch(`http://localhost:8000/api/tasks/${taskId}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: { title, description, assigned_to: assignedTo }
        });
    
        // Update the task in the store
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) this.tasks[index] = updatedTask.task;
    
        const createdIndex = this.createdTasks.findIndex(task => task.id === taskId);
        if (createdIndex !== -1) this.createdTasks[createdIndex] = updatedTask.task;
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    },    

    async completeTask(taskId) {
      try {
        const authStore = useAuthStore()
        await $fetch(`http://localhost:8000/api/tasks/${taskId}/complete`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${authStore.token}` }
        })

        // Move the task from tasks to completedTasks
        const taskIndex = this.tasks.findIndex(task => task.id === taskId)
        if (taskIndex !== -1) {
          const completedTask = { ...this.tasks[taskIndex], completed: true }
          this.tasks.splice(taskIndex, 1) // Remove from tasks
          this.completedTasks.push(completedTask) // Add to completedTasks
        }
      } catch (error) {
        console.error('Failed to complete task:', error)
      }
    }
  }
})
