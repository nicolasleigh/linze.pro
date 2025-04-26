<script setup lang="ts">
import { useActiveSection } from "@/hooks/useActiveSection"
import Header from "../Header.vue"
import Article from "./en/Article.vue"
import Aside from "../Aside.vue"
import { onMounted, ref, watch } from "vue"
import { useGetProjectLike, useProjectLike, useProjectView } from "@/hooks/useLikeAndView"

const { activeSection } = useActiveSection()
const article = ref<InstanceType<typeof Article>>()
const section = ref(article.value?.section || [])

// const { viewNum } = useProjectView()
// const { likeNum, updateProjectLike } = useProjectLike()
// const { likeNum: initialLike } = useGetProjectLike()

watch(article, (newVal) => {
  section.value = newVal?.section || []
})
</script>

<template>
  <div>
    <div class="layout pb-12 pt-[8.6rem] md:pb-20 md:pt-[9.6rem]">
      <Header
        title="CabinFy"
        about="Modern cabin booking platform with multilingual support and sleek admin dashboard for seamless rental management."
        :view="24"
        :like="12"
        video=""
        website="https://cabin.linze.pro"
        repo="https://github.com/nicolasleigh/cabinfy"
      />
      <div class="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr),250px] lg:gap-8">
        <Article ref="article" />
        <Aside :section="section" :activeSection="activeSection || ''" />
      </div>
    </div>
  </div>
</template>
