<script setup lang="ts">
import IconCaddy from "@/components/icons/IconCaddy.vue"
import IconDocker from "@/components/icons/IconDocker.vue"
import IconExpress from "@/components/icons/IconExpress.vue"
import IconMongo from "@/components/icons/IconMongo.vue"
import IconNode from "@/components/icons/IconNode.vue"
import IconReact from "@/components/icons/IconReact.vue"
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
    <IconWithTooltip tooltip="React">
      <IconReact />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="Tailwind CSS">
      <IconTailwind />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="Node.js">
      <IconNode />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="Express">
      <IconExpress />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="MongoDB">
      <IconMongo />
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
