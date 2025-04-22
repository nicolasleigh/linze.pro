<script setup lang="ts">
import IconAndroid from "@/components/icons/IconAndroid.vue"
import IconApple from "@/components/icons/IconApple.vue"
import IconCaddy from "@/components/icons/IconCaddy.vue"
import IconDocker from "@/components/icons/IconDocker.vue"
import IconExpress from "@/components/icons/IconExpress.vue"
import IconMongo from "@/components/icons/IconMongo.vue"
import IconNode from "@/components/icons/IconNode.vue"
import IconReact from "@/components/icons/IconReact.vue"
import IconRedux from "@/components/icons/IconRedux.vue"
import IconTS from "@/components/icons/IconTS.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
</script>

<template>
  <li>
    <IconWithTooltip tooltip="Typescript">
      <IconTS />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="Android">
      <IconAndroid />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="iOS">
      <IconApple />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="React Native">
      <IconReact />
    </IconWithTooltip>
  </li>
  <li>
    <IconWithTooltip tooltip="Redux">
      <IconRedux />
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
    <IconWithTooltip tooltip="Docker">
      <IconDocker />
    </IconWithTooltip>
  </li>
</template>
