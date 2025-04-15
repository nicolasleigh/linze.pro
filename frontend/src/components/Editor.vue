<script setup lang="ts">
import { MdEditor } from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import { toolbars } from "@/utils/toolbars"
import { ref } from "vue"

const content = ref("")

// const props = defineProps(["content"])
// const props = defineProps({
//   content: String,
// })
// const emit = defineEmits(["change"])
const emit = defineEmits(["update:modelValue"])

// const onChange = (v: string) => (props.content = v)
const onSave = () => {
  console.log(content.value)
}
</script>

<template>
  <div class="w-[1200px]">
    <MdEditor
      class="rounded-lg"
      v-model="content"
      @change="emit('update:modelValue', content)"
      :toolbars="toolbars"
      @save="onSave"
    />
  </div>
</template>
