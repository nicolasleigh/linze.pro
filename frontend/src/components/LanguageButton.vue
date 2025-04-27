<script lang="ts" setup>
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "i18next-vue"
import { Check, ChevronDown, Languages, Loader2 } from "lucide-vue-next"
import { computed, onMounted, onUnmounted, ref } from "vue"
import DropdownMenuItem from "./ui/dropdown-menu/DropdownMenuItem.vue"

const { i18next } = useTranslation()
const currentLanguage = ref(i18next.language)
const loadingLanguage = ref<string | null>(null)
const zh = computed(() => currentLanguage.value === "zh")
const en = computed(() => currentLanguage.value === "en")

function updateLanguage() {
  currentLanguage.value = i18next.language
  loadingLanguage.value = null
}

onMounted(() => {
  i18next.on("languageChanged", updateLanguage)
})

onUnmounted(() => {
  i18next.off("languageChanged", updateLanguage)
})

async function changeLanguage(lang: string) {
  if (currentLanguage.value !== lang) {
    loadingLanguage.value = lang
    try {
      await i18next.changeLanguage(lang)
    } catch (error) {
      console.error("Failed to change language", error)
      loadingLanguage.value = null
    }
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        class="bg-inherit hover:bg-inherit py-3 px-2 group font-rethink text-neutral-500 hover:text-neutral-400 transition-colors flex items-center justify-center gap-1.5"
      >
        <Languages class="mt-0.5 size-4 text-neutral-500 group-hover:text-neutral-400 transition" />
        <ChevronDown
          class="mt-0.5 size-4 text-neutral-500 group-hover:text-neutral-400 transition"
        />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="bg-neutral-800/60 border-none text-neutral-200 hover:text-neutral-50 transition-colors mt-3"
    >
      <DropdownMenuItem
        class="focus:bg-neutral-600 focus:text-neutral-100 flex items-center gap-3"
        @click="() => changeLanguage('zh')"
        :disabled="zh || loadingLanguage !== null"
      >
        <Loader2 v-if="loadingLanguage === 'zh'" class="animate-spin size-4" />
        <Check v-else-if="zh" />
        <div v-else class="size-4" />
        简体中文
      </DropdownMenuItem>

      <DropdownMenuItem
        class="focus:bg-neutral-600 focus:text-neutral-100 flex items-center gap-3"
        @click="() => changeLanguage('en')"
        :disabled="en || loadingLanguage !== null"
      >
        <Loader2 v-if="loadingLanguage === 'en'" class="animate-spin size-4" />
        <Check v-else-if="en" />
        <div v-else class="size-4" />
        English
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
