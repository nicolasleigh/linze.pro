<script setup lang="ts">
import { useTranslation } from "i18next-vue"
import { User, User2 } from "lucide-vue-next"
import {
  h2Style,
  h3Style,
  h4Style,
  h5Style,
  paragraphStyle,
  unorderedListStyle,
} from "./project/CommonStyle"

import AboutViewIcons from "@/components/icons/AboutViewIcons.vue"

const { t } = useTranslation()
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
        <h1 class="mt-4 text-6xl">
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
    <section class="text-neutral-400">
      <div
        class="layout relative pb-12 pt-10 md:pb-20 md:pt-10 flex items-center gap-20 flex-col md:flex-row"
      >
        <div class="w-full md:ml-14 max-w-[21rem] shrink-0"></div>
        <div>
          <p :class="paragraphStyle">
            Hello, I’m Nicolas Leigh (Li Linze) — a self-taught software developer with a background
            in economics and finance, now fully immersed in building modern web applications.
          </p>
          <h2 :class="h2Style">Educational Background</h2>
          <p :class="paragraphStyle">
            Born in July 1994 in Yunnan Province, China, I took the National College Entrance
            Examination in 2013 and scored 617 points, ranking 1522nd in the province’s science
            track. I went on to earn a Bachelor of Economics degree in Public Finance from Zhongnan
            University of Economics and Law, a prestigious Project 211 university where Public
            Finance is recognized as a National Key Discipline. I’m also a Certified Public
            Accountant (CPA) of China, having passed all six professional exams.
          </p>
          <h2 :class="h2Style">Programming Journey</h2>
          <p :class="paragraphStyle">
            After working in financial auditing for a year, I realized that career path didn’t align
            with my personal values or aspirations. In October 2021, during the COVID-19 pandemic, I
            began a new journey: learning to code.
          </p>
          <p :class="paragraphStyle">
            I started with C and Java, which laid a solid foundation for programming concepts and
            problem-solving. But everything changed when I discovered JavaScript — a language that
            felt intuitive, expressive, and creatively fulfilling. That’s when I knew I wanted to
            become a frontend developer. Later, I expanded into backend development using Go
            (Golang) and Node.js, which felt like a natural progression thanks to my experience with
            C and Java — but with a modern twist.
          </p>
          <h2 :class="h2Style">Learning Journey</h2>
          <p :class="paragraphStyle">
            As a self-taught developer, I’ve learned primarily through English-language resources on
            Udemy, Frontend Masters, and Educative.io. Learning in English has not only improved my
            programming skills but also strengthened my communication in a second language. I’ve
            even taken on the challenge of learning French, and I can now read A2-level content —
            all through English as the medium.
          </p>
          <h2 :class="h2Style">Current Focus</h2>
          <p :class="paragraphStyle">
            Today, I build full-stack web applications with a focus on clean code, performance, and
            great user experience. I care deeply about craftsmanship, clarity, and continuous
            learning. My projects reflect not only what I can do technically, but also the story of
            how I’ve grown — from a finance professional to a passionate software developer.
          </p>
          <h2 :class="h2Style">Tech Stack</h2>
          <p :class="paragraphStyle">My primary technologies include:</p>
          <AboutViewIcons />

          <h2 :class="h2Style">Contact</h2>
          <p :class="paragraphStyle">
            Whether you're interested in technical collaboration, have a job opportunity, or simply
            want to exchange ideas, I'd be delighted to connect.
          </p>
          <h4 :class="h4Style">Contact me via:</h4>
          <ul :class="unorderedListStyle">
            <li>
              Email:
              <ul :class="unorderedListStyle">
                <li>QQ Mail: nicolas.leigh@qq.com</li>
                <li>Gmail: linze201@gmail.com</li>
              </ul>
            </li>
            <li>GitHub: <a href="https://github.com/nicolasleigh">github.com/nicolasleigh</a></li>
          </ul>
          <p :class="paragraphStyle">Looking forward to hearing from you!</p>
        </div>
      </div>
    </section>
  </main>
</template>
