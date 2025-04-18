<script setup lang="ts">
import { usePost } from "@/hooks/usePost"
import { MdPreview } from "md-editor-v3"
import "md-editor-v3/lib/preview.css"

// const props = defineProps({
//   id: String,
// })

const { post, isLoading } = usePost()
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="!post">No Content</div>
  <MdPreview v-else id="preview-only" v-model="post.content" theme="dark" preview-theme="github" />
</template>
