<script setup lang="ts">
import { useRouter } from "vue-router"
import type { PostCardProps } from "@/types/post"
import { Calendar, Eye, Heart } from "lucide-vue-next"
import PostTag from "@/components/PostTag.vue"
import { dateFormat } from "@/utils/helper"
import { useTranslation } from "i18next-vue"

const props = defineProps<PostCardProps>()
const { t } = useTranslation()
const router = useRouter()

// const goToPost = () => {
//   router.push({ path: `/posts/${props.id}` })
// }
</script>

<template>
  <RouterLink
    :to="'/posts/' + slug"
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
        <div class="flex items-center gap-3">
          <p class="text-neutral-400 text-sm flex items-center justify-center gap-3">
            {{ dateFormat(props.createdAt) }}
          </p>
        </div>

        <!-- <div class="flex gap-2">
          <div v-for="(item, index) in tags" :key="index">
            <PostTag>
              {{ item }}
            </PostTag>
          </div>
        </div> -->
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
          {{ about }}
        </p>
        <div class="flex justify-between mt-5">
          <div class="flex gap-5">
            <!-- <div class="text-neutral-300 flex items-center justify-center gap-3 text-xs">
              <Calendar :size="15" class="text-accent" />
              {{ dateFormat(props.createdAt) }}
            </div> -->
            <div class="text-neutral-300 flex items-center justify-center gap-2 text-xs">
              <Eye :size="15" class="text-accent" />
              <p class="">{{ view }} {{ t("posts.view") }}</p>
            </div>
            <div class="text-neutral-300 flex items-center justify-center gap-2 text-xs">
              <Heart :size="15" class="text-accent" />
              <p class="">{{ like }} {{ t("posts.like") }}</p>
            </div>
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
