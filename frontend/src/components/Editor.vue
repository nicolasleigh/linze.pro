<script setup lang="ts">
import { MdEditor } from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import { toolbars } from "@/utils/toolbars"
import { ref, watch } from "vue"
import { useUploadImage } from "@/hooks/useUploadImage"
import { idbAddItem } from "@/utils/indexedDb"
import { formatTime } from "@/utils/helper"
import { toast } from "vue-sonner"

const content = ref("")
const { uploadImage, imageUrl } = useUploadImage()

const emit = defineEmits(["update:modelValue"])

const onSave = () => {
  const time = formatTime(new Date())
  idbAddItem(time, content.value)
  toast.info("Content saved into the indexedDB")
}
const uploadImg = (files: File[]) => {
  uploadImage(files[0])
}

watch(imageUrl, (value) => {
  const mdImageUrl = `
  ![image](${value})
  `
  content.value = content.value.concat(mdImageUrl)
})
</script>

<template>
  <div class="">
    <MdEditor
      class="rounded-lg"
      v-model="content"
      @input="emit('update:modelValue', content)"
      :toolbars="toolbars"
      @save="onSave"
      @upload-img="uploadImg"
      theme="dark"
    />
  </div>
</template>
