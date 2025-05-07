<script setup lang="ts">
import Header from "../Header.vue"
import ArticleEn from "./en/Article.vue"
import ArticleZh from "./zh/Article.vue"
import Aside from "../Aside.vue"
import { ref, watch } from "vue"
import { useTranslation } from "i18next-vue"
import LikedButton from "@/components/LikedButton.vue"

const demoImages = [
  "https://file.linze.pro/images/musicfy/1.webp",
  "https://file.linze.pro/images/musicfy/2.webp",
  "https://file.linze.pro/images/musicfy/3.webp",
  "https://file.linze.pro/images/musicfy/4.webp",
  "https://file.linze.pro/images/musicfy/5.webp",
  "https://file.linze.pro/images/musicfy/6.webp",
  "https://file.linze.pro/images/musicfy/7.webp",
  "https://file.linze.pro/images/musicfy/8.webp",
  "https://file.linze.pro/images/musicfy/9.webp",
  "https://file.linze.pro/images/musicfy/10.webp",
]

const articleEn = ref<InstanceType<typeof ArticleEn>>()
const articleZh = ref<InstanceType<typeof ArticleZh>>()
const sectionEn = ref(articleEn.value?.section || [])
const sectionZh = ref(articleZh.value?.section || [])
const header = ref<InstanceType<typeof Header>>()

const { t, i18next } = useTranslation()

const currentLanguage = ref<string | null>(null)

watch(
  () => i18next.language,
  (newLang) => {
    currentLanguage.value = newLang
  },
  { immediate: true },
)

watch(articleEn, (newVal) => {
  sectionEn.value = newVal?.section || []
})

watch(articleZh, (newVal) => {
  sectionZh.value = newVal?.section || []
})
</script>

<template>
  <section>
    <div class="layout pb-12 pt-[8.6rem] md:pb-20 md:pt-[9.6rem]">
      <Header
        :title="t('projects.musicfy_title')"
        :about="t('projects.musicfy_about')"
        video=""
        repo="https://github.com/nicolasleigh/musicfy"
        ref="header"
      />
      <section class="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr),250px] lg:gap-8">
        <ArticleEn v-if="currentLanguage === 'en'" ref="articleEn" :demoImages="demoImages" />
        <ArticleZh v-if="currentLanguage === 'zh'" ref="articleZh" :demoImages="demoImages" />
        <Aside
          v-if="currentLanguage === 'en'"
          :section="sectionEn"
          :activeSection="articleEn?.activeSection || ''"
        />
        <Aside
          v-if="currentLanguage === 'zh'"
          :section="sectionZh"
          :activeSection="articleZh?.activeSection || ''"
        />
      </section>
      <div class="">
        <LikedButton :handleLike="header?.handleLike" :isLiked="header?.isLiked || false" />
      </div>
    </div>
  </section>
</template>
