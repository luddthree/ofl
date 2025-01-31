<template>
    <div class="container mx-auto p-6 border rounded m-10 bg-gray-100">
        <h1 class="text-2xl font-bold mb-4">Profile</h1>

        <!-- User Info -->
        <div class="mb-6 p-4  ">
            <p class="text-lg font-semibold">Hello, {{ authStore.user?.name }}!</p>
            <p>Email: {{ authStore.user?.email }}</p>
            <p>Role: {{ authStore.user?.role }}</p>
        </div>

        <!-- Update Profile -->
        <div class="mb-6 p-4  ">
            <h2 class="text-lg font-semibold mb-2">Update Profile</h2>
            <input v-model="updatedName" placeholder="New Name" class="border p-2 w-full mb-2" />
            <input v-model="updatedEmail" placeholder="New Email" class="border p-2 w-full mb-2" />
            <button @click="updateProfile" class="bg-blue-500 text-white p-2 rounded">Update</button>
        </div>

        <!-- Update Password -->
        <div class="p-4  ">
            <h2 class="text-lg font-semibold mb-2">Change Password</h2>
            <input v-model="currentPassword" type="password" placeholder="Current Password" class="border p-2 w-full mb-2" />
            <input v-model="newPassword" type="password" placeholder="New Password" class="border p-2 w-full mb-2" />
            <input v-model="confirmNewPassword" type="password" placeholder="Confirm New Password" class="border p-2 w-full mb-2" />
            <button @click="updatePassword" class="bg-green-500 text-white p-2 rounded">Change Password</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const updatedName = ref(authStore.user?.name || '')
const updatedEmail = ref(authStore.user?.email || '')
const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const updateProfile = async () => {
    await authStore.updateProfile(updatedName.value, updatedEmail.value)
}

const updatePassword = async () => {
    if (newPassword.value !== confirmNewPassword.value) {
        alert("Passwords do not match!")
        return
    }
    await authStore.updatePassword(currentPassword.value, newPassword.value, confirmNewPassword.value)
}

onMounted(() => {
    authStore.fetchUser()
})
</script>
