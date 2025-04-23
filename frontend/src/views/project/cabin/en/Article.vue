<script setup lang="ts">
import Section from "../../Section.vue"
const sectionTitle = [
  "Short Explanation",
  "Project Goals",
  "Tech Stack Used",
  "App Demo and Screenshots",
  "The Problems and How I Deal With It",
  "Lessons Learned",
]
const sectionSlug = sectionTitle.map((e, i) => e.trim().toLowerCase().split(" ").join("-"))
const section = sectionTitle.map((e, i) => ({ title: e, slug: sectionSlug[i] }))

defineExpose({ section })
</script>

<template>
  <article class="mx-auto w-full transition-colors text-neutral-400">
    <div>
      <Section :id="section[0].slug">
        <h2>
          {{ section[0].title }}
        </h2>
        Section 1 scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn ionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn ionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnnscetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn</Section
      >

      <Section :id="section[1].slug">
        <h2>
          {{ section[1].title }}
        </h2>
        Section 2 scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn ionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn ionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnnscetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn
      </Section>
      <Section data-section :id="section[2].slug">
        <h2>
          {{ section[2].title }}
        </h2>
        Section 3 scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn ionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn ionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn scetionnnn scetionnnn scetionnnnscetionnnn scetionnnn
        scetionnnn scetionnnn scetionnnn
      </Section>
    </div>
  </article>
</template>
