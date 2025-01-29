// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null, // Initialize as null
    user: null,
  }),
  actions: {
    setToken(token) {
      console.log('Setting token:', token) // Debug log
      this.token = token
      if (process.client) {
        localStorage.setItem('auth_token', token)
      }
    },
    clearToken() {
      console.log('Clearing token') // Debug log
      this.token = null
      if (process.client) {
        localStorage.removeItem('auth_token')
      }
    },
    async fetchUser() {
        if (this.token) {
          try {
            const response = await $fetch('http://localhost:8000/api/user', {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            })
            this.user = response.user
            console.log('Fetched user:', this.user) // Log user details
          } catch (error) {
            console.error('Failed to fetch user:', error)
            this.clearToken()
            throw error
          }
        } else {
          console.error('No token found. User is not authenticated.')
          throw new Error('No token found')
        }
      }  
      ,      
    // Add a method to initialize the store
    initialize() {
      console.log('Initializing auth store') // Debug log
      if (process.client) {
        this.token = localStorage.getItem('auth_token')
        console.log('Token found in localStorage:', this.token) // Debug log
        if (this.token) {
          this.fetchUser()
        }
      } else {
        console.log('Running on server. Skipping token check.') // Debug log
      }
    },
  },
})