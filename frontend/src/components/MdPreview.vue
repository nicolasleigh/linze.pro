<script setup lang="ts">
import { usePost } from "@/hooks/usePost"
import type { Post } from "@/types/post"
import { MdPreview } from "md-editor-v3"
import "md-editor-v3/lib/preview.css"

defineProps({
  isLoading: Boolean,
  post: Object as () => Post,
})
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="!post">No Content</div>
  <MdPreview v-else id="preview-only" v-model="post.content" theme="dark" preview-theme="github" />
</template>
