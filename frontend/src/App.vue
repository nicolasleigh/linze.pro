<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner"
import { VueQueryDevtools } from "@tanstack/vue-query-devtools"
import { RouterView, useRoute } from "vue-router"
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"
import { useHideHeader } from "./hooks/useHideHeader"

const { isHidden } = useHideHeader(300)
</script>

<template>
  <Toaster position="top-center" richColors />
  <Transition name="header">
    <Header v-if="!isHidden" />
  </Transition>

  <div>
    <main class="w-full pb-24">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
  <Footer />
  <VueQueryDevtools />
</template>

<style scoped>
.header-enter-active,
.header-leave-active {
  transition: opacity 0.7s ease;
}
.header-enter-from,
.header-leave-to {
  opacity: 0;
}

.page-enter-active {
  transition: opacity 1.5s ease;
}
.page-enter-from {
  opacity: 0;
}
</style>
