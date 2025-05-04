<script setup lang="ts">
import { useTranslation } from "i18next-vue"
import { Heart } from "lucide-vue-next"

defineProps<{
  isLiked: boolean
  handleLike?: () => void
}>()

const { t } = useTranslation()
</script>

<template>
  <button
    @click="handleLike"
    class="relative group px-4 py-3 rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
    :disabled="isLiked"
  >
    <span v-if="isLiked" class="font-semibold"> {{ t("posts.liked_button") }} </span>
    <span v-else class="font-semibold"> {{ t("posts.like_button") }} </span>
    <Heart :stroke-width="2" :size="20" :class="isLiked ? 'text-red-600' : ''" />
  </button>
</template>
