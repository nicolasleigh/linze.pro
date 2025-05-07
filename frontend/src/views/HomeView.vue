<script setup lang="ts">
import Cabinfy from "@/components/project-icons/Cabinfy.vue"
import Petify from "@/components/project-icons/Petify.vue"
import ProjectCard from "@/components/ProjectCard.vue"
import { useTranslation } from "i18next-vue"
import { ChevronRightIcon, Eye, FileUser, Github } from "lucide-vue-next"
import { paragraphStyle } from "./project/CommonStyle"
import IconReact from "@/components/icons/IconReact.vue"
import IconVue from "@/components/icons/IconVue.vue"
import IconGo from "@/components/icons/IconGo.vue"
import IconNode from "@/components/icons/IconNode.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
import IconTailwind from "@/components/icons/IconTailwind.vue"
import { useRouter } from "vue-router"
import PostCard from "@/components/PostCard.vue"
import { ref, watch } from "vue"
import { usePosts } from "@/hooks/usePosts"

const router = useRouter()

const { posts: resultPost, error, isLoading } = usePosts({ page: 1, limit: 2 })

const navigateToAboutPage = () => {
  router.push("/about")
}

const { t, i18next } = useTranslation()

const currentLanguage = ref<string | null>(null)

watch(
  () => i18next.language,
  (newLang) => {
    currentLanguage.value = newLang
  },
  { immediate: true },
)
</script>
<template>
  <div class="">
    <section
      class="flex w-full md:h-screen items-start pb-12 pt-12 md:pb-20 md:pt-36 bg-cover bg-no-repeat bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.9)),url(hero.webp)]"
    >
      <div class="mx-auto w-11/12 min-[450px]:ml-5 sm:ml-10 md:ml-20 lg:ml-24 xl:ml-40 mt-14">
        <div class="max-w-[29rem] text-left text-white">
          <h1 class="text-2xl sm:text-4xl md:text-6xl mt-10 font-semibold">
            {{ t("home.hero_title") }}
          </h1>
          <div class="text-lg">
            <p :class="paragraphStyle">
              {{ t("home.hero_about") }}
            </p>
            <ul class="flex items-center gap-3">
              <li>
                <IconWithTooltip tooltip="React">
                  <IconReact class="size-7" />
                </IconWithTooltip>
              </li>
              <li>
                <IconWithTooltip tooltip="Vue">
                  <IconVue class="size-7" />
                </IconWithTooltip>
              </li>
              <li>
                <IconWithTooltip tooltip="Golang">
                  <IconGo class="size-7" />
                </IconWithTooltip>
              </li>
              <li>
                <IconWithTooltip tooltip="Node.js">
                  <IconNode class="size-7" />
                </IconWithTooltip>
              </li>
              <li>
                <IconWithTooltip tooltip="Tailwind CSS">
                  <IconTailwind class="size-10" />
                </IconWithTooltip>
              </li>
            </ul>
          </div>
          <div class="mt-8 flex gap-4">
            <a
              target="_blank"
              referrerpolicy="no-referrer"
              href="https://github.com/nicolasleigh"
              class="p-0.5 hover:text-neutral-400 transition-colors text-neutral-500 flex items-center justify-center rounded-sm cursor-newtab"
            >
              <IconWithTooltip tooltip="GitHub">
                <Github :stroke-width="1" class="cursor-newtab" />
              </IconWithTooltip>
            </a>
            <a
              target="_blank"
              referrerpolicy="no-referrer"
              class="p-0.5 hover:text-neutral-400 transition-colors text-neutral-500 flex items-center justify-center rounded-sm cursor-newtab"
            >
              <IconWithTooltip :tooltip="t('home.hero_resume')">
                <FileUser :stroke-width="1" class="cursor-newtab" />
              </IconWithTooltip>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="layout flex items-start justify-end max-md:justify-center pb-12 md:pb-20">
      <img src="/arrow.svg" class="hidden min-[900px]:block mr-20 lg:mr-36 xl:mr-56" />
      <div
        class="text-neutral-200 max-w-[33rem] max-xl:mr-5 max-lg:mr-10 max-md:mr-0 max-[900px]:mr-20"
      >
        <h2 class="text-2xl sm:text-3xl md:text-5xl font-semibold">{{ t("home.about_title") }}</h2>
        <p :class="paragraphStyle">
          {{ t("home.about_1") }}
        </p>
        <p :class="paragraphStyle">
          {{ t("home.about_2") }}
        </p>
        <button
          class="relative mt-6 group px-4 py-3 font-medium rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
          @click="navigateToAboutPage"
        >
          {{ t("home.about_cta") }}
          <ChevronRightIcon />
        </button>
      </div>
    </section>
    <section class="relative layout overflow-hidden">
      <div class="py-12 md:py-20 flex flex-col">
        <div>
          <h2 class="text-2xl sm:text-3xl md:text-5xl font-semibold text-neutral-200">
            {{ t("home.project_title") }}
          </h2>
          <p class="text-neutral-300 mt-2 self-start flex text-base">
            {{ t("home.project_subtitle") }}
          </p>
        </div>
        <ul class="mt-6 grid gap-8">
          <ProjectCard
            :title="t('projects.cabinfy_title')"
            :about="t('projects.cabinfy_about')"
            image="https://file.linze.pro/images/cabinfy/1.webp"
            repo="https://github.com/nicolasleigh/cabinfy"
            website="https://cabin.linze.pro"
            link="/projects/cabinfy"
          >
            <Cabinfy />
          </ProjectCard>
          <ProjectCard
            :title="t('projects.petify_title')"
            :about="t('projects.petify_about')"
            image="https://file.linze.pro/images/petify/1.webp"
            repo="https://github.com/nicolasleigh/petify"
            website="https://pet.linze.pro"
            link="/projects/petify"
            reverse
          >
            <Petify />
          </ProjectCard>
        </ul>

        <RouterLink
          class="mt-16 self-center text-base flex items-center gap-2 hover:text-accent transition-colors text-neutral-300"
          to="/projects"
        >
          <span> {{ t("home.project_button") }}</span>
          <div
            class="border border-neutral-400 size-6 flex items-center justify-center bg-white/5 rounded-[10px]"
          >
            <ChevronRightIcon :stroke-width="1" :size="20" />
          </div>
        </RouterLink>
      </div>
    </section>
    <section class="layout">
      <div class="py-12 md:py-20 flex flex-col">
        <div>
          <h2 class="text-2xl sm:text-3xl md:text-5xl font-semibold text-neutral-200">
            {{ t("home.post_title") }}
          </h2>
          <p class="text-neutral-300 mt-2 self-start flex">
            {{ t("home.post_subtitle") }}
          </p>
        </div>

        <ul class="md:border-r border-neutral-900 md:pr-8 grid gap-8 py-6">
          <li
            v-for="(item, index) in resultPost"
            :key="index"
            class="w-full rounded-md @container/blog-card transition duration-100 group"
          >
            <PostCard
              v-if="currentLanguage === 'zh'"
              :slug="item.slug"
              :title="item.titleZh"
              :about="item.aboutZh"
              :photo="item.photo"
              :tags="item.tags"
              :createdAt="item.created_at"
              :view="item.viewNum"
              :like="item.likeNum"
            />
            <PostCard
              v-else
              :slug="item.slug"
              :title="item.titleEn"
              :about="item.aboutEn"
              :photo="item.photo"
              :tags="item.tags"
              :createdAt="item.created_at"
              :view="item.viewNum"
              :like="item.likeNum"
            />
            <hr class="border-dashed border-neutral-900 mt-8 group-last-of-type:hidden" />
          </li>
        </ul>

        <RouterLink
          class="mt-16 self-center text-base flex items-center gap-2 hover:text-accent transition-colors text-neutral-300"
          to="/posts"
        >
          <span> {{ t("home.post_button") }} </span>
          <div
            class="border border-neutral-400 size-6 flex items-center justify-center bg-white/5 rounded-[10px]"
          >
            <ChevronRightIcon :stroke-width="1" :size="20" />
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
