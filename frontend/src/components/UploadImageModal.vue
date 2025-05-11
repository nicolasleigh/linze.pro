<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUploadImage } from "@/hooks/useUploadImage"
import { createReusableTemplate } from "@vueuse/core"
import { ref } from "vue"
import DialogClose from "./ui/dialog/DialogClose.vue"

const commonImageStyle =
  "flex justify-center items-center border rounded aspect-video cursor-pointer"

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
const { uploadImage } = useUploadImage()

const photo = ref<File>()

const selectedImage = ref("")

const updateImageForUI = (file: File) => {
  const url = URL.createObjectURL(file)
  selectedImage.value = url
}

const handleCoverPhoto = (e: Event) => {
  e.preventDefault()
  const target = e.target as HTMLInputElement
  if (target.files) {
    const file = target.files[0]
    updateImageForUI(file)
    photo.value = file
  }
}

const submit = () => {
  if (photo.value) {
    uploadImage(photo.value)
  }
}
</script>

<template>
  <DefineTemplate>
    <div :class="commonImageStyle">
      <span class="text-muted-foreground">Select image</span>
    </div>
  </DefineTemplate>

  <Dialog>
    <DialogTrigger as-child>
      <Button>Upload Image</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogDescription> Upload Image </DialogDescription>
      </DialogHeader>
      <div>
        <input id="image" type="file" hidden accept="image/*" @input="handleCoverPhoto" />
        <label for="image" tabindex="0">
          <img v-if="selectedImage" :class="commonImageStyle" :src="selectedImage" />
          <ReuseTemplate v-else />
        </label>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button type="button" variant="secondary"> Close </Button>
        </DialogClose>
        <Button @click="submit"> Upload </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
