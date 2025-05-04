<script setup lang="ts">
import { useTranslation } from "i18next-vue"
import { MessagesSquare } from "lucide-vue-next"
import Giscus from "@giscus/vue"
import { ref, watch } from "vue"

const { t, i18next } = useTranslation()

const currentLanguage = ref("en")

watch(
  () => i18next.language,
  (newLang) => {
    currentLanguage.value = newLang
  },
  { immediate: true },
)
</script>

<template>
  <main class="layout">
    <section class="relative">
      <div
        class="layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center"
      >
        <div
          class="size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm"
        >
          <MessagesSquare class="text-accent" :size="20" :stroke-width="1" />
        </div>
        <h1 class="mt-4 text-5xl sm:text-6xl">
          <span
            class="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
            >{{ t("comments.title_comments") }}</span
          >
        </h1>
        <p class="mt-3">
          <span
            class="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent"
          >
            {{ t("comments.about") }}
          </span>
        </p>
      </div>
    </section>
    <section>
      <Giscus
        id="comments"
        repo="nicolasleigh/linze.pro"
        repoId="R_kgDOOYUVzg"
        category="General"
        categoryId="DIC_kwDOOYUVzs4Cpr5b"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        strict="0"
        inputPosition="bottom"
        theme="dark"
        :lang="currentLanguage === 'en' ? 'en' : 'zh-CN'"
        loading="eager"
        crossorigin="anonymous"
        async
      />
    </section>
  </main>
</template>
