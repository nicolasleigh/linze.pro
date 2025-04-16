<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
  class: String,
})

const style =
  "flex items-center px-2 py-1 text-xs bg-neutral-800 text-neutral-400 rounded-md capitalize"

const mergedStyle = computed(() => [style, props.class])
</script>

<template>
  <span :class="mergedStyle">
    <slot></slot>
  </span>
</template>
