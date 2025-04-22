<script setup lang="ts">
import IconGithub from "@/components/icons/IconGithub.vue"
import IconLink from "@/components/icons/IconLink.vue"
import { ChevronRight } from "lucide-vue-next"
import { RouterLink } from "vue-router"

const props = defineProps({
  title: String,
  about: String,
  image: String,
  repo: String,
  website: String,
  reverse: Boolean,
  link: String,
})
</script>

<template>
  <li class="lg:flex gap-8" :class="reverse ? 'flex-row-reverse' : 'flex-row'">
    <div class="shrink-0 relative aspect-video lg:aspect-square lg:h-full">
      <figure
        class="overflow-hidden relative isolate z-[1] hidden lg:block lg:aspect-square pointer-events-none h-full border border-neutral-900 rounded-xl"
      >
        <img class="absolute top-0 left-0" :src="props.image" />
      </figure>
    </div>
    <div
      class="grow p-6 lg:p-8 border-neutral-900 border border-dashed rounded-xl rounded-t-none lg:rounded-t-xl"
    >
      <h3 class="text-4xl text-neutral-300 font-semibold">{{ props.title }}</h3>
      <p class="mt-6 text-neutral-400">
        {{ props.about }}
      </p>
      <div class="flex items-center gap-2 mt-6 text-neutral-400">
        <p class="text-sm">Tools:</p>
        <ul class="flex items-center gap-2 text-xl text-gray-200">
          <slot></slot>
        </ul>
      </div>
      <div class="w-full flex flex-wrap justify-between gap-4 items-center mt-10">
        <RouterLink
          :to="props.link || ''"
          class="relative group px-4 py-3 rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300"
        >
          <span class="font-semibold"> View Project </span>
          <ChevronRight :stroke-width="2" :size="20" />
        </RouterLink>
        <div class="flex items-center gap-6">
          <a
            :href="props.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-400 h-10 flex gap-2 items-center hover:text-accent text-xs hover:underline decoration-white underline-offset-4 cursor-newtab"
          >
            <div class="">
              <IconGithub />
            </div>
            <span class="text-neutral-200">Repository</span>
          </a>
          <a
            v-if="props.website"
            :href="props.website"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-400 h-10 flex gap-2 items-center hover:text-accent text-xs hover:underline decoration-white underline-offset-4 cursor-newtab"
          >
            <div class="">
              <IconLink />
            </div>
            <span class="text-neutral-200">Open Website</span>
          </a>
        </div>
      </div>
    </div>
  </li>
</template>
