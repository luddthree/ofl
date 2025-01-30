<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <dashboardInfo />
    <!-- <createTask /> -->
    <taskList />
    <completedTask />

  </div>
</template>

<script setup>
import dashboardInfo from '~/components/dashboardInfo.vue'
// import createTask from '~/components/createTask.vue'
import taskList from '~/components/taskList.vue'
import completedTask from '~/components/completedTask.vue'

</script>

<style scoped>
</style>
