<script setup lang="ts">
import IconCaddy from "@/components/icons/IconCaddy.vue"
import IconClerk from "@/components/icons/IconClerk.vue"
import IconDocker from "@/components/icons/IconDocker.vue"
import IconGo from "@/components/icons/IconGo.vue"
import IconNextJs from "@/components/icons/IconNextJs.vue"
import IconPostgres from "@/components/icons/IconPostgres.vue"
import IconTailwind from "@/components/icons/IconTailwind.vue"
import IconTS from "@/components/icons/IconTS.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
import IconI18next from "../icons/IconI18next.vue"
</script>

<template>
  <li>
    <IconWithTooltip tooltip="Typescript">
      <IconTS />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="Go">
      <IconGo />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="Next.js">
      <IconNextJs />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="Tailwind CSS">
      <IconTailwind />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="PostgreSQL">
      <IconPostgres />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="Clerk">
      <IconClerk />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="I18Next"><IconI18next /></IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="Docker">
      <IconDocker />
    </IconWithTooltip>
  </li>
</template>
