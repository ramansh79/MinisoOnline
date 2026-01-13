<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";


</script>

<template>

  <header class="w-full dark:bg-slate-950 bg-slate-700">
    
    <nav class="container mx-auto flex items-center justify-between p-4">
      <div class="flex space-x-4">
        <RouterLink class="text-slate-200 font-bold" to="/">Home</RouterLink>
        <RouterLink class="text-slate-200 font-bold" to="/dashboard">Dashboard</RouterLink>

      </div>

      
      <div class="flex space-x-4">
        <RouterLink class="text-slate-200 hover:text-white" to="/register">Register</RouterLink>
        <RouterLink class="text-slate-200 hover:text-white" to="/login">Login</RouterLink>
      </div>
    </nav>

    
  </header>
  <main class="container mx-auto p-4">
    <RouterView />
  </main>

</template>




<style scoped>

</style>
