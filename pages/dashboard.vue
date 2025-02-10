<template>
  <div class="container mx-auto m-10 p-6 border rounded bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <dashboardInfo />
    <!-- <createTask /> -->
    <taskList />
    <!-- <createdTask /> -->

    <unfinishedTask />

    <completedTask />


  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
import dashboardInfo from '~/components/dashboardInfo.vue'
// import createTask from '~/components/createTask.vue'
import taskList from '~/components/taskList.vue'
import completedTask from '~/components/completedTask.vue'
import unfinishedTask from '~/components/unfinishedTask.vue'

// import createdTask from '~/components/createdTask.vue'


</script>

<style scoped>
</style>
