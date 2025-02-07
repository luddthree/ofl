<script setup>
definePageMeta({
  layout: 'default'
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <div class="container mx-auto py-12 px-6 text-center">
      <h1 class="text-4xl font-bold text-blue-600 mb-4">OFL</h1>
      <p class="text-lg text-gray-700 mb-6">An efficient way to assign and complete tasks.</p>
      
      <div class="grid md:grid-cols-2 gap-8 text-left">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Admin Users</h2>
          <p class="text-gray-600">Admins can assign tasks based on the users email. Each task has a due date.</p>
          <img src="/admin.png" alt="Admin Dashboard" class="mt-4 rounded-lg shadow">
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Regular Users</h2>
          <p class="text-gray-600">Users receive tasks assigned to them and must complete them before the deadline.</p>
          <img src="/user.png" alt="User Task List" class="mt-4 rounded-lg shadow">
        </div>
      </div>
      
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-800">Get Started Now</h2>
        <p class="text-gray-600 mb-4">Sign up as an admin or user and start managing tasks today.</p>
        <div class="space-x-4">
          <NuxtLink to="/register" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">Sign Up</NuxtLink>
          <NuxtLink to="/login" class="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700">Login</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>