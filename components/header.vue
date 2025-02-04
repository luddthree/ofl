<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="flex items-center justify-between">
      <div class="text-lg font-semibold">OFL</div>
      <div class="relative">
        <button @click="toggleDropdown" class="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 focus:outline-none">
          {{ authStore.user?.name || 'Menu' }}
        </button>
        <div v-if="isDropdownOpen" class="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48">
          <ul>
            <!-- Show Login/Register if not authenticated -->
            <li v-if="!authStore.token">
              <a href="/login" class="block px-4 py-2 hover:bg-gray-100">Log in</a>
            </li>
            <li v-if="!authStore.token">
              <a href="/register" class="block px-4 py-2 hover:bg-gray-100">Register</a>
            </li>

            <!-- Show Dashboard, Profile, Admin, Logout if authenticated -->
            <li v-if="authStore.token">
              <a href="/dashboard" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
            </li>
            <li v-if="authStore.token">
              <a href="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
            </li>
            <li v-if="authStore.token && authStore.isAdmin()">
              <a href="/admin" class="block px-4 py-2 hover:bg-gray-100">Admin</a>
            </li>
            <li v-if="authStore.token">
              <a @click="logout" href="/login" class="block px-4 py-2 hover:bg-gray-100">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const isDropdownOpen = ref(false)
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.token) {
    authStore.fetchUser()
  }
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

function logout() {
  authStore.clearToken()
  navigateTo('/login')
}
</script>
