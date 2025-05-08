<script setup lang="ts">
const MdPreview = defineAsyncComponent(() => import("@/components/MdPreview.vue"))
// import MdPreview from "@/components/MdPreview.vue"
import PostTag from "@/components/PostTag.vue"
import { usePost } from "@/hooks/usePost"
import { useGetPostLike, usePostLike, usePostView } from "@/hooks/useLikeAndView"
import { dateFormat } from "@/utils/helper"
import { BookOpen, Calendar, CalendarDays, ChevronRight, Eye, Heart } from "lucide-vue-next"
import { computed, defineAsyncComponent, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { useTranslation } from "i18next-vue"
import LikedButton from "@/components/LikedButton.vue"

const route = useRoute()
const { post, isLoading } = usePost()
const { viewNum } = usePostView()
const { likeNum, updatePostLike } = usePostLike()
const { likeNum: initialLike } = useGetPostLike()
const { t, i18next } = useTranslation()
const isLiked = ref(localStorage.getItem(`like-post-${route.params.slug}`) === "true" || false)

const currentLanguage = ref<string | null>(null)

watch(
  () => i18next.language,
  (newLang) => {
    currentLanguage.value = newLang
  },
  { immediate: true },
)

const handleLike = () => {
  const likeState = localStorage.getItem(`like-post-${route.params.slug}`)
  if (likeState === "true") {
    isLiked.value = true
    return
  }
  localStorage.setItem(`like-post-${route.params.slug}`, "true")
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
          v-if="currentLanguage === 'en'"
          class="mt-6 leading-tight text-neutral-100 text-4xl sm:text-5xl font-semibold selection:bg-accent-dark"
        >
          {{ post?.titleEn }}
        </h1>
        <h1
          v-if="currentLanguage === 'zh'"
          class="mt-6 leading-tight text-neutral-100 text-4xl sm:text-5xl font-semibold selection:bg-accent-dark"
        >
          {{ post?.titleZh }}
        </h1>
        <p v-if="currentLanguage === 'en'" class="mt-1 text-neutral-400 selection:bg-accent-dark">
          {{ post?.aboutEn }}
        </p>
        <p v-if="currentLanguage === 'zh'" class="mt-1 text-neutral-400 selection:bg-accent-dark">
          {{ post?.aboutZh }}
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
          <p class="text-neutral-400 text-xs flex items-center gap-2 pointer-events-none">
            <Calendar :size="15" class="text-neutral-600" />
            <span>{{ dateFormat(post?.created_at || "") }}</span>
          </p>
          <p
            class="text-neutral-400 text-xs flex items-center gap-2 pointer-events-none"
            :class="post?.created_at === post?.updated_at ? 'hidden' : ''"
          >
            <CalendarDays :size="15" class="text-neutral-600" />
            <span>{{ dateFormat(post?.updated_at || "") }}</span>
          </p>
          <p class="text-neutral-400 text-xs flex items-center gap-2 ml-auto pointer-events-none">
            <Eye :size="15" class="text-neutral-600" />
            <span>{{ viewNum }} {{ t("posts.view") }}</span>
          </p>
          <button
            class="text-neutral-400 text-xs flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            @click="handleLike"
            :disabled="isLiked"
          >
            <Heart :size="15" :class="isLiked ? 'text-red-600' : 'text-neutral-600'" />
            <span>{{ likeNum ? likeNum : initialLike }} {{ t("posts.like") }}</span>
          </button>
        </div>
      </div>
      <section>
        <MdPreview
          v-if="currentLanguage === 'en'"
          :content="post?.contentEn"
          :isLoading="isLoading"
        />
        <MdPreview
          v-if="currentLanguage === 'zh'"
          :content="post?.contentZh"
          :isLoading="isLoading"
        />
      </section>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-10 mt-12">
        <div>
          <LikedButton :handleLike="handleLike" :isLiked="isLiked" />
        </div>
        <div>
          <RouterLink
            :to="{ name: 'edit-post', params: route.params }"
            class="relative group px-4 py-3 rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300"
          >
            <span class="font-semibold"> {{ t("posts.edit_button") }} </span>
            <ChevronRight :stroke-width="2" :size="20" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
