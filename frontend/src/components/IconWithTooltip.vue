<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const props = defineProps({
  tooltip: String,
})
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <Tooltip>
      <TooltipTrigger class="cursor-default">
        <slot></slot>
      </TooltipTrigger>
      <TooltipContent class="bg-neutral-700">
        <p class="text-base">{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
