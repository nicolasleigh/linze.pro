<script setup lang="ts">
import IconCaddy from "@/components/icons/IconCaddy.vue"
import IconDocker from "@/components/icons/IconDocker.vue"
import IconExpress from "@/components/icons/IconExpress.vue"
import IconNode from "@/components/icons/IconNode.vue"
import IconPostgres from "@/components/icons/IconPostgres.vue"
import IconPrisma from "@/components/icons/IconPrisma.vue"
import IconReact from "@/components/icons/IconReact.vue"
import IconTailwind from "@/components/icons/IconTailwind.vue"
import IconTS from "@/components/icons/IconTS.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
import IconI18next from "../icons/IconI18next.vue"
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
    <IconWithTooltip tooltip="Express">
      <IconExpress />
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
  <li class="flex items-center">
    <IconWithTooltip tooltip="I18Next"><IconI18next /></IconWithTooltip>
  </li>
</template>
