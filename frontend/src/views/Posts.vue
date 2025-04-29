<script setup lang="ts">
import PostAside from "@/components/PostAside.vue"
import PostCard from "@/components/PostCard.vue"
import { usePosts } from "@/hooks/usePosts"
import { usePostsByTag } from "@/hooks/usePostsByTag"
import { useTranslation } from "i18next-vue"
import { Book } from "lucide-vue-next"
import { computed, ref, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const tag = ref(route.query.tag)
const page = Number(route.query.page) || 1
const { posts: allPosts, error, isLoading } = usePosts(page)
const { posts: postsByTag, refetch } = usePostsByTag(page, tag)
const { t, i18next } = useTranslation()

const resultPost = computed(() => {
  return tag.value && postsByTag.value?.length ? postsByTag.value : allPosts.value
})

const currentLanguage = ref<string | null>(null)

watch(
  () => i18next.language,
  (newLang) => {
    currentLanguage.value = newLang
  },
  { immediate: true },
)

watch(
  () => route.query.tag,
  (newTag) => {
    tag.value = newTag
    refetch()
  },
)
</script>

<template>
  <section class="relative overflow-x-clip">
    <div class="relative">
      <div
        class="layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center"
      >
        <div
          class="size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm"
        >
          <Book class="text-accent" :size="20" :stroke-width="1" />
        </div>
        <h1 class="mt-4 text-6xl">
          <span class="text-neutral-300 font-semibold mr-3"> {{ t("posts.full_stack") }} </span>
          <span
            class="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
            >{{ t("posts.posts") }}</span
          >
        </h1>
        <p class="mt-3">
          <span
            class="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent"
          >
            {{ t("posts.about") }}
          </span>
        </p>
      </div>
    </div>
    <div class="border-t border-neutral-900 bg-black">
      <div class="layout">
        <div
          class="grid md:grid-cols-[1fr,18rem] md:gap-8 md:[&>aside]:order-1 min-h-[calc(100vh-28rem)]"
        >
          <PostAside />

          <ul class="md:border-r border-neutral-900 md:pr-8 grid gap-8 py-6">
            <li
              v-for="(item, index) in resultPost"
              :key="index"
              class="w-full rounded-md @container/blog-card transition duration-100 group"
            >
              <PostCard
                v-if="currentLanguage === 'zh'"
                :slug="item.slug"
                :title="item.titleZh"
                :about="item.aboutZh"
                :photo="item.photo"
                :tags="item.tags"
                :createdAt="item.created_at"
              />
              <PostCard
                v-else
                :slug="item.slug"
                :title="item.titleEn"
                :about="item.aboutEn"
                :photo="item.photo"
                :tags="item.tags"
                :createdAt="item.created_at"
              />
              <hr class="border-dashed border-neutral-900 mt-8 group-last-of-type:hidden" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
