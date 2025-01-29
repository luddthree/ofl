// middleware/auth.js
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // If no token is found, redirect to the login page
  if (!authStore.token) {
    console.log("no token fopund")
    return navigateTo('/login')
    
  }
})