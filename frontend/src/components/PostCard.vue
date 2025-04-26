<script setup lang="ts">
import { useRouter } from "vue-router"
import type { PostCardProps } from "@/types/post"
import { Calendar } from "lucide-vue-next"
import PostTag from "@/components/PostTag.vue"
import { dateFormat } from "@/utils/helper"

const props = defineProps<PostCardProps>()
const router = useRouter()

// const goToPost = () => {
//   router.push({ path: `/posts/${props.id}` })
// }
</script>

<template>
  <RouterLink
    :to="'/posts/' + props.id"
    class="w-full rounded-md transition duration-300 group cursor-pointer"
  >
    <div class="flex flex-col md:flex-row-reverse md:items-center gap-4 py-3 md:gap-6">
      <figure
        class="isolate z-[1] pointer-events-none overflow-hidden flex justify-center items-center md:max-w-44 md:w-full md:h-32"
      >
        <img v-if="photo" :src="photo" alt="cover photo" class="rounded-md" />
        <img v-else src="/default-cover-photo.webp" alt="cover photo" class="rounded-md" />
      </figure>
      <div class="w-full">
        <h3 class="text-lg mt-3 relative">
          <span
            class="bg-gradient-to-r font-semibold from-accent via-accent/60 to-accent box-decoration-clone group-hover:opacity-30 opacity-0 transition text-transparent"
            aria-hidden="true"
          >
            {{ title }}
          </span>
          <span class="absolute left-0 top-0 font-semibold text-white"> {{ title }} </span>
        </h3>
        <p class="b2 txt-secondary mt-1 text-neutral-300">
          {{ about }} Learning to code is like learning a new language. It requires patience, and
          persistence, and practice. Start with small projects and build.
        </p>
        <div class="flex justify-between mt-5">
          <div class="text-neutral-300 flex items-center justify-center gap-3 text-sm">
            <Calendar :size="15" color="hsl(var(--accent))" />
            {{ dateFormat(props.createdAt) }}
          </div>
          <div class="flex gap-2">
            <div v-for="(item, index) in tags" :key="index">
              <PostTag>
                {{ item }}
              </PostTag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
