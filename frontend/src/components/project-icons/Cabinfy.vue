<script setup lang="ts">
import IconNode from "@/components/icons/IconNode.vue"
import IconPostgres from "@/components/icons/IconPostgres.vue"
import IconPrisma from "@/components/icons/IconPrisma.vue"
import IconReact from "@/components/icons/IconReact.vue"
import IconTailwind from "@/components/icons/IconTailwind.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
import IconReactQuery from "../icons/IconReactQuery.vue"
</script>

<template>
  <li class="flex items-center">
    <IconWithTooltip tooltip="React">
      <IconReact />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="React Query">
      <IconReactQuery />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="Tailwind CSS">
      <IconTailwind />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="Node.js">
      <IconNode />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="PostgreSQL">
      <IconPostgres />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="Prisma">
      <IconPrisma />
    </IconWithTooltip>
  </li>
</template>
