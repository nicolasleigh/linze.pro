<script setup lang="ts">
import { MdPreview } from "md-editor-v3"
import "md-editor-v3/lib/preview.css"
import { computed, ref } from "vue"

const props = defineProps({
  isLoading: Boolean,
  content: String,
})
const text = computed(() => props.content)
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="!content">No Content</div>
  <MdPreview v-else id="preview-only" v-model="text" theme="dark" preview-theme="github" />
</template>
