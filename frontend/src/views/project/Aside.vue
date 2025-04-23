<script setup lang="ts">
interface SectionItem {
  slug: string
  title: string
}

defineProps<{
  activeSection: string
  section: SectionItem[]
}>()
const activeStyle = "text-neutral-200"
</script>

<template>
  <aside class="py-4">
    <div class="sticky top-36">
      <div class="overflow-auto border border-neutral-900 px-6 rounded-xl py-5 hidden lg:block">
        <div class="flex flex-col space-y-2 text-sm text-neutral-600">
          <a
            v-for="(item, index) in section"
            :key="index"
            :href="'#' + item.slug"
            :class="activeSection === item.slug ? activeStyle : ''"
            >{{ item.title }}
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>
