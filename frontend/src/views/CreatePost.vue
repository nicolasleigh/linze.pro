<script setup lang="ts">
import { ref } from "vue"
import Editor from "@/components/Editor.vue"
import InputTags from "@/components/InputTags.vue"
import Button from "@/components/ui/button/Button.vue"
import { Label } from "@/components/ui/label"
import { toast } from "vue-sonner"
import { useCreatePost } from "@/hooks/useCreatePost"
import Input from "@/components/ui/input/Input.vue"

const title = ref("")
const about = ref("")
const content = ref("")
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

const handleEditorUpdate = (value: string) => {
  content.value = value
}

const handleSubmit = () => {
  if (!title.value.trim()) {
    return toast.error("Please enter title")
  }
  if (!about.value.trim()) {
    return toast.error("Please enter about")
  }
  if (tags.value.length === 0) {
    return toast.error("Please enter tags")
  }
  if (!content.value.trim()) {
    return toast.error("Please enter content")
  }
  if (!photo.value) {
    return toast.error("Please select cover photo")
  }
  createPost({
    title: title.value,
    content: content.value,
    tags: tags.value,
    about: about.value,
    photo: photo.value,
  })
}

const wrapperStyle = "flex flex-col gap-2"
</script>

<template>
  <div class="flex flex-col gap-5">
    <div :class="wrapperStyle">
      <Label for="title">Title</Label>
      <input id="title" class="border rounded-md p-2 focus:outline-none" v-model="title" />
    </div>

    <div :class="wrapperStyle">
      <Label for="about">About</Label>
      <textarea id="about" class="border rounded-md p-2 focus:outline-none" v-model="about" />
    </div>

    <div :class="wrapperStyle">
      <Label for="tags">Tags</Label>
      <InputTags :tags="tags" @update="handleUpdateTags" />
    </div>

    <div :class="wrapperStyle">
      <Label for="photo">Cover Photo</Label>
      <Input
        id="photo"
        class="shadow-none pl-1 text-base text-muted-foreground"
        type="file"
        ref="photo"
        @input="handleCoverPhoto"
      />
    </div>

    <div :class="wrapperStyle">
      <Label>Content</Label>
      <Editor @update:model-value="handleEditorUpdate" />
    </div>

    <div>
      <Button class="w-56" @click="handleSubmit">Publish Blog Post</Button>
    </div>
  </div>
</template>
