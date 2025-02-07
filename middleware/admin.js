import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()

  if (process.client) {
    console.log('Running middleware on the client')

    // Check if the user is authenticated (has token)
    if (!authStore.token) {
      const storedToken = localStorage.getItem('auth_token')
      console.log('Stored token:', storedToken)

      if (storedToken) {
        authStore.token = storedToken
        try {
          await authStore.fetchUser()
        } catch (error) {
          console.error('Failed to fetch user, redirecting to login')
          authStore.clearToken()
          return navigateTo('/login') // Redirect if token is invalid or fetching user fails
        }
      }
    }


    // If user is authenticated but not an admin, redirect to dashboard
    setTimeout(() => {
        if (!authStore.isAdmin()) {
            console.error('User is not an admin, redirecting to dashboard')
            return navigateTo('/dashboard') 
          }    }, 1000)

  }
})
