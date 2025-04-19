<script setup lang="ts">
import { ref, watch } from "vue"
import Editor from "@/components/Editor.vue"
import InputTags from "@/components/InputTags.vue"
import Button from "@/components/ui/button/Button.vue"
import { Label } from "@/components/ui/label"
import { toast } from "vue-sonner"
import { useCreatePost } from "@/hooks/useCreatePost"
import Input from "@/components/ui/input/Input.vue"
import { NotebookPen } from "lucide-vue-next"
import { usePost } from "@/hooks/usePost"
import { useUpdatePost } from "@/hooks/useUpdatePost"
import { useRoute } from "vue-router"

const { post, isLoading } = usePost()
const route = useRoute()

const title = ref(post.value?.title || "")
const about = ref(post.value?.about || "")
const content = ref(post.value?.content || "")
const tags = ref<string[]>(post.value?.tags || [])
const photo = ref<File>()

watch(
  () => post.value,
  (newVal) => {
    title.value = newVal?.title || ""
    about.value = newVal?.about || ""
    content.value = newVal?.content || ""
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

const handleEditorUpdate = (value: string) => {
  content.value = value
  // console.log(content.value)
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
  updatePost({
    id: route.params.postId as string,
    post: {
      title: title.value,
      content: content.value,
      tags: tags.value,
      about: about.value,
    },
  })
}

const wrapperStyle = "flex flex-col gap-2"
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
            >Posts</span
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
        <div class="flex flex-col gap-5 text-neutral-100">
          <div :class="wrapperStyle">
            <Label for="title">Title</Label>
            <input id="title" :class="inputStyle" v-model="title" />
          </div>

          <div :class="wrapperStyle">
            <Label for="about">About</Label>
            <textarea id="about" :class="inputStyle" v-model="about" />
          </div>

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

          <div :class="wrapperStyle">
            <Label>Content</Label>
            <Editor @update:model-value="handleEditorUpdate" :initialContent="content" />
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
