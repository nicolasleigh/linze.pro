<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { RouterLink } from "vue-router"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { createReusableTemplate, useMediaQuery } from "@vueuse/core"
import { ListTreeIcon } from "lucide-vue-next"
import { ref } from "vue"

interface SectionItem {
  slug: string
  title: string
}

defineProps<{
  activeSection: string
  section: SectionItem[]
}>()
const activeStyle = "text-neutral-50"

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
const isDesktop = useMediaQuery("(min-width: 1024px)")

const isOpen = ref(false)
</script>

<template>
  <aside class="py-4" v-if="isDesktop">
    <div class="sticky top-36">
      <div class="overflow-auto border border-neutral-900 px-6 rounded-xl py-5 hidden lg:block">
        <ReuseTemplate />
      </div>
    </div>
  </aside>

  <Drawer v-else v-model:open="isOpen">
    <DrawerTrigger as-child>
      <Button
        variant="outline"
        class="group rounded-xl text-neutral-200 border-transparent bg-neutral-800/50 focus:bg-neutral-800/50 backdrop-blur-md fixed z-10 bottom-5 right-5 py-3 px-3"
      >
        <ListTreeIcon />
        <span class="text-xs"> Table of Contents </span>
      </Button>
    </DrawerTrigger>
    <DrawerContent class="bg-neutral-900/80 backdrop-blur-sm border-none text-neutral-500 pb-10">
      <DrawerHeader>
        <DrawerTitle class="text-sm">Table of Contents</DrawerTitle>
      </DrawerHeader>
      <div class="overflow-auto px-6 rounded-xl">
        <ReuseTemplate />
      </div>
    </DrawerContent>
  </Drawer>

  <DefineTemplate>
    <div class="flex flex-col space-y-2 text-sm">
      <RouterLink
        v-for="(item, index) in section"
        :key="index"
        :to="'#' + item.slug"
        :class="
          activeSection === item.slug ? activeStyle : 'text-neutral-500 hover:text-neutral-400'
        "
      >
        {{ item.title }}
      </RouterLink>
    </div>
  </DefineTemplate>
</template>
