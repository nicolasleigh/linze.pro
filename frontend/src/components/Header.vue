<script setup lang="ts">
import { RouterLink } from "vue-router"
import LanguageButton from "./LanguageButton.vue"
import { useTranslation } from "i18next-vue"
import { ChevronDown, MessagesSquare } from "lucide-vue-next"
import Button from "./ui/button/Button.vue"
import HeaderDropdownMenu from "./HeaderDropdownMenu.vue"

const linkStyle = "py-3 px-2 hover:text-accent transition-colors font-medium"
const { t } = useTranslation()
</script>

<template>
  <header
    class="pointer-events-none fixed top-0 inset-x-0 z-50 transition-opacity duration-300 opacity-100 hover:!opacity-100"
  >
    <nav
      class="flex min-[570px]:hidden mt-8 w-full text-sm md:text-base flex-col pointer-events-none px-4"
    >
      <div class="ml-auto bg-neutral-800/70 backdrop-blur-sm rounded-lg pointer-events-auto">
        <HeaderDropdownMenu />
      </div>
    </nav>
    <nav
      class="hidden min-[570px]:flex pointer-events-auto mt-8 px-3 rounded-lg bg-neutral-800/60 w-fit mx-auto text-sm md:text-base"
    >
      <ul class="flex items-center gap-4 text-neutral-200">
        <RouterLink to="/" :class="linkStyle"> {{ t("header.home_link") }} </RouterLink>
        <RouterLink to="/projects" :class="linkStyle"> {{ t("header.projects_link") }} </RouterLink>
        <RouterLink to="/posts" :class="linkStyle"> {{ t("header.posts_link") }} </RouterLink>
        <RouterLink to="/about" :class="linkStyle"> {{ t("header.about_link") }} </RouterLink>
        <div class="w-px bg-neutral-500 h-[18px]" />
        <LanguageButton />
        <RouterLink to="/comments" :class="linkStyle">
          <MessagesSquare class="mt-0.5 size-4 transition" />
        </RouterLink>
      </ul>
    </nav>
  </header>
</template>
