<script setup lang="ts">
import IconGo from "@/components/icons/IconGo.vue"
import IconNextJs from "@/components/icons/IconNextJs.vue"
import IconPostgres from "@/components/icons/IconPostgres.vue"
import IconTailwind from "@/components/icons/IconTailwind.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
</script>

<template>
  <li class="flex items-center">
    <IconWithTooltip tooltip="Next.js">
      <IconNextJs />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="Go">
      <IconGo />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="Tailwind CSS">
      <IconTailwind />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="PostgreSQL">
      <IconPostgres />
    </IconWithTooltip>
  </li>
</template>
