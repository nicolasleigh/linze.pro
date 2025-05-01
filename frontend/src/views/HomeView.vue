<script setup lang="ts">
import Cabinfy from "@/components/project-icons/Cabinfy.vue"
import Petify from "@/components/project-icons/Petify.vue"
import ProjectCard from "@/components/ProjectCard.vue"
import { useTranslation } from "i18next-vue"
import { ChevronRightIcon, Eye, FileUser, Github } from "lucide-vue-next"
import { paragraphStyle } from "./project/CommonStyle"

const { t } = useTranslation()
</script>

<template>
  <div class="layout pb-12 pt-12 md:pb-20 md:pt-36 flex flex-col justify-center">
    <section class="flex w-full flex-col items-start pb-12 pt-12 md:pb-20 md:pt-20">
      <div class="max-w-[30rem] text-left text-white">
        <h1 class="text-3xl mt-10 font-semibold">Hi, I'm Nicolas Leigh (Li Linze)</h1>
        <p class="mt-4">
          A self-taught full-stack developer with a background in finance. I build modern web
          applications using React, Vue, Go, Node.js, and more.
        </p>
      </div>
      <div class="mt-10 flex gap-4">
        <button
          class="relative group px-4 py-3 font-medium rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
          @click=""
        >
          View My Projects
        </button>
        <button
          class="relative group px-4 py-3 font-medium rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
          @click=""
        >
          Download Resume
        </button>
        <button
          class="relative group px-4 py-3 font-medium rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
          @click=""
        >
          Contact Me
        </button>
      </div>
      <div class="mt-10 flex gap-4">
        <a
          target="_blank"
          referrerpolicy="no-referrer"
          href="https://github.com/nicolasleigh"
          class="p-0.5 hover:text-neutral-400 transition-colors text-neutral-500 flex items-center justify-center rounded-sm"
        >
          <Github :stroke-width="1" />
        </a>
        <a
          target="_blank"
          referrerpolicy="no-referrer"
          class="p-0.5 hover:text-neutral-400 transition-colors text-neutral-500 flex items-center justify-center rounded-sm"
        >
          <FileUser :stroke-width="1" />
        </a>
      </div>
    </section>
    <section class="py-12 md:py-20 flex items-center justify-end">
      <div class="text-neutral-200 max-w-[30rem] items-end justify-end">
        <h1 class="text-3xl mt-10 font-semibold">About Me</h1>
        <p :class="paragraphStyle">
          With a foundation in economics and financial auditing, I discovered my passion for
          programming in 2021 and never looked back.
        </p>
        <p :class="paragraphStyle">
          Now I focus on building fast, clean, and user-friendly full-stack applications using
          modern tools and thoughtful design.
        </p>
        <button
          class="relative group px-4 py-3 font-medium rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
          @click=""
        >
          See More
        </button>
      </div>
    </section>
    <section class="relative overflow-hidden">
      <div class="layout py-12 md:py-20 flex flex-col">
        <div>
          <h2 class="text-5xl text-neutral-100 relative flex items-center gap-2 self-start">
            <span
              >Featured
              <span
                class="relative transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
                >Projects</span
              >
            </span>
          </h2>
          <p class="text-neutral-300 mt-2 self-start flex">
            A selection of projects that I've worked on.
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
            reverse
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
          >
            <Petify />
          </ProjectCard>
        </ul>

        <a
          class="mt-16 self-center flex items-center gap-2 hover:text-neutral-100 transition-colors text-neutral-300"
          data-fade="3"
          href="/projects"
        >
          See more projects
          <ChevronRightIcon :stroke-width="1" />
        </a>
      </div>
    </section>
    <section>
      <div class="layout py-12 md:py-20 flex flex-col">
        <div>
          <h2 class="text-5xl text-neutral-100 relative flex items-center gap-2 self-start">
            <span
              >Featured
              <span
                class="relative transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
                >Posts</span
              >
            </span>
          </h2>
          <p class="text-neutral-300 mt-2 self-start flex">
            A selection of posts that I've worked on.
          </p>
        </div>
        <ul class="mt-4 sm:mt-10 grid gap-8 py-6">
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
        </ul>

        <a
          class="mt-16 self-center flex items-center gap-2 hover:text-neutral-100 transition-colors text-neutral-300"
          data-fade="3"
          href="/posts"
        >
          See more Posts
          <ChevronRightIcon :stroke-width="1" />
        </a>
      </div>
    </section>
  </div>
</template>
