<script setup lang="ts">
import PostAside from "@/components/PostAside.vue"
import PostCard from "@/components/PostCard.vue"
import { usePosts } from "@/hooks/usePosts"
import { usePostsByTag } from "@/hooks/usePostsByTag"
import { computed, ref, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const tag = ref(route.query.tag)
const page = Number(route.query.page) || 1
const { posts: allPosts, error, isLoading } = usePosts(page)
const { posts: postsByTag, refetch } = usePostsByTag(page, tag)

const resultPost = computed(() => {
  return tag.value && postsByTag.value?.length ? postsByTag.value : allPosts.value
})

watch(
  () => route.query.tag,
  (newTag) => {
    tag.value = newTag
    refetch()
  },
)
</script>

<template>
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
              :id="item.id"
              :title="item.title"
              :about="item.about"
              :photo="item.photo"
              :tags="item.tags"
              :content="item.content"
              :createdAt="item.created_at"
              :updatedAt="item.updated_at"
              :username="item.user.username"
              :userEmail="item.user.email"
            />
            <hr class="border-dashed border-neutral-900 mt-8 group-last-of-type:hidden" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
