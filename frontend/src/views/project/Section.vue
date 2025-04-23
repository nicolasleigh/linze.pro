<script setup lang="ts">
defineProps({
  id: String,
})
</script>

<template>
  <section data-section :id="id">
    <slot></slot>
  </section>
</template>
