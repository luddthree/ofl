import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [], 
    completedTasks: [], 
    createdTasks: [] 
  }),
  actions: {
    // henter oppgaver
    async fetchTasks() {
      try {
        const authStore = useAuthStore()
        const response = await $fetch('https://ofl.vang.li/api/tasks', {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        this.tasks = response.assigned_tasks.filter(task => !task.completed)
        this.completedTasks = response.assigned_tasks.filter(task => task.completed)
        this.createdTasks = response.created_tasks 
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    },
// sletter oppgave
    async deleteTask(taskId) {
      try {
        const authStore = useAuthStore();
        await $fetch(`https://ofl.vang.li/api/tasks/${taskId}`, {
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
// oppretter oppgave
    async createTask(title, description, assignedTo, deadline) {
      try {
          const authStore = useAuthStore()
          const newTask = await $fetch('https://ofl.vang.li/api/tasks', {
              method: 'POST',
              headers: { Authorization: `Bearer ${authStore.token}` },
              body: { title, description, assigned_to: assignedTo, deadline }
          })
          this.tasks.push(newTask.task) 
      } catch (error) {
          console.error('Failed to create task:', error)
      }
  },
// sender epost
    async sendEmail() {
      try {
          const authStore = useAuthStore()
          const email = await $fetch('https://ofl.vang.li/api/tasks/emsend', {
              method: 'POST',
              headers: { Authorization: `Bearer ${authStore.token}` },
          })
          this.tasks.push(email.task) 
      } catch (error) {
          console.error('Failed to create task:', error)
      }
  },

  // oppdaterer oppgave
  async updateTask(taskId, title, description, assignedTo, deadline) {
    try {
        const authStore = useAuthStore()
        const updatedTask = await $fetch(`https://ofl.vang.li/api/tasks/${taskId}`, {
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
// fullfør oppgave
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
          this.tasks.splice(taskIndex, 1) 
          this.completedTasks.push(completedTask) 
        }
      } catch (error) {
        console.error('Failed to complete task:', error)
      }
    }
  }
})
