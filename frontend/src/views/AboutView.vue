<script setup lang="ts">
import { useTranslation } from "i18next-vue"
import { User2 } from "lucide-vue-next"

import { ref, watch } from "vue"
import AboutArticleEn from "./project/about/en/AboutArticle.vue"
import AboutArticleZh from "./project/about/zh/AboutArticle.vue"
import Aside from "./project/Aside.vue"

const articleEn = ref<InstanceType<typeof AboutArticleEn>>()
const articleZh = ref<InstanceType<typeof AboutArticleZh>>()
const sectionEn = ref(articleEn.value?.section || [])
const sectionZh = ref(articleZh.value?.section || [])

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
  <main class="layout">
    <div class="relative">
      <div
        class="layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center"
      >
        <div
          class="size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm"
        >
          <User2 class="text-accent" :size="20" :stroke-width="1" />
        </div>
        <h1 class="mt-4 text-5xl sm:text-6xl">
          <span class="text-neutral-300 font-semibold"> {{ t("about.title_about") }} </span>
          <span
            class="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
            >{{ t("about.title_me") }}</span
          >
        </h1>
        <p class="mt-3">
          <span
            class="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent"
          >
            {{ t("about.about") }}
          </span>
        </p>
      </div>
    </div>
    <section class="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr),250px] lg:gap-8">
      <AboutArticleEn v-if="currentLanguage === 'en'" ref="articleEn" />
      <AboutArticleZh v-if="currentLanguage === 'zh'" ref="articleZh" />
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
  </main>
</template>
