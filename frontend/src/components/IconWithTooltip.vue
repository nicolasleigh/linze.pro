<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

defineProps({
  tooltip: String,
})
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <Tooltip>
      <TooltipTrigger class="cursor-default">
        <slot></slot>
      </TooltipTrigger>
      <TooltipContent class="bg-neutral-900 py-1 px-2 border">
        <p class="text-xs font-semibold">{{ tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
