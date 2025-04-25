<script setup lang="ts">
import IconGithub from "@/components/icons/IconGithub.vue"
import IconLink from "@/components/icons/IconLink.vue"
import { Eye, Heart, Play, User } from "lucide-vue-next"

defineProps({
  title: String,
  about: String,
  view: Number,
  like: Number,
  video: String,
  website: String,
  repo: String,
})
</script>

<template>
  <header class="">
    <h1 class="text-neutral-100 text-5xl font-semibold mt-6 leading-tight">{{ title }}</h1>
    <p class="text-neutral-400 text-base mt-2">
      {{ about }}
    </p>
    <div
      class="mt-9 py-0 border-y text-neutral-300 text-xs border-neutral-800 flex items-center gap-5 flex-wrap"
    >
      <p class="flex items-center gap-2 pointer-events-none">
        <User :size="15" class="text-neutral-600" />
        <span>Personal Project</span>
      </p>
      <p class="flex items-center gap-2 pointer-events-none">
        <Eye :size="15" class="text-neutral-600" />
        <span> {{ view }} views</span>
      </p>
      <a class="mr-auto" data-state="closed" href="/projects/en/cabinfy#like-button">
        <p class="flex items-center gap-2">
          <Heart :size="15" :class="'text-neutral-600'" />
          <span>{{ like }} likes</span>
        </p>
      </a>
      <a
        class="hover:underline hover:text-accent text-neutral-500 transition-colors flex items-center gap-1.5"
        :href="video"
      >
        <Play :size="15" />
        <span class="text-neutral-300"> Demo Video </span>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        :href="website"
        class="hover:underline hover:text-accent h-12 text-neutral-500 transition-colors flex items-center gap-1.5 cursor-newtab"
      >
        <IconLink />
        <span class="text-neutral-300">Open Website</span>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        :href="repo"
        class="hover:underline hover:text-accent h-12 text-neutral-500 transition-colors flex items-center gap-1.5 cursor-newtab"
      >
        <IconGithub />
        <span class="text-neutral-300">Repository</span>
      </a>
    </div>
  </header>
</template>
