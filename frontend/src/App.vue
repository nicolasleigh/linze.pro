<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import HelloWorld from "./components/HelloWorld.vue"
import { Toaster } from "@/components/ui/sonner"
import { VueQueryDevtools } from "@tanstack/vue-query-devtools"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
</script>

<template>
  <Toaster position="top-center" richColors />
  <Header />

  <div>
    <div class="absolute overflow-hidden inset-0 h-[450px] bg-black"></div>
    <main class="w-full pb-24">
      <RouterView />
    </main>
  </div>
  <Footer />
  <VueQueryDevtools />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  /* color: var(--color-text); */
  color: blue;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
