<script setup lang="ts">
import { ref, watch } from "vue"
import Editor from "@/components/Editor.vue"
import InputTags from "@/components/InputTags.vue"
import Button from "@/components/ui/button/Button.vue"
import { Label } from "@/components/ui/label"
import { toast } from "vue-sonner"
import { useCreatePost } from "@/hooks/useCreatePost"
import Input from "@/components/ui/input/Input.vue"
import { FilePenLine, NotebookPen } from "lucide-vue-next"
import { usePost } from "@/hooks/usePost"
import { useUpdatePost } from "@/hooks/useUpdatePost"
import { useRoute } from "vue-router"
import { usePostForEdit } from "@/hooks/usePostForUpdate"

const { post, isLoading } = usePostForEdit()
const route = useRoute()

const titleEn = ref(post.value?.titleEn || "")
const titleZh = ref(post.value?.titleZh || "")
const aboutEn = ref(post.value?.aboutEn || "")
const aboutZh = ref(post.value?.aboutZh || "")
const contentEn = ref(post.value?.contentEn || "")
const contentZh = ref(post.value?.contentZh || "")
const tags = ref<string[]>(post.value?.tags || [])
const photo = ref<File>()

watch(
  () => post.value,
  (newVal) => {
    titleEn.value = newVal?.titleEn || ""
    titleZh.value = newVal?.titleZh || ""
    aboutEn.value = newVal?.aboutEn || ""
    aboutZh.value = newVal?.aboutZh || ""
    contentEn.value = newVal?.contentEn || ""
    contentZh.value = newVal?.contentZh || ""
    tags.value = newVal?.tags || []
  },
)

const { updatePost, isPending } = useUpdatePost()

const handleUpdateTags = (data: string[]) => {
  tags.value = data
}

const handleCoverPhoto = (e: Event) => {
  e.preventDefault()
  const target = e.target as HTMLInputElement
  if (target.files) {
    photo.value = target.files[0]
  }
}

const handleEnglishContentUpdate = (value: string) => {
  contentEn.value = value
}

const handleChineseContentUpdate = (value: string) => {
  contentZh.value = value
}

const handleSubmit = () => {
  if (!titleEn.value.trim()) {
    return toast.error("Please enter English title")
  }
  if (!titleZh.value.trim()) {
    return toast.error("Please enter Chinese title")
  }
  if (!aboutEn.value.trim()) {
    return toast.error("Please enter English about")
  }
  if (!aboutZh.value.trim()) {
    return toast.error("Please enter Chinese about")
  }
  if (!contentEn.value.trim()) {
    return toast.error("Please enter English content")
  }
  if (!contentZh.value.trim()) {
    return toast.error("Please enter Chinese content")
  }
  if (tags.value.length === 0) {
    return toast.error("Please enter tags")
  }
  // console.log(contentEn.value)
  updatePost({
    slug: route.params.slug as string,
    post: {
      titleEn: titleEn.value,
      titleZh: titleZh.value,
      aboutEn: aboutEn.value,
      aboutZh: aboutZh.value,
      contentEn: contentEn.value,
      contentZh: contentZh.value,
      tags: tags.value,
    },
  })
}

const wrapperStyle = "flex flex-col gap-2"
const gridWrapperStyle = "grid gap-2 grid-cols-1 sm:grid-cols-2"
const inputStyle =
  "border border-neutral-800 rounded-md p-2 focus:outline-none focus:border-neutral-600 bg-neutral-950"
</script>

<template>
  <section class="relative">
    <div class="relative">
      <div
        class="layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center"
      >
        <div
          class="size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm"
        >
          <FilePenLine class="text-accent" :size="20" :stroke-width="1" />
        </div>
        <h1 class="mt-4 text-6xl">
          <span class="text-neutral-300 font-semibold"> Edit </span>
          <span
            class="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
            >Posts</span
          >
        </h1>
      </div>
    </div>

    <div class="border-t border-neutral-900 bg-black pt-20">
      <div class="layout">
        <div class="flex flex-col gap-6 text-neutral-100">
          <div :class="gridWrapperStyle">
            <div :class="wrapperStyle">
              <Label for="titleEn">Title – English</Label>
              <input id="titleEn" :class="inputStyle" v-model="titleEn" />
            </div>
            <div :class="wrapperStyle">
              <Label for="titleZh">Title – 中文</Label>
              <input id="titleZh" :class="inputStyle" v-model="titleZh" />
            </div>
          </div>

          <div :class="gridWrapperStyle">
            <div :class="wrapperStyle">
              <Label for="aboutEn">About – English</Label>
              <textarea id="aboutEn" :class="inputStyle" v-model="aboutEn" />
            </div>
            <div :class="wrapperStyle">
              <Label for="aboutZh">About – 中文</Label>
              <textarea id="aboutZh" :class="inputStyle" v-model="aboutZh" />
            </div>
          </div>

          <div :class="gridWrapperStyle">
            <div :class="wrapperStyle">
              <Label for="tags">Tags</Label>
              <InputTags :tags="tags" @update="handleUpdateTags" :style="inputStyle" />
            </div>
            <div :class="wrapperStyle">
              <Label for="photo">Cover Photo</Label>
              <Input
                id="photo"
                class="shadow-none pl-1 h-11 text-base text-muted-foreground file:hidden"
                :class="inputStyle"
                accept="image/*"
                placeholder="Click"
                type="file"
                ref="photo"
                @input="handleCoverPhoto"
              />
            </div>
          </div>

          <div :class="wrapperStyle">
            <Label>Content – English</Label>
            <Editor @update:model-value="handleEnglishContentUpdate" :initialContent="contentEn" />
          </div>

          <div :class="wrapperStyle">
            <Label>Content – 中文</Label>
            <Editor @update:model-value="handleChineseContentUpdate" :initialContent="contentZh" />
          </div>

          <div class="mt-2">
            <Button
              class="w-56 hover:bg-neutral-700 bg-neutral-900 border border-neutral-800 text-neutral-400 transition-colors"
              @click="handleSubmit"
              >Update Blog Post</Button
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
