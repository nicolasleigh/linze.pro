<script setup lang="ts">
import IconCaddy from "@/components/icons/IconCaddy.vue"
import IconDocker from "@/components/icons/IconDocker.vue"
import IconExpress from "@/components/icons/IconExpress.vue"
import IconMongo from "@/components/icons/IconMongo.vue"
import IconNode from "@/components/icons/IconNode.vue"
import IconReact from "@/components/icons/IconReact.vue"
import IconRedux from "@/components/icons/IconRedux.vue"
import IconTailwind from "@/components/icons/IconTailwind.vue"
import IconTS from "@/components/icons/IconTS.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
import IconI18next from "../icons/IconI18next.vue"
import IconSocketIO from "../icons/IconSocketIO.vue"
</script>

<template>
  <li class="flex items-center">
    <IconWithTooltip tooltip="React">
      <IconReact />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="Redux">
      <IconRedux />
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
    <IconWithTooltip tooltip="Socket.IO">
      <IconSocketIO />
    </IconWithTooltip>
  </li>
</template>
