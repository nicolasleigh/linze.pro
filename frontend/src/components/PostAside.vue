<script setup lang="ts">
import { useTags } from "@/hooks/useTags"
import PostTag from "./PostTag.vue"
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"

const { tagString } = useTags()
const router = useRouter()
const route = useRoute()
const tags = computed(() => tagString.value?.split(","))
const handleClick = (item: string) => {
  router.push({ query: { tag: item } })
  if (item === route.query.tag) {
    router.replace({ query: undefined })
  }
}
</script>

<template>
  <aside class="mt-8 md:sticky md:top-16 md:h-fit md:self-start text-white text-sm">
    <p>Choose Tag</p>
    <div class="flex flex-wrap mt-4">
      <PostTag
        v-for="(tag, index) in tags"
        :key="index"
        class="cursor-pointer hover:text-white transition-colors duration-300 m-1"
        :class="route.query.tag === tag ? 'text-accent bg-accent/30 hover:text-accent' : ''"
        @click="handleClick(tag)"
      >
        {{ tag }}
      </PostTag>
    </div>
  </aside>
</template>
