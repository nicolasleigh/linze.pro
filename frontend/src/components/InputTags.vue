<template>
  <div>
    <div class="flex flex-wrap gap-2 p-2 bg-white border rounded-md">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="flex items-center px-2 py-1 text-sm bg-gray-100 rounded-md"
      >
        {{ tag }}
        <button
          type="button"
          class="ml-1 text-gray-500 hover:text-gray-700"
          @click="removeTag(index)"
        >
          ✕
        </button>
      </span>
      <input
        v-model="pendingDataPoint"
        type="text"
        placeholder="Add tags..."
        class="flex-grow min-w-[80px] outline-none border-none"
        @keydown.enter.prevent="addPendingDataPoint"
        @blur="addPendingDataPoint"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue"

export default {
  name: "InputTags",
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update"],
  setup(props, { emit }) {
    const pendingDataPoint = ref("")

    watch(pendingDataPoint, (newValue) => {
      if (newValue.includes(",")) {
        const newDataPoints = new Set([
          ...props.tags,
          ...newValue
            .split(",")
            .map((chunk) => chunk.trim())
            .filter(Boolean),
        ])
        emit("update", Array.from(newDataPoints))
        pendingDataPoint.value = ""
      }
    })

    const addPendingDataPoint = () => {
      if (pendingDataPoint.value) {
        const newDataPoints = new Set([...props.tags, pendingDataPoint.value.trim()])
        emit("update", Array.from(newDataPoints))
        pendingDataPoint.value = ""
      }
    }

    const removeTag = (index: number) => {
      const newTags = [...props.tags]
      newTags.splice(index, 1)
      emit("update", newTags)
    }

    return {
      pendingDataPoint,
      addPendingDataPoint,
      removeTag,
    }
  },
}
</script>
