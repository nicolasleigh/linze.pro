<script setup lang="ts">
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import {
  h2Style,
  h3Style,
  h4Style,
  orderedListStyle,
  paragraphStyle,
  unorderedListStyle,
} from "../../CommonStyle"
import Section from "../../Section.vue"
import { useActiveSection } from "@/hooks/useActiveSection"
import AboutViewIcons from "@/components/icons/AboutViewIcons.vue"

const sectionTitle = ["教育背景", "编程旅程", "学习旅程", "当前专注", "技术栈", "联系"]

const { activeSection } = useActiveSection()
const section = getSectionTitleAndSlugChinese(sectionTitle)
defineExpose({ section, activeSection })
</script>

<template>
  <article class="mx-auto w-full transition-colors text-neutral-400">
    <div>
      <p :class="paragraphStyle">
        Hello, I’m Nicolas Leigh (Li Linze) — a self-taught software developer with a background in
        economics and finance, now fully immersed in building modern web applications.
      </p>
      <Section :id="section[0].slug">
        <h2 :class="h2Style">
          {{ section[0].title }}
        </h2>
        <p :class="paragraphStyle">
          Born in July 1994 in Yunnan Province, China, I took the National College Entrance
          Examination in 2013 and scored 617 points, ranking 1522nd in the province’s science track.
          I went on to earn a Bachelor of Economics degree in Public Finance from Zhongnan
          University of Economics and Law, a prestigious Project 211 university where Public Finance
          is recognized as a National Key Discipline. I’m also a Certified Public Accountant (CPA)
          of China, having passed all six professional exams.
        </p>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          After working in financial auditing for a year, I realized that career path didn’t align
          with my personal values or aspirations. In October 2021, during the COVID-19 pandemic, I
          began a new journey: learning to code.
        </p>
        <p :class="paragraphStyle">
          I started with C and Java, which laid a solid foundation for programming concepts and
          problem-solving. But everything changed when I discovered JavaScript — a language that
          felt intuitive, expressive, and creatively fulfilling. That’s when I knew I wanted to
          become a frontend developer. Later, I expanded into backend development using Go (Golang)
          and Node.js, which felt like a natural progression thanks to my experience with C and Java
          — but with a modern twist.
        </p>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          As a self-taught developer, I’ve learned primarily through English-language resources on
          Udemy, Frontend Masters, and Educative.io. Learning in English has not only improved my
          programming skills but also strengthened my communication in a second language. I’ve even
          taken on the challenge of learning French, and I can now read A2-level content — all
          through English as the medium.
        </p>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <p :class="paragraphStyle">
          Today, I build full-stack web applications with a focus on clean code, performance, and
          great user experience. I care deeply about craftsmanship, clarity, and continuous
          learning. My projects reflect not only what I can do technically, but also the story of
          how I’ve grown — from a finance professional to a passionate software developer.
        </p>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <p :class="paragraphStyle">My primary technologies include:</p>
        <AboutViewIcons />
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
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
      </Section>
    </div>
  </article>
</template>
