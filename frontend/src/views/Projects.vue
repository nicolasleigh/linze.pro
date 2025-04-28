<script setup lang="ts">
import Cabinfy from "@/components/project-icons/Cabinfy.vue"
import Chatify from "@/components/project-icons/Chatify.vue"
import Current from "@/components/project-icons/Current.vue"
import Moviefy from "@/components/project-icons/Moviefy.vue"
import Musicfy from "@/components/project-icons/Musicfy.vue"
import Petify from "@/components/project-icons/Petify.vue"
import ProjectCard from "@/components/ProjectCard.vue"
import { useTranslation } from "i18next-vue"
import { BriefcaseBusiness, ChevronRight } from "lucide-vue-next"

const { t } = useTranslation()
</script>

<template>
  <section class="relative overflow-x-clip">
    <div class="relative">
      <div
        class="layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center"
      >
        <div
          class="size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm"
        >
          <BriefcaseBusiness class="text-accent" :size="20" :stroke-width="1.5" />
        </div>
        <h1 class="mt-4 text-6xl">
          <span class="text-neutral-300 font-semibold mr-3"> {{ t("projects.full_stack") }} </span>
          <span
            class="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
            >{{ t("projects.projects") }}</span
          >
        </h1>
        <p class="mt-3">
          <span
            class="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent"
          >
            {{ t("projects.about") }}
          </span>
        </p>
      </div>
    </div>
    <div class="layout">
      <ul class="mt-6 grid gap-8">
        <ProjectCard
          :title="t('projects.cabinfy_title')"
          :about="t('projects.cabinfy_about')"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/hexcape/hexcape-banner-square"
          repo="https://github.com/nicolasleigh/cabinfy"
          website="https://cabin.linze.pro"
          link="/projects/cabinfy"
          reverse
        >
          <Cabinfy />
        </ProjectCard>
        <ProjectCard
          :title="t('projects.moviefy_title')"
          :about="t('projects.moviefy_about')"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/notiolink/notiolink-banner-square.png"
          repo="https://github.com/nicolasleigh/moviefy"
          website="https://movie.linze.pro"
          link="/projects/moviefy"
        >
          <Moviefy />
        </ProjectCard>
        <ProjectCard
          :title="t('projects.musicfy_title')"
          :about="t('projects.musicfy_about')"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/seasforus/seasforus-banner-square.png"
          repo="https://github.com/nicolasleigh/musicfy"
          link="/projects/musicfy"
          reverse
        >
          <Musicfy />
        </ProjectCard>
        <ProjectCard
          :title="t('projects.petify_title')"
          :about="t('projects.petify_about')"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/notiolink/notiolink-banner-square.png"
          repo="https://github.com/nicolasleigh/petify"
          website="https://pet.linze.pro"
          link="/projects/petify"
        >
          <Petify />
        </ProjectCard>
        <ProjectCard
          :title="t('projects.chatify_title')"
          :about="t('projects.chatify_about')"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/hexcape/hexcape-banner-square"
          repo="https://github.com/nicolasleigh/chatify"
          website="https://chat.linze.pro"
          link="/projects/chatify"
          reverse
        >
          <Chatify />
        </ProjectCard>
        <ProjectCard
          :title="t('projects.blog_title')"
          :about="t('projects.blog_about')"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/notiolink/notiolink-banner-square.png"
          repo="https://github.com/nicolasleigh/chatify"
          website="https://linze.pro"
          link="/projects/blog"
        >
          <Current />
        </ProjectCard>
      </ul>
    </div>
  </section>
</template>
