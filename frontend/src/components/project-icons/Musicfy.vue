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
import IconReactQuery from "../icons/IconReactQuery.vue"
</script>

<template>
  <li class="flex items-center">
    <IconWithTooltip tooltip="Android">
      <IconAndroid />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="iOS">
      <IconApple />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="React Native">
      <IconReact />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="React Query">
      <IconReactQuery />
    </IconWithTooltip>
  </li>
  <li class="flex items-center">
    <IconWithTooltip tooltip="Redux">
      <IconRedux />
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
    <IconWithTooltip tooltip="MongoDB">
      <IconMongo />
    </IconWithTooltip>
  </li>
</template>
