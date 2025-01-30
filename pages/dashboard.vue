<template>
  <div class="container mx-auto m-10 p-6 border rounded bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <dashboardInfo />
    <!-- <createTask /> -->
    <taskList />
    <!-- <createdTask /> -->
    <completedTask />

  </div>
</template>

<script setup>
import dashboardInfo from '~/components/dashboardInfo.vue'
// import createTask from '~/components/createTask.vue'
import taskList from '~/components/taskList.vue'
import completedTask from '~/components/completedTask.vue'
// import createdTask from '~/components/createdTask.vue'


</script>

<style scoped>
</style>
