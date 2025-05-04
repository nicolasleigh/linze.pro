<script setup lang="ts">
import IconGoogle from "@/components/icons/IconGoogle.vue"
import IconQQ from "@/components/icons/IconQQ.vue"
import IconGitHub2 from "@/components/icons/IconGithub2.vue"
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <a target="_blank" referrerpolicy="no-referrer" href="mailto:linze201@gmail.com">
        <IconGoogle class="size-5 hover:text-accent" />
      </a>
      <span>linze201@gmail.com</span>
    </div>
    <div class="flex items-center gap-2">
      <a target="_blank" referrerpolicy="no-referrer" href="mailto:nicolas.leigh@qq.com">
        <IconQQ class="size-5 hover:text-accent" />
      </a>
      <span>nicolas.leigh@qq.com</span>
    </div>
    <div class="flex items-center gap-2">
      <a target="_blank" referrerpolicy="no-referrer" href="https://github.com/nicolasleigh">
        <IconGitHub2 class="size-5 hover:text-accent" />
      </a>
      <a>github.com/nicolasleigh</a>
    </div>
  </div>
</template>
