<script setup lang="ts">
import MdPreview from "@/components/MdPreview.vue"
import PostTag from "@/components/PostTag.vue"
import { usePost } from "@/hooks/usePost"
import { useGetPostLike, usePostLike, usePostView } from "@/hooks/usePostLikeAndView"
import { dateFormat } from "@/utils/helper"
import { BookOpen, Calendar, CalendarDays, ChevronRight, Eye, Heart } from "lucide-vue-next"
import { computed, ref, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const { post, isLoading } = usePost()
const { viewNum } = usePostView()
const { likeNum, updatePostLike } = usePostLike()
const { likeNum: initialLike } = useGetPostLike()
const isLiked = ref(localStorage.getItem(`like-post-${route.params.postId}`) === "true" || false)

const handleLike = () => {
  const likeState = localStorage.getItem(`like-post-${route.params.postId}`)
  if (likeState === "true") {
    isLiked.value = true
    return
  }
  localStorage.setItem(`like-post-${route.params.postId}`, "true")
  isLiked.value = true
  updatePostLike()
}
</script>

<template>
  <section class="relative">
    <div>
      <figure
        class="overflow-hidden absolute left-0 top-0 z-[-1] h-[16rem] w-full pointer-events-none"
      >
        <div class="relative pt-[40%] lg:translate-y-[-20%]">
          <div class="absolute inset-0 top-1/2">
            <img class="w-full -translate-y-1/2" :src="post?.photo" />
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
          <PostTag v-for="(item, index) in post?.tags" :key="index">{{ item }}</PostTag>
        </div>
        <h1
          class="txt-primary mt-6 leading-tight text-neutral-100 text-5xl font-semibold selection:bg-accent-dark"
        >
          {{ post?.title }}
        </h1>
        <p class="mt-1 text-neutral-400 selection:bg-accent-dark">
          {{ post?.about }}
        </p>
        <div class="mt-12 flex gap-3 items-center">
          <div class="size-10 rounded-full overflow-hidden">
            <figure
              class="isolate z-[1] overflow-hidden select-none pointer-events-none object-cover"
            >
              <img src="/avatar.webp" />
            </figure>
          </div>
          <div>
            <p class="text-neutral-100 capitalize">{{ post?.user.username }}</p>
            <p class="mt-0.5 text-neutral-400 text-xs">{{ post?.user.email }}</p>
          </div>
        </div>
        <div
          class="mt-12 py-4 border-y text-white border-neutral-800 flex items-center gap-5 flex-wrap"
        >
          <p class="text-neutral-400 text-xs flex items-center gap-2">
            <Calendar :size="15" class="text-neutral-600" />
            <span>{{ dateFormat(post?.created_at || "") }}</span>
          </p>
          <p
            class="text-neutral-400 text-xs flex items-center gap-2"
            :class="post?.created_at === post?.updated_at ? 'hidden' : ''"
          >
            <CalendarDays :size="15" class="text-neutral-600" />
            <span>{{ dateFormat(post?.updated_at || "") }}</span>
          </p>
          <p class="text-neutral-400 text-xs flex items-center gap-2 ml-auto">
            <Eye :size="15" class="text-neutral-600" />
            <span>{{ viewNum }} views</span>
          </p>
          <button
            class="text-neutral-400 text-xs flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            @click="handleLike"
            :disabled="isLiked"
          >
            <Heart :size="15" :class="isLiked ? 'text-red-600' : 'text-neutral-600'" />
            <span>{{ likeNum ? likeNum : initialLike }} likes</span>
          </button>
        </div>
      </div>
      <section>
        <MdPreview :post="post" :isLoading="isLoading" />
      </section>
      <div class="flex gap-10">
        <button
          @click="handleLike"
          class="relative group px-4 py-3 mt-12 rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
          :disabled="isLiked"
        >
          <span v-if="isLiked" class="font-semibold"> Liked </span>
          <span v-else class="font-semibold"> Like </span>
          <Heart :stroke-width="2" :size="20" :class="isLiked ? 'text-red-600' : ''" />
        </button>
        <RouterLink
          :to="{ name: 'edit-post', params: route.params }"
          class="relative group px-4 py-3 mt-12 rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300"
        >
          <span class="font-semibold"> Edit This Post </span>
          <ChevronRight :stroke-width="2" :size="20" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
