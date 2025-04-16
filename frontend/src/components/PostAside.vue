<script setup lang="ts">
import { useTags } from "@/hooks/useTags"
import PostTag from "./PostTag.vue"
import { computed, ref, watch } from "vue"

const { tagString } = useTags()

const tags = computed(() => tagString.value?.split(","))
</script>

<template>
  <aside class="mt-8 md:sticky md:top-16 md:h-fit md:self-start text-white text-sm">
    <p>Choose Tag</p>
    <div class="flex flex-wrap mt-4">
      <PostTag
        v-for="(item, index) in tags"
        :key="index"
        class="cursor-pointer hover:text-white transition-colors duration-300 m-1"
      >
        {{ item }}
      </PostTag>
    </div>
  </aside>
</template>
