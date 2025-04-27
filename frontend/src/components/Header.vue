<script setup lang="ts">
import { RouterLink } from "vue-router"
import LanguageButton from "./LanguageButton.vue"

const linkStyle = "py-3 px-2 text-neutral-200 hover:text-neutral-50 transition-colors"
</script>

<template>
  <header
    class="pointer-events-none fixed top-0 inset-x-0 z-50 transition-opacity duration-300 opacity-100 hover:!opacity-100"
  >
    <nav
      class="flex pointer-events-auto mt-8 px-3 rounded-lg bg-neutral-800/60 w-fit mx-auto text-sm md:text-base"
    >
      <ul class="flex items-center gap-4">
        <RouterLink to="/" :class="linkStyle"> Home </RouterLink>
        <RouterLink to="/login" :class="linkStyle"> Login </RouterLink>
        <RouterLink to="/signup" :class="linkStyle"> Signup </RouterLink>
        <RouterLink to="/editor" :class="linkStyle"> Editor </RouterLink>
        <RouterLink to="/posts" :class="linkStyle"> Posts </RouterLink>
        <RouterLink to="/projects" :class="linkStyle"> Projects </RouterLink>
        <RouterLink to="/about" :class="linkStyle"> About </RouterLink>
        <div class="w-px bg-neutral-500 h-[18px]" />
        <LanguageButton />
      </ul>
    </nav>
  </header>
</template>
