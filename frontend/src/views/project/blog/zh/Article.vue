<script setup lang="ts">
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import Section from "../../Section.vue"
import { h2Style } from "../../CommonStyle"
import { useActiveSection } from "@/hooks/useActiveSection"

const sectionTitle = [
  "Project Overview",
  "Motivation",
  "My Role",
  "Development Process",
  "Tech Stack",
  "Key Features",
  "Challenges & Solutions",
  "What I Learned",
  "Future Improvements",
  "Summary",
  "Live Demo & Source Code",
]

const { activeSection } = useActiveSection()
const section = getSectionTitleAndSlugChinese(sectionTitle)
defineExpose({ section, activeSection })
</script>

<template>
  <article class="mx-auto w-full transition-colors text-neutral-400">
    <div>
      <Section :id="section[0].slug">
        <h2 :class="h2Style">
          {{ section[0].title }}
        </h2>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
      </Section>
    </div>
  </article>
</template>
