<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

defineProps<{ url: string }>()
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <img :src="url" />
    </DialogTrigger>
    <DialogContent class="max-w-[1200px] p-0 border-none">
      <img :src="url" />
    </DialogContent>
  </Dialog>
</template>
