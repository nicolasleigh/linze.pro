<script setup lang="ts">
import IconMongo from "@/components/icons/IconMongo.vue"
import IconNode from "@/components/icons/IconNode.vue"
import IconReact from "@/components/icons/IconReact.vue"
import IconTailwind from "@/components/icons/IconTailwind.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
import IconI18next from "../icons/IconI18next.vue"
</script>

<template>
  <li class="flex items-center">
    <IconWithTooltip tooltip="React">
      <IconReact />
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
    <IconWithTooltip tooltip="MongoDB">
      <IconMongo />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="I18Next"><IconI18next /></IconWithTooltip>
  </li>
</template>
