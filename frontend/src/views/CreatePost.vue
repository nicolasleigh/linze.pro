<script setup lang="ts">
import { ref } from "vue"
import Editor from "@/components/Editor.vue"
import InputTags from "@/components/InputTags.vue"
import Button from "@/components/ui/button/Button.vue"
import { Label } from "@/components/ui/label"
import { toast } from "vue-sonner"
import { useCreatePost } from "@/hooks/useCreatePost"

const title = ref("")
const content = ref("")
const tags = ref<string[]>([])

const { createPost, isPending } = useCreatePost()

const handleUpdateTags = (data: string[]) => {
  tags.value = data
}

const handleInputChange = (e: Event) => {
  e.preventDefault()
  // console.log((e.target as HTMLInputElement).value)
}

const handleEditorUpdate = (value: string) => {
  content.value = value
  // console.log(content.value)
  // console.log(e)
}

const handleSubmit = () => {
  if (!title.value.trim()) {
    return toast.error("Please enter title")
  }
  if (tags.value.length === 0) {
    return toast.error("Please enter tags")
  }
  if (!content.value.trim()) {
    return toast.error("Please enter content")
  }
  createPost({ title: title.value, content: content.value, tags: tags.value })
}

const wrapperStyle = "flex flex-col gap-2"
</script>

<template>
  <div class="flex flex-col gap-5">
    <div :class="wrapperStyle">
      <Label for="title">Title</Label>
      <input
        id="title"
        class="border rounded-md p-2 focus:outline-none"
        v-model="title"
        @input="handleInputChange"
      />
    </div>

    <div :class="wrapperStyle">
      <Label for="tags">Tags</Label>
      <InputTags :tags="tags" @update="handleUpdateTags" />
    </div>

    <div :class="wrapperStyle">
      <Label>Content</Label>
      <Editor @update:model-value="handleEditorUpdate" />
    </div>

    <div>
      <Button @click="handleSubmit">Submit</Button>
    </div>
  </div>
</template>
