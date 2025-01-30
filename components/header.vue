<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="flex items-center justify-between">
      <div class="text-lg font-semibold">OFL</div>
      <div class="relative">
        <button @click="toggleDropdown" class="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 focus:outline-none">
          {{ authStore.user?.name }}
        </button>
        <div v-if="isDropdownOpen" class="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48">
          <ul>
            <li>
              <a href="/login" class="block px-4 py-2 hover:bg-gray-100">Log in</a>
            </li>
            <li>
              <a href="/register" class="block px-4 py-2 hover:bg-gray-100">Register</a>
            </li>
            <li>
              <a href="/dashboard" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
            </li>
            <li>
              <a href="/admin" class="block px-4 py-2 hover:bg-gray-100">Admin</a>
            </li>
            <li>
              <a href="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
            </li>
            <li>
              <a @click="logout" href="/" class="block px-4 py-2 hover:bg-gray-100">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const isDropdownOpen = ref(false)
const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})


const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

function logout() {
  authStore.clearToken()
  //   navigateTo('/login')

}
</script>

<style scoped>
/* Optional: Add any custom styling */
</style>