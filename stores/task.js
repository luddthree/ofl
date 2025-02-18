import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    completedTasks: [],
    createdTasks: [],
  }),
  actions: {
    // Fetch tasks
    async fetchTasks() {
      try {
        const authStore = useAuthStore()
        const response = await $fetch('/api/tasks', {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        this.tasks = response.assigned_tasks.filter(task => !task.completed)
        this.completedTasks = response.assigned_tasks.filter(task => task.completed)
        this.createdTasks = response.created_tasks
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    },

    // Delete task
    async deleteTask(taskId) {
      try {
        const authStore = useAuthStore()
        await $fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${authStore.token}` }
        })

        // Remove task from the store
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        this.createdTasks = this.createdTasks.filter(task => task.id !== taskId)
      } catch (error) {
        console.error('Failed to delete task:', error)
      }
    },

    // Create task
    async createTask(title, description, assignedTo, deadline) {
      try {
        const authStore = useAuthStore()
        const newTask = await $fetch('/api/tasks', {
          method: 'POST',
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: { title, description, assigned_to: assignedTo, deadline }
        })
        this.tasks.push(newTask.task)
      } catch (error) {
        console.error('Failed to create task:', error)
      }
    },

    // Send email
    async sendEmail() {
      try {
        const authStore = useAuthStore()
        const email = await $fetch('/api/tasks/emsend', {
          method: 'POST',
          headers: { Authorization: `Bearer ${authStore.token}` },
        })
        this.tasks.push(email.task)
      } catch (error) {
        console.error('Failed to send email:', error)
      }
    },

    // Update task
    async updateTask(taskId, title, description, assignedTo, deadline) {
      try {
        const authStore = useAuthStore()
        const updatedTask = await $fetch(`/api/tasks/${taskId}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: { title, description, assigned_to: assignedTo, deadline }
        })

        // Update the task in the store
        const index = this.tasks.findIndex(task => task.id === taskId)
        if (index !== -1) this.tasks[index] = updatedTask.task

        const createdIndex = this.createdTasks.findIndex(task => task.id === taskId)
        if (createdIndex !== -1) this.createdTasks[createdIndex] = updatedTask.task
      } catch (error) {
        console.error('Failed to update task:', error)
      }
    },

    // Complete task
    async completeTask(taskId) {
      try {
        const authStore = useAuthStore()
        await $fetch(`/api/tasks/${taskId}/complete`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${authStore.token}` }
        })

        // Move the task to completedTasks
        const taskIndex = this.tasks.findIndex(task => task.id === taskId)
        if (taskIndex !== -1) {
          const completedTask = { ...this.tasks[taskIndex], completed: true }
          this.tasks.splice(taskIndex, 1)
          this.completedTasks.push(completedTask)
        }
      } catch (error) {
        console.error('Failed to complete task:', error)
      }
    }
  }
})
