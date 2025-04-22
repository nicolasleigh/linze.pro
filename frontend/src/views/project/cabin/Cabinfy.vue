<script setup lang="ts">
import { useActiveSection } from "@/hooks/useActiveSection"
import Header from "../Header.vue"
import Article from "./en/Article.vue"
import Aside from "../Aside.vue"

const { activeSection } = useActiveSection()
</script>

<template>
  <section>
    <div class="layout pb-12 pt-[8.6rem] md:pb-20 md:pt-[9.6rem]">
      <Header
        title="CabinFy"
        about="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, eligendi?"
        :view="24"
        :like="12"
        video=""
        website="https://cabin.linze.pro"
        repo="https://github.com/nicolasleigh/cabinfy"
      />
      <section class="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr),250px] lg:gap-8">
        <Article />
        <Aside :activeSection="activeSection || ''" />
      </section>
    </div>
  </section>
</template>
