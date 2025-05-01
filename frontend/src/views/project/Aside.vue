<script setup lang="ts">
import { RouterLink } from "vue-router"

interface SectionItem {
  slug: string
  title: string
}

defineProps<{
  activeSection: string
  section: SectionItem[]
}>()
const activeStyle = "text-neutral-50"
</script>

<template>
  <aside class="py-4">
    <div class="sticky top-36">
      <div class="overflow-auto border border-neutral-900 px-6 rounded-xl py-5 hidden lg:block">
        <div class="flex flex-col space-y-2 text-sm">
          <RouterLink
            v-for="(item, index) in section"
            :key="index"
            :to="'#' + item.slug"
            :class="
              activeSection === item.slug ? activeStyle : 'text-neutral-500 hover:text-accent'
            "
          >
            {{ item.title }}
          </RouterLink>
        </div>
      </div>
    </div>
  </aside>
</template>
