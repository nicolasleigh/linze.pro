<script setup lang="ts">
import { useActiveSection } from "@/hooks/useActiveSection"
import Header from "../Header.vue"
import Article from "./en/Article.vue"
import Aside from "../Aside.vue"
import { ref, watch } from "vue"
import { useTranslation } from "i18next-vue"

const { activeSection } = useActiveSection()
const article = ref<InstanceType<typeof Article>>()
const section = ref(article.value?.section || [])
const { t } = useTranslation()

watch(article, (newVal) => {
  section.value = newVal?.section || []
})
</script>

<template>
  <section>
    <div class="layout pb-12 pt-[8.6rem] md:pb-20 md:pt-[9.6rem]">
      <Header
        :title="t('projects.moviefy_title')"
        :about="t('projects.moviefy_about')"
        video=""
        website="https://movie.linze.pro"
        repo="https://github.com/nicolasleigh/moviefy"
      />
      <div class="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr),250px] lg:gap-8">
        <Article ref="article" />
        <Aside :section="section" :activeSection="activeSection || ''" />
      </div>
    </div>
  </section>
</template>
