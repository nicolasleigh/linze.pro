<script setup lang="ts">
import { ref, watch } from "vue"
import Aside from "../Aside.vue"
import Header from "../Header.vue"
import ArticleEn from "./en/Article.vue"
import ArticleZh from "./zh/Article.vue"
import { useTranslation } from "i18next-vue"
import LikedButton from "@/components/LikedButton.vue"
import AsideInMobile from "../AsideInMobile.vue"

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
  <div>
    <div class="layout pb-12 pt-[8.6rem] md:pb-20 md:pt-[9.6rem]">
      <Header
        :title="t('projects.cabinfy_title')"
        :about="t('projects.cabinfy_about')"
        video=""
        website="https://cabin.linze.pro"
        repo="https://github.com/nicolasleigh/cabinfy"
        ref="header"
      />
      <section class="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr),250px] lg:gap-8">
        <ArticleEn v-if="currentLanguage === 'en'" ref="articleEn" />
        <ArticleZh v-if="currentLanguage === 'zh'" ref="articleZh" />
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
      <div class="mt-12 mb-24">
        <LikedButton :handleLike="header?.handleLike" :isLiked="header?.isLiked || false" />
      </div>
    </div>
  </div>
</template>
