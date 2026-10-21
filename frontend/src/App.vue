<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner"
import { defineAsyncComponent } from "vue"
import { RouterView } from "vue-router"
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"
import { useHideHeader } from "./hooks/useHideHeader"

const showDevtools = import.meta.env.DEV
const VueQueryDevtools = showDevtools
  ? defineAsyncComponent(() =>
      import("@tanstack/vue-query-devtools").then(({ VueQueryDevtools }) => VueQueryDevtools),
    )
  : null

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
  <VueQueryDevtools v-if="showDevtools" />
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

@media (prefers-reduced-motion: reduce) {
  .header-enter-active,
  .header-leave-active,
  .page-enter-active {
    transition: none;
  }
}
</style>
