<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import DialogClose from "./ui/dialog/DialogClose.vue"
import { useImages } from "@/hooks/useImages"

const { images } = useImages()
const emit = defineEmits<{
  change: [url: string]
}>()
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Select Image</Button>
    </DialogTrigger>
    <DialogContent class="max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Select Image</DialogTitle>
        <DialogDescription hidden> Select Image </DialogDescription>
      </DialogHeader>
      <div class="max-h-[500px] overflow-auto flex flex-wrap gap-2 items-center">
        <DialogClose v-for="item in images" :key="item.id" @click="emit('change', item.url)">
          <img :src="item.url" class="aspect-video h-[50px] rounded-sm" />
        </DialogClose>
      </div>
    </DialogContent>
  </Dialog>
</template>
