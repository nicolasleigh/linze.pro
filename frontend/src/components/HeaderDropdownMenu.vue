<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BookIcon,
  CheckIcon,
  ChevronDown,
  FolderIcon,
  HomeIcon,
  LanguagesIcon,
  Loader2Icon,
  MessagesSquareIcon,
  UserIcon,
} from "lucide-vue-next"
import HeaderDropdownLink from "./HeaderDropdownLink.vue"
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useTranslation } from "i18next-vue"

const { i18next, t } = useTranslation()
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

const dropdownItemStyle =
  "focus:bg-neutral-950 p-3 rounded-xl bg-neutral-950/70 focus:text-neutral-100"
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        class="py-2 pl-4 pr-3 group text-neutral-300 hover:text-neutral-200 transition-colors flex items-center justify-center gap-1.5"
      >
        {{ t("header.dropdown.menu") }}
        <ChevronDown stroke-width="1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="w-56 bg-neutral-800/70 text-neutral-200 border-none p-3 rounded-xl min-w-80 flex flex-col gap-2 backdrop-blur-2xl"
      align="end"
    >
      <DropdownMenuItem :class="dropdownItemStyle">
        <HeaderDropdownLink
          :title="t('header.dropdown.home')"
          :subtitle="t('header.dropdown.home_sub')"
          to="/"
        >
          <HomeIcon />
        </HeaderDropdownLink>
      </DropdownMenuItem>

      <DropdownMenuItem :class="dropdownItemStyle">
        <HeaderDropdownLink
          :title="t('header.dropdown.projects')"
          :subtitle="t('header.dropdown.projects_sub')"
          to="/projects"
        >
          <FolderIcon />
        </HeaderDropdownLink>
      </DropdownMenuItem>

      <DropdownMenuItem :class="dropdownItemStyle">
        <HeaderDropdownLink
          :title="t('header.dropdown.posts')"
          :subtitle="t('header.dropdown.posts_sub')"
          to="/posts"
        >
          <BookIcon />
        </HeaderDropdownLink>
      </DropdownMenuItem>

      <DropdownMenuItem :class="dropdownItemStyle">
        <HeaderDropdownLink
          :title="t('header.dropdown.about')"
          :subtitle="t('header.dropdown.about_sub')"
          to="/about"
        >
          <UserIcon />
        </HeaderDropdownLink>
      </DropdownMenuItem>

      <DropdownMenuSeparator class="bg-neutral-700" />

      <DropdownMenuGroup class="flex gap-3 flex-col">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            :class="dropdownItemStyle"
            class="data-[state=open]:bg-neutral-950"
          >
            <div class="flex w-full items-start gap-3">
              <div
                class="mt-0.5 p-3 bg-neutral-900 text-neutral-300 rounded-xl [&>svg]:size-4 [&>svg]:stroke-1"
              >
                <LanguagesIcon />
              </div>
              <div class="grow">
                <div class="flex items-center gap-2 justify-between">
                  <p
                    class="text-base text-neutral-100 underline decoration-transparent transition-colors"
                  >
                    {{ t("header.dropdown.language") }}
                  </p>
                </div>
                <p class="text-neutral-400 mt-0.5">{{ t("header.dropdown.language_sub") }}</p>
              </div>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              class="bg-neutral-800/60 border-none text-neutral-200 hover:text-neutral-50 transition-colors mt-3 backdrop-blur-sm"
            >
              <DropdownMenuItem
                class="focus:bg-neutral-600 focus:text-neutral-100 flex items-center gap-3"
                @click="() => changeLanguage('zh')"
                :disabled="zh || loadingLanguage !== null"
              >
                <Loader2Icon v-if="loadingLanguage === 'zh'" class="animate-spin size-4" />
                <CheckIcon v-else-if="zh" />
                <div v-else class="size-4" />
                简体中文
              </DropdownMenuItem>
              <DropdownMenuItem
                class="focus:bg-neutral-600 focus:text-neutral-100 flex items-center gap-3"
                @click="() => changeLanguage('en')"
                :disabled="en || loadingLanguage !== null"
              >
                <Loader2Icon v-if="loadingLanguage === 'en'" class="animate-spin size-4" />
                <CheckIcon v-else-if="en" />
                <div v-else class="size-4" />
                English
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem :class="dropdownItemStyle">
          <HeaderDropdownLink
            :title="t('header.dropdown.messages')"
            :subtitle="t('header.dropdown.messages_sub')"
            to="/messages"
          >
            <MessagesSquareIcon />
          </HeaderDropdownLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
