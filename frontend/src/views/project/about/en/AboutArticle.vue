<script setup lang="ts">
import { getSectionTitleAndSlug } from "@/utils/helper"
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
import AboutContact from "../AboutContact.vue"
import AboutTechStack from "../AboutTechStack.vue"

const sectionTitle = [
  "Background & Education",
  "Programming Journey",
  "Learning Journey",
  "Current Focus",
  "Tech Stack",
  "Contact",
]

const { activeSection } = useActiveSection()
const section = getSectionTitleAndSlug(sectionTitle)
defineExpose({ section, activeSection })
</script>

<template>
  <article class="mx-auto w-full transition-colors text-neutral-400">
    <div>
      <Section :id="section[0].slug">
        <h2 :class="h2Style">
          {{ section[0].title }}
        </h2>
        <p :class="paragraphStyle">
          I’m Nicolas Leigh (Li Linze) — a self-taught software developer with a background in
          economics and finance, now fully immersed in building modern full-stack web applications.
        </p>
        <ul :class="unorderedListStyle">
          <li>Born in July 1994, Yunnan Province, China</li>
          <li>
            Scored 617 in 2013 National College Entrance Exam (Ranked 1522 in Yunnan science track)
          </li>
          <li>Bachelor of Economics, Major in Public Finance (National Key Discipline)</li>
          <li>Graduated from Zhongnan University of Economics and Law (Project 211) in 2017</li>
          <li>Certified Public Accountant of China (Passed all 6 professional exams in 2020)</li>
          <li>Self-taught software developer since 2021</li>
        </ul>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          After working in financial auditing for a year, I realized that career path didn't align
          with my personal values and aspirations. In October 2021, during the COVID-19 pandemic, I
          began a new journey: learning to code.
        </p>
        <p :class="paragraphStyle">
          I started with C and Java, which laid a solid foundation for programming concepts and
          problem-solving. But everything changed when I discovered JavaScript — a language that
          felt intuitive, expressive, and creatively fulfilling. The immediate visual feedback and
          ability to build interactive web experiences drew me to frontend development.
        </p>
        <p :class="paragraphStyle">
          Later, I expanded into backend development using Go (Golang) and Node.js. This transition
          felt natural thanks to my experience with C and Java, while allowing me to leverage more
          efficient tooling and concurrency patterns. This full-stack approach has enabled me to
          build complete applications from interface to database.
        </p>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          As a self-taught developer, I’ve built my technical foundation primarily through
          English-language resources such as Udemy, Frontend Masters, and O’Reilly books. Learning
          in English has not only sharpened my programming skills but also strengthened my ability
          to navigate documentation and collaborate in global developer communities.
        </p>
        <p :class="paragraphStyle">
          Driven by curiosity, I’ve also taken on the challenge of learning French — and can now
          comfortably read A2-level content, using English as the medium. This multilingual learning
          experience has deepened my adaptability and problem-solving mindset.
        </p>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <p :class="paragraphStyle">
          Today, I build full-stack web applications using React, Vue.js, Node.js, and Go — with a
          strong emphasis on clean code, high performance, and exceptional user experience. I'm
          especially passionate about problem-solving and critical thinking, skills that stem from
          my background in financial auditing.
        </p>
        <p :class="paragraphStyle">
          Currently, I'm expanding my expertise in cloud-native architectures and working to
          integrate Kubernetes into my toolchain. At the same time, I continue refining my
          full-stack skills by refactoring and improving the projects I’ve built.
        </p>
        <p :class="paragraphStyle">
          I believe the best developers never stop learning — and I’m committed to growing through
          every challenge I take on.
        </p>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <AboutTechStack />
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <p :class="paragraphStyle">
          Whether you're interested in technical collaboration, have a job opportunity, or simply
          want to exchange ideas, I'd be delighted to connect.
        </p>
        <p :class="paragraphStyle">Contact me via:</p>
        <AboutContact />
        <p :class="paragraphStyle">Looking forward to hearing from you!</p>
      </Section>
    </div>
  </article>
</template>
