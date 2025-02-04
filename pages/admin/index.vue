<template>
  <div class="container mx-auto p-6 m-10 border rounded bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Administrator Dashboard</h1>

    <dashboardInfo />
    <createTask />
    <!-- <taskList /> -->
    <!-- <completedTask /> -->
    <createdTask />

  </div>
</template>

<script setup>
import dashboardInfo from '~/components/dashboardInfo.vue'
import createTask from '~/components/createTask.vue'
// import taskList from '~/components/taskList.vue'
// import completedTask from '~/components/completedTask.vue'
import createdTask from '~/components/createdTask.vue'

definePageMeta({
  middleware: 'admin',  // Apply the admin middleware here
})

</script>

<style scoped>
</style>
