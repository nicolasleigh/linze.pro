<script setup lang="ts">
import IconGithub from "@/components/icons/IconGithub.vue"
import IconLink from "@/components/icons/IconLink.vue"
import { Eye, Heart, Play, User } from "lucide-vue-next"
import { useGetProjectLike, useProjectLike, useProjectView } from "@/hooks/useLikeAndView"
import { useRoute } from "vue-router"
import { ref } from "vue"
import { useTranslation } from "i18next-vue"

defineProps({
  title: String,
  about: String,
  video: String,
  website: String,
  repo: String,
})

const route = useRoute()
const { t } = useTranslation()
const { viewNum } = useProjectView()
const { likeNum, updateProjectLike } = useProjectLike()
const { likeNum: initialLike } = useGetProjectLike()
const isLiked = ref(localStorage.getItem(`like-project-${String(route.name)}`) === "true" || false)

const handleLike = () => {
  const likeState = localStorage.getItem(`like-project-${String(route.name)}`)
  if (likeState === "true") {
    isLiked.value = true
    return
  }
  localStorage.setItem(`like-project-${String(route.name)}`, "true")
  isLiked.value = true
  updateProjectLike()
}

defineExpose({ isLiked, handleLike })
</script>

<template>
  <header class="">
    <h1 class="text-neutral-100 text-4xl sm:text-5xl font-semibold mt-6 leading-tight">
      {{ title }}
    </h1>
    <p class="text-neutral-400 text-base mt-2">
      {{ about }}
    </p>
    <div
      class="mt-9 py-4 border-y text-neutral-300 text-xs border-neutral-800 flex items-center gap-5 flex-wrap"
    >
      <p class="flex items-center gap-2 pointer-events-none">
        <User :size="15" class="text-neutral-600" />
        <span>{{ t("projects.team") }}</span>
      </p>
      <p class="flex items-center gap-2 pointer-events-none">
        <Eye :size="15" class="text-neutral-600" />
        <span> {{ viewNum }} {{ t("projects.view") }}</span>
      </p>
      <button class="flex items-center gap-2 mr-auto" @click="handleLike" :disabled="isLiked">
        <Heart :size="15" :class="isLiked ? 'text-red-600' : 'text-neutral-600'" />
        <span>{{ likeNum ? likeNum : initialLike }} {{ t("projects.like") }}</span>
      </button>
      <a
        class="hover:underline hover:text-accent text-neutral-500 transition-colors flex items-center gap-1.5"
        :href="video"
      >
        <Play :size="15" />
        <span class="text-neutral-300"> {{ t("projects.demo") }} </span>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        :href="website"
        class="hover:underline hover:text-accent text-neutral-500 transition-colors flex items-center gap-1.5 cursor-newtab"
      >
        <IconLink />
        <span class="text-neutral-300">{{ t("projects.website_link") }}</span>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        :href="repo"
        class="hover:underline hover:text-accent text-neutral-500 transition-colors flex items-center gap-1.5 cursor-newtab"
      >
        <IconGithub />
        <span class="text-neutral-300">{{ t("projects.github_link") }}</span>
      </a>
    </div>
  </header>
</template>
