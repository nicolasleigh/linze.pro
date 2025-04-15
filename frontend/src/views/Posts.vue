<script setup lang="ts">
import PostCard from "@/components/PostCard.vue"
import { usePosts } from "@/hooks/usePosts"

const { posts, error, isLoading } = usePosts()
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="(item, index) in posts" :key="index">
      <PostCard
        :id="item.id"
        :title="item.title"
        :content="item.content"
        :createdAt="item.created_at"
        :updatedAt="item.updated_at"
        :username="item.user.username"
        :userEmail="item.user.email"
      />
    </div>
  </div>
</template>
