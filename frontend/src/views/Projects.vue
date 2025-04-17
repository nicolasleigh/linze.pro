<script setup lang="ts">
import IconAndroid from "@/components/icons/IconAndroid.vue"
import IconApple from "@/components/icons/IconApple.vue"
import IconCaddy from "@/components/icons/IconCaddy.vue"
import IconClerk from "@/components/icons/IconClerk.vue"
import IconDocker from "@/components/icons/IconDocker.vue"
import IconExpress from "@/components/icons/IconExpress.vue"
import IconGithub from "@/components/icons/IconGithub.vue"
import IconGo from "@/components/icons/IconGo.vue"
import IconLink from "@/components/icons/IconLink.vue"
import IconMongo from "@/components/icons/IconMongo.vue"
import IconNextJs from "@/components/icons/IconNextJs.vue"
import IconNode from "@/components/icons/IconNode.vue"
import IconPostgres from "@/components/icons/IconPostgres.vue"
import IconPrisma from "@/components/icons/IconPrisma.vue"
import IconReact from "@/components/icons/IconReact.vue"
import IconRedux from "@/components/icons/IconRedux.vue"
import IconTailwind from "@/components/icons/IconTailwind.vue"
import IconTS from "@/components/icons/IconTS.vue"
import IconVue from "@/components/icons/IconVue.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
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
        <li class="lg:flex gap-8 flex-row-reverse">
          <div class="shrink-0 relative aspect-video lg:aspect-square lg:h-full">
            <figure
              class="overflow-hidden relative isolate z-[1] hidden lg:block lg:aspect-square pointer-events-none h-full border border-neutral-900 rounded-xl"
            >
              <img
                class="absolute top-0 left-0"
                src="https://images.theodorusclarence.com/upload/q_auto,f_auto,c_fill,ar_1:1,w_1440/theodorusclarence/projects/seasforus/seasforus-banner-square.png"
              />
            </figure>
          </div>
          <div
            class="grow p-6 lg:p-8 border-neutral-900 border border-dashed rounded-xl rounded-t-none lg:rounded-t-xl"
          >
            <h3 class="text-4xl text-neutral-300 font-semibold">CabinFy</h3>
            <p class="mt-6 text-neutral-400">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, consequuntur?
            </p>
            <div class="flex items-center gap-2 mt-6 text-neutral-400">
              <p class="text-sm">Tools:</p>
              <ul class="flex items-center gap-2 text-xl text-gray-200">
                <li>
                  <IconWithTooltip tooltip="Next.js">
                    <IconNextJs />
                  </IconWithTooltip>
                </li>
                <li>
                  <IconTailwind />
                </li>
                <li>
                  <IconGo />
                </li>
                <li>
                  <IconNode />
                </li>
                <li>
                  <IconReact />
                </li>
                <li>
                  <IconMongo />
                </li>
                <li>
                  <IconPostgres />
                </li>
                <li>
                  <IconExpress />
                </li>
                <li>
                  <IconDocker />
                </li>
                <li>
                  <IconCaddy />
                </li>
                <li>
                  <IconClerk />
                </li>
                <li>
                  <IconPrisma />
                </li>
                <li>
                  <IconTS />
                </li>
                <li>
                  <IconRedux />
                </li>
                <li>
                  <IconAndroid />
                </li>
                <li>
                  <IconApple />
                </li>
                <li>
                  <IconVue />
                </li>
              </ul>
            </div>
            <div class="w-full flex flex-wrap justify-between gap-4 items-center mt-10">
              <a
                class="relative group px-4 py-3 rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300"
              >
                <span class="font-semibold"> View Project </span>
                <ChevronRight :stroke-width="2" :size="20" />
              </a>
              <div class="flex items-center gap-6">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-neutral-400 h-10 flex gap-2 items-center hover:text-accent text-xs hover:underline decoration-white underline-offset-4 cursor-newtab"
                >
                  <div class="">
                    <IconGithub />
                  </div>
                  <span class="text-neutral-200">Repository</span>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-neutral-400 h-10 flex gap-2 items-center hover:text-accent text-xs hover:underline decoration-white underline-offset-4 cursor-newtab"
                >
                  <div class="">
                    <IconLink />
                  </div>
                  <span class="text-neutral-200">Open Website</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
