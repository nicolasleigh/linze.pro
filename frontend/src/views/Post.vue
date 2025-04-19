<script setup lang="ts">
import MdPreview from "@/components/MdPreview.vue"
import PostTag from "@/components/PostTag.vue"
import { BookOpen, ChevronRight, Eye, Heart } from "lucide-vue-next"
import { useRoute } from "vue-router"

const route = useRoute()
</script>

<template>
  <section class="relative">
    <div>
      <figure
        class="overflow-hidden absolute left-0 top-0 z-[-1] h-[16rem] w-full pointer-events-none"
      >
        <div class="relative pt-[40%] lg:translate-y-[-20%]">
          <div class="absolute inset-0 top-1/2">
            <img
              class="w-full -translate-y-1/2"
              src="https://images.theodorusclarence.com/upload/q_auto,f_auto/theodorusclarence/banner/david-wright-F-Bq5wB5RY0-unsplash"
            />
          </div>
        </div>
      </figure>
      <div
        class="absolute left-0 top-0 h-[16rem] w-full bg-gradient-to-b from-neutral-950/60 to-neutral-950 z-[-1]"
      />
    </div>
    <div class="layout pb-12 pt-32 md:pb-20 md:pt-64">
      <div class="pb-4">
        <div class="flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-100">
          <PostTag>React</PostTag>
        </div>
        <h1
          class="txt-primary mt-6 leading-tight text-neutral-100 text-5xl font-semibold selection:bg-accent-dark"
        >
          List Animation using Motion for React
        </h1>
        <p class="mt-1 text-neutral-400 selection:bg-accent-dark">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, aliquid ullam.
          Laboriosam, minus?
        </p>
        <div class="mt-12 flex gap-3 items-center">
          <div class="size-10 rounded-full overflow-hidden">
            <figure
              class="isolate z-[1] overflow-hidden select-none pointer-events-none object-cover"
            >
              <img src="https://avatars.githubusercontent.com/u/113521135?v=4" />
            </figure>
          </div>
          <div>
            <p class="text-neutral-100">Nicolas Leigh</p>
            <p class="mt-0.5 text-neutral-400 text-xs">December 17, 2024</p>
          </div>
        </div>
        <div
          class="mt-12 py-4 border-y text-white border-neutral-800 flex items-center gap-5 flex-wrap"
        >
          <p class="text-neutral-400 text-xs flex items-center gap-2">
            <Eye :size="15" class="text-neutral-600" />
            <span>3,066 views</span>
          </p>
          <p class="text-neutral-400 text-xs flex items-center gap-2 ml-auto">
            <BookOpen :size="15" class="text-neutral-600" />
            <span>6 min read</span>
          </p>
          <a data-state="closed">
            <p class="text-neutral-400 text-xs flex items-center gap-2">
              <Heart :size="15" class="text-neutral-600" />
              <span>128 likes</span>
            </p>
          </a>
        </div>
      </div>
      <section>
        <MdPreview />
      </section>
      <div class="flex items-center justify-center pt-52 text-red-500">
        <button>
          <Heart :size="60" :stroke-width="1" />
        </button>
      </div>
      <RouterLink
        :to="{ name: 'edit-post', params: route.params }"
        class="relative group px-4 py-3 mt-12 rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300"
      >
        <span class="font-semibold"> Edit This Post </span>
        <ChevronRight :stroke-width="2" :size="20" />
      </RouterLink>
    </div>
  </section>
</template>
