<script setup lang="ts">
defineProps({
  id: String,
})
</script>

<template>
  <section data-section :id="id" class="mb-10">
    <slot></slot>
  </section>
</template>
