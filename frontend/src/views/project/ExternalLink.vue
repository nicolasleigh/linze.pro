<script setup lang="ts">
defineProps({
  href: String,
})
</script>

<template>
  <a
    :href="href"
    target="_blank"
    referrerpolicy="no-referrer"
    class="cursor-newtab hover:underline text-neutral-300"
  >
    <slot></slot>
  </a>
</template>
