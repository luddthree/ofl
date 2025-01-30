import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  const publicRoutes = ['/login', '/dashboard', '/register', '/admin']
  if (publicRoutes.includes(to.path)) {
    console.log('Public route accessed:', to.path)
    return
  }

  if (process.client && !authStore.token) {
    console.log('Initializing auth store on client...')
    authStore.initialize()
  }

  if (!authStore.token) {
    console.log('No token found. Redirecting to /login...')
    return navigateTo('/login')
  }

  if (!authStore.user) {
    console.log('Fetching user details...')
    try {
      await authStore.fetchUser()
      console.log('User details fetched:', authStore.user)
    } catch (error) {
      console.error('Error fetching user details:', error)
      return navigateTo('/login')
    }
  }

})
