

<script setup>
definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Admin Panel</h1>
    <p>Welcome to the admin page. Only users with the admin role can access this page.</p>
  </div>
</template>
