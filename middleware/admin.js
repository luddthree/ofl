import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()

  // Only run this check on the client (browser)
  if (process.client) {
    console.log('Running middleware on the client')

    // Check if the user is authenticated (has token)
    if (!authStore.token) {
      const storedToken = localStorage.getItem('auth_token')
      console.log('Stored token:', storedToken)

      if (storedToken) {
        authStore.token = storedToken
        try {
          // Fetch the user data before continuing with the role check
          await authStore.fetchUser()
        } catch (error) {
          console.error('Failed to fetch user, redirecting to login')
          authStore.clearToken()
          return navigateTo('/login') // Redirect if token is invalid or fetching user fails
        }
      }
    }

    // Now check if user data is loaded and if the user is an admin
    // if (!authStore.user) {
    //   console.error('User data not loaded, redirecting to login')
    //   return navigateTo('/login') // If user data is not loaded, redirect to login
    // }

    // If user is authenticated but not an admin, redirect to dashboard
    setTimeout(() => {
        if (!authStore.isAdmin()) {
            console.error('User is not an admin, redirecting to dashboard')
            return navigateTo('/dashboard') // Redirect to dashboard if not an admin
          }    }, 1000)

  }
})
