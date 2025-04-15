<script setup lang="ts">
import { RouterLink } from "vue-router"

const activeStyle = "text-blue-500"
</script>

<template>
  <header class="mb-10">
    <nav class="flex gap-4 mx-auto">
      <RouterLink to="/login" :active-class="activeStyle"> Login </RouterLink>
      <RouterLink to="/signup" :active-class="activeStyle"> Signup </RouterLink>
      <RouterLink to="/editor" :active-class="activeStyle"> Editor </RouterLink>
      <RouterLink to="/post/10" :active-class="activeStyle"> Preview </RouterLink>
      <RouterLink to="/posts" :active-class="activeStyle"> Posts </RouterLink>
    </nav>
  </header>
</template>
