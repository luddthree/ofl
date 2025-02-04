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
    async updateProfile(name, email) {
      try {
        const response = await $fetch('http://localhost:8000/api/user/profile', {
          method: 'PUT',
          headers: { Authorization: `Bearer ${this.token}` },
          body: { name, email }
        })
        this.user = response.user
        alert('Profile updated successfully!')
      } catch (error) {
        console.error('Failed to update profile:', error)
      }
    },
    async updatePassword(currentPassword, newPassword, confirmNewPassword) {
      try {
        await $fetch('http://localhost:8000/api/user/password', {
          method: 'PUT',
          headers: { Authorization: `Bearer ${this.token}` },
          body: { current_password: currentPassword, new_password: newPassword, new_password_confirmation: confirmNewPassword }
        })
        alert('Password updated successfully!')
      } catch (error) {
        console.error('Failed to update password:', error)
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
          console.log('role ' + this.user?.role)

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
        const storedToken = localStorage.getItem('auth_token')
        console.log('Token found in localStorage:', storedToken) // Debug log
    
        // Skip the check if the current route is public
        const publicRoutes = ['/', '/register', '/login']
        const currentRoute = window.location.pathname
    
        if (publicRoutes.includes(currentRoute)) {
          console.log('Public route accessed:', currentRoute)
          return // Allow access to public routes
        }
    
        if (storedToken) {
          this.token = storedToken
          return this.fetchUser().catch(() => {
            console.error('Invalid token. Clearing auth state.')
            this.clearToken()
            navigateTo('/login') // Redirect only if token is invalid
          })
        } else {
          console.log('No token found. Redirecting to login...')
          navigateTo('/login') // Redirect to login if no token is found
        }
      }
      
    },

    isAdmin() {
      console.log('admi func role ' + this.user?.role)
      return this.user?.role === 'admin' // Adjust based on your user data structure
    },
    
    
  },
})