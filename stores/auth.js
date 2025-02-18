import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    // Setter for auth token
    setToken(token) {
      console.log('Setting token:', token)
      this.token = token
      if (process.client) {
        localStorage.setItem('auth_token', token)
      }
    },
    
    // Clears the auth token
    clearToken() {
      console.log('Clearing token')
      this.token = null
      if (process.client) {
        localStorage.removeItem('auth_token')
      }
    },
    
    // Update profile
    async updateProfile(name, email) {
      try {
        const response = await $fetch('/api/user/profile', {
          method: 'PUT',
          headers: { Authorization: `Bearer ${this.token}` },
          body: { name, email },
        })
        this.user = response.user
        alert('Profile updated successfully!')
      } catch (error) {
        console.error('Failed to update profile:', error)
      }
    },

    // Update password
    async updatePassword(currentPassword, newPassword, confirmNewPassword) {
      try {
        await $fetch('/api/user/password', {
          method: 'PUT',
          headers: { Authorization: `Bearer ${this.token}` },
          body: { current_password: currentPassword, new_password: newPassword, new_password_confirmation: confirmNewPassword },
        })
        alert('Password updated successfully!')
      } catch (error) {
        console.error('Failed to update password:', error)
      }
    },

    // Fetch the current user details
    async fetchUser() {
      if (this.token) {
        try {
          const response = await $fetch('/api/user', {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          this.user = response.user
          console.log('Fetched user:', this.user)
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
    },

    // Initialize auth store and manage the token from localStorage
    initialize() {
      console.log('Initializing auth store')

      if (process.client) {
        const storedToken = localStorage.getItem('auth_token')
        console.log('Token found in localStorage:', storedToken)

        if (storedToken) {
          this.token = storedToken
          this.fetchUser().catch(() => {
            console.error('Invalid token. Clearing auth state.')
            this.clearToken()
            navigateTo('/login') // Redirect to login page if the token is invalid
          })
          return
        }

        // Redirect to login if no token and trying to access protected routes
        const publicRoutes = ['/', '/register', '/login']
        const currentRoute = window.location.pathname

        if (!publicRoutes.includes(currentRoute)) {
          console.log('No token found. Redirecting to login...')
          navigateTo('/login')
        }
      }
    },

    // Check if the user has 'admin' role
    isAdmin() {
      console.log('admin func role ' + this.user?.role)
      return this.user?.role === 'admin'
    },
  },
})
