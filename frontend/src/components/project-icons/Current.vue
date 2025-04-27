<script setup lang="ts">
import IconCaddy from "@/components/icons/IconCaddy.vue"
import IconDocker from "@/components/icons/IconDocker.vue"
import IconGo from "@/components/icons/IconGo.vue"
import IconPostgres from "@/components/icons/IconPostgres.vue"
import IconTailwind from "@/components/icons/IconTailwind.vue"
import IconTS from "@/components/icons/IconTS.vue"
import IconVue from "@/components/icons/IconVue.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
import IconI18next from "../icons/IconI18next.vue"
</script>

<template>
  <li class="flex items-center">
    <IconWithTooltip tooltip="Vue"><IconVue /></IconWithTooltip>
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
  <li class="flex items-center">
    <IconWithTooltip tooltip="I18Next"><IconI18next /></IconWithTooltip>
  </li>
</template>
