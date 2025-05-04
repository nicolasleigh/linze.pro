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
  <div class="layout pb-12 pt-12 md:pb-20 md:pt-36">
    <section
      class="flex w-full flex-col min-h-[calc(100vh-140px)] items-start pb-12 pt-12 md:pb-20 md:pt-20"
    >
      <div class="max-w-[29rem] text-left text-white">
        <h1 class="text-6xl mt-10 font-semibold">{{ t("home.hero_title") }}</h1>
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
      </div>
      <!-- <div class="mt-6 flex gap-4">
        <button
          class="relative group px-4 py-3 font-medium rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
          @click=""
        >
          Download Resume
        </button>
      </div> -->
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
    </section>
    <section class="flex items-start justify-end pb-12 md:pb-20">
      <div class="text-neutral-200 max-w-[30rem] items-end justify-end">
        <h2 class="text-5xl font-semibold">{{ t("home.about_title") }}</h2>
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
    <section class="relative overflow-hidden">
      <div class="layout py-12 md:py-20 flex flex-col">
        <div>
          <!-- <h2 class="text-5xl text-neutral-100 relative flex items-center gap-2 self-start">
            <span
              >Featured
              <span
                class="relative transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
                >Projects</span
              >
            </span>
          </h2> -->

          <h2 class="text-5xl font-semibold text-neutral-200">{{ t("home.project_title") }}</h2>
          <p class="text-neutral-300 mt-2 self-start flex text-base">
            {{ t("home.project_subtitle") }}
          </p>
        </div>
        <ul class="mt-6 grid gap-8">
          <ProjectCard
            :title="t('projects.cabinfy_title')"
            :about="t('projects.cabinfy_about')"
            image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/hexcape/hexcape-banner-square"
            repo="https://github.com/nicolasleigh/cabinfy"
            website="https://cabin.linze.pro"
            link="/projects/cabinfy"
          >
            <Cabinfy />
          </ProjectCard>
          <ProjectCard
            :title="t('projects.petify_title')"
            :about="t('projects.petify_about')"
            image="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/notiolink/notiolink-banner-square.png"
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
    <section>
      <div class="layout py-12 md:py-20 flex flex-col">
        <div>
          <!-- <h2 class="text-5xl text-neutral-100 relative flex items-center gap-2 self-start">
            <span
              >Featured
              <span
                class="relative transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
                >Posts</span
              >
            </span>
          </h2> -->
          <h2 class="text-5xl font-semibold text-neutral-200">
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
        <!-- <ul class="mt-4 sm:mt-10 grid gap-8 py-6">
          <li class="w-full rounded-md transition duration-100 group">
            <a class="block rounded-md default-ring px-2 -mx-2"
              ><div class="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6 lg:items-center py-3">
                <figure
                  class="isolate z-[1] pointer-events-none overflow-hidden rounded-md lg:max-w-44 lg:w-full"
                >
                  <div
                    class="jsx-1923562739 img-blur"
                    style="position: relative; height: 0px; padding-top: 60%; cursor: default"
                  >
                    <div class="absolute left-0 top-0">
                      <img
                        alt="Photo taken from unsplash"
                        title="Photo taken from unsplash"
                        loading="lazy"
                        width="1440"
                        height="792"
                        decoding="async"
                        data-nimg="1"
                        src="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_5:3,w_1440/theodorusclarence/banner/david-wright-F-Bq5wB5RY0-unsplash"
                        style="color: transparent"
                      />
                    </div>
                  </div>
                </figure>
                <div class="w-full">
                  <div class="flex items-center gap-3">
                    <p class="text-neutral-400">December 17, 2024</p>
                  </div>
                  <h3 class="mt-3 relative text-neutral-100">
                    <span
                      class="bg-gradient-to-r from-accent/30 via-accent/90 to-accent/30 box-decoration-clone group-hover:opacity-30 opacity-0 transition text-transparent"
                      aria-hidden="true"
                      >List Animation using Motion for React</span
                    ><span class="absolute left-0 top-0"
                      >List Animation using Motion for React</span
                    >
                  </h3>
                  <p class="text-neutral-200 mt-1">
                    An in-depth guide on how to animate enter and exit animation for list using
                    Motion for React (previously Framer Motion).
                  </p>
                  <div class="flex justify-between mt-5 flex-col gap-4 lg:flex-row lg:items-center">
                    <div class="flex items-center gap-5">
                      <div class="flex items-center gap-2 text-accent">
                        <Eye :size="15" />
                        <p class="text-xs">3,267 views</p>
                      </div>
                    </div>
                    <div
                      class="flex flex-wrap gap-x-2 gap-y-1 text-sm text-black dark:text-gray-100"
                    >
                      <button
                        class="bg-opacity-80 dark:!bg-opacity-60 inline-block rounded-md px-1.5 py-0.5 font-medium transition bg-gray-100 text-gray-700 disabled:bg-gray-200 disabled:text-gray-300 dark:bg-neutral-900 dark:text-neutral-500 dark:disabled:bg-neutral-800 dark:disabled:text-gray-500 disabled:opacity-40 dark:data-[selected=true]:bg-accent-bg dark:data-[selected=true]:text-accent focus:outline-none focus-visible:ring focus-visible:ring-primary-300 disabled:cursor-not-allowed"
                        tabindex="-1"
                      >
                        react</button
                      ><button
                        class="bg-opacity-80 dark:!bg-opacity-60 inline-block rounded-md px-1.5 py-0.5 font-medium transition bg-gray-100 text-gray-700 disabled:bg-gray-200 disabled:text-gray-300 dark:bg-neutral-900 dark:text-neutral-500 dark:disabled:bg-neutral-800 dark:disabled:text-gray-500 disabled:opacity-40 dark:data-[selected=true]:bg-accent-bg dark:data-[selected=true]:text-accent focus:outline-none focus-visible:ring focus-visible:ring-primary-300 disabled:cursor-not-allowed"
                        tabindex="-1"
                      >
                        animation
                      </button>
                    </div>
                  </div>
                </div>
              </div></a
            >
          </li>
          <hr class="border-dashed border-neutral-900" />
        </ul> -->

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
