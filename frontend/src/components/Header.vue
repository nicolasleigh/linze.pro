<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router"

const activeStyle = "!text-accent"
const linkStyle = "py-3 px-2 font-rethink text-neutral-200 hover:text-neutral-50 transition-colors"
</script>

<template>
  <header
    class="pointer-events-none fixed top-0 inset-x-0 z-50 transition-opacity duration-300 opacity-100 hover:!opacity-100 text-white"
  >
    <nav
      class="hidden min-[570px]:flex pointer-events-auto mt-8 px-3 rounded-lg bg-neutral-800/60 w-fit mx-auto text-sm md:text-base"
    >
      <ul class="flex items-center gap-4">
        <RouterLink to="/login" :class="linkStyle" :active-class="activeStyle"> Login </RouterLink>
        <RouterLink to="/signup" :class="linkStyle" :active-class="activeStyle">
          Signup
        </RouterLink>
        <RouterLink to="/editor" :class="linkStyle" :active-class="activeStyle">
          Editor
        </RouterLink>
        <RouterLink to="/post/10" :class="linkStyle" :active-class="activeStyle">
          Preview
        </RouterLink>
        <RouterLink to="/posts" :class="linkStyle" :active-class="activeStyle"> Posts </RouterLink>
      </ul>
    </nav>
  </header>
</template>
