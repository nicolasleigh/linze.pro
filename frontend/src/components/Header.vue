<script setup lang="ts">
import { RouterLink } from "vue-router"
import LanguageButton from "./LanguageButton.vue"
import { useTranslation } from "i18next-vue"

const linkStyle = "py-3 px-2 hover:text-accent transition-colors font-medium"
const { t } = useTranslation()
</script>

<template>
  <header
    class="pointer-events-none fixed top-0 inset-x-0 z-50 transition-opacity duration-300 opacity-100 hover:!opacity-100"
  >
    <nav
      class="flex pointer-events-auto mt-8 px-3 rounded-lg bg-neutral-800/60 w-fit mx-auto text-sm md:text-base"
    >
      <ul class="flex items-center gap-4 text-neutral-200">
        <RouterLink to="/" :class="linkStyle"> {{ t("header.home_link") }} </RouterLink>
        <RouterLink to="/posts" :class="linkStyle"> {{ t("header.posts_link") }} </RouterLink>
        <RouterLink to="/projects" :class="linkStyle"> {{ t("header.projects_link") }} </RouterLink>
        <RouterLink to="/about" :class="linkStyle"> {{ t("header.about_link") }} </RouterLink>
        <div class="w-px bg-neutral-500 h-[18px]" />
        <LanguageButton />
      </ul>
    </nav>
  </header>
</template>
