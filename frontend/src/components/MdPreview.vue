<template>
  <div v-if="isLoading">Loading...</div>
  <MdPreview v-else id="preview-only" v-model="post.content" />
</template>

<script setup lang="ts">
import { usePost } from "@/hooks/usePost"
import { MdPreview } from "md-editor-v3"
import "md-editor-v3/lib/preview.css"

const { post, isLoading } = usePost()
</script>
