<script setup lang="ts">
import { useTranslation } from "i18next-vue"
import { HomeIcon } from "lucide-vue-next"
import { useRoute } from "vue-router"

defineProps<{
  title: string
  subtitle: string
  to: string
}>()

const route = useRoute()
const { t } = useTranslation()
</script>

<template>
  <RouterLink :to="to" class="flex w-full items-start gap-3">
    <div
      class="mt-0.5 p-3 bg-neutral-900 text-neutral-300 rounded-xl [&>svg]:size-4 [&>svg]:stroke-1"
    >
      <slot></slot>
    </div>
    <div class="grow">
      <div class="flex items-center gap-2 justify-between">
        <p class="text-base text-neutral-100 underline decoration-transparent transition-colors">
          {{ title }}
        </p>
        <button
          v-if="route.path === to"
          class="text-xs bg-neutral-800/70 font-medium text-neutral-400 px-1.5 py-0.5 rounded-md"
          tabindex="-1"
        >
          {{ t("header.dropdown.current") }}
        </button>
      </div>
      <p class="c1 text-neutral-400 mt-0.5">{{ subtitle }}</p>
    </div>
  </RouterLink>
</template>
