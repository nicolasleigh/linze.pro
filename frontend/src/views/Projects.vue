<script setup lang="ts">
import Cabinfy from "@/components/project-icons/Cabinfy.vue"
import Chatify from "@/components/project-icons/Chatify.vue"
import Current from "@/components/project-icons/Current.vue"
import Moviefy from "@/components/project-icons/Moviefy.vue"
import Musicfy from "@/components/project-icons/musicfy.vue"
import Petify from "@/components/project-icons/petify.vue"
import ProjectCard from "@/components/ProjectCard.vue"
import { BriefcaseBusiness, ChevronRight } from "lucide-vue-next"
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
          <span class="text-neutral-300 font-semibold"> Full-Stack </span>
          <span
            class="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
            >Projects</span
          >
        </h1>
        <p class="mt-3">
          <span
            class="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, animi?
          </span>
        </p>
      </div>
    </div>
    <div class="layout">
      <ul class="mt-6 grid gap-8">
        <ProjectCard
          title="CabinFy"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, sequi!"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/hexcape/hexcape-banner-square"
          repo="https://github.com/nicolasleigh/cabinfy"
          website="https://cabinfy.linze.pro"
          reverse
        >
          <Cabinfy />
        </ProjectCard>
        <ProjectCard
          title="MovieFy"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, sequi!"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/notiolink/notiolink-banner-square.png"
          repo="https://github.com/nicolasleigh/moviefy"
          website="https://moviefy.linze.pro"
        >
          <Moviefy />
        </ProjectCard>
        <ProjectCard
          title="MusicFy"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, sequi!"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/seasforus/seasforus-banner-square.png"
          repo="https://github.com/nicolasleigh/musicfy"
          reverse
        >
          <Musicfy />
        </ProjectCard>
        <ProjectCard
          title="Petify"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, sequi!"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/notiolink/notiolink-banner-square.png"
          repo="https://github.com/nicolasleigh/petify"
          website="https://petify.linze.pro"
        >
          <Petify />
        </ProjectCard>
        <ProjectCard
          title="Chatify"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, sequi!"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/hexcape/hexcape-banner-square"
          repo="https://github.com/nicolasleigh/chatify"
          website="https://chatify.linze.pro"
          reverse
        >
          <Chatify />
        </ProjectCard>
        <ProjectCard
          title="Linze.pro"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, sequi!"
          image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/notiolink/notiolink-banner-square.png"
          repo="https://github.com/nicolasleigh/chatify"
          website="https://chatify.linze.pro"
        >
          <Current />
        </ProjectCard>
      </ul>
    </div>
  </section>
</template>
