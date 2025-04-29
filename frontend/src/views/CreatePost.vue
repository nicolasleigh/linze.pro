<script setup lang="ts">
import { ref } from "vue"
import Editor from "@/components/Editor.vue"
import InputTags from "@/components/InputTags.vue"
import Button from "@/components/ui/button/Button.vue"
import { Label } from "@/components/ui/label"
import { toast } from "vue-sonner"
import { useCreatePost } from "@/hooks/useCreatePost"
import Input from "@/components/ui/input/Input.vue"
import { NotebookPen } from "lucide-vue-next"
import { generatePostSlug } from "@/utils/helper"

const titleEn = ref("")
const titleZh = ref("")
const aboutEn = ref("")
const aboutZh = ref("")
const contentEn = ref("")
const contentZh = ref("")
const tags = ref<string[]>([])
const photo = ref<File>()

const { createPost, isPending } = useCreatePost()

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
  if (!photo.value) {
    return toast.error("Please select cover photo")
  }
  const slug = generatePostSlug(titleEn.value)
  createPost({
    slug: slug,
    titleEn: titleEn.value,
    titleZh: titleZh.value,
    contentEn: contentEn.value,
    contentZh: contentZh.value,
    aboutEn: aboutEn.value,
    aboutZh: aboutZh.value,
    tags: tags.value,
    photo: photo.value,
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
          <NotebookPen class="text-accent" :size="20" :stroke-width="1" />
        </div>
        <h1 class="mt-4 text-6xl">
          <span class="text-neutral-300 font-semibold"> Create </span>
          <span
            class="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
            >Post</span
          >
        </h1>
        <p class="mt-3">
          <span
            class="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, animi?
          </span>
        </p>
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
            <Editor @update:model-value="handleEnglishContentUpdate" />
          </div>

          <div :class="wrapperStyle">
            <Label>Content – 中文</Label>
            <Editor @update:model-value="handleChineseContentUpdate" />
          </div>

          <div class="mt-2">
            <Button
              class="w-56 hover:bg-neutral-700 bg-neutral-900 border border-neutral-800 text-neutral-400 transition-colors"
              @click="handleSubmit"
              >Publish Blog Post</Button
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
