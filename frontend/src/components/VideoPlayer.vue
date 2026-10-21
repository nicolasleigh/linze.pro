<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue"

defineProps<{ src: string }>()

const container = useTemplateRef<HTMLElement>("container")
const isPlayerReady = ref(false)
let observer: IntersectionObserver | undefined
let loadPromise: Promise<void> | undefined

const loadPlayer = () => {
  if (!loadPromise) {
    loadPromise = Promise.all([import("hls-video-element"), import("media-chrome")]).then(() => {
      isPlayerReady.value = true
    })
  }

  return loadPromise
}

onMounted(() => {
  if (!("IntersectionObserver" in window) || !container.value) {
    void loadPlayer()
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) {
        return
      }

      observer?.disconnect()
      void loadPlayer()
    },
    { rootMargin: "300px 0px" },
  )

  observer.observe(container.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="container" class="relative min-h-48 bg-neutral-950">
    <div
      v-if="!isPlayerReady"
      class="absolute inset-0 flex items-center justify-center text-sm text-neutral-500"
      role="status"
    >
      Loading video…
    </div>
    <media-controller v-else>
      <hls-video :src="src" slot="media" crossorigin></hls-video>
      <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>
      <media-control-bar>
        <media-play-button></media-play-button>
        <media-seek-backward-button seekoffset="5"></media-seek-backward-button>
        <media-seek-forward-button seekoffset="5"></media-seek-forward-button>
        <!-- <media-mute-button></media-mute-button> -->
        <media-time-range></media-time-range>
        <media-time-display showduration remaining></media-time-display>
        <!-- <media-playback-rate-button></media-playback-rate-button> -->
        <media-fullscreen-button></media-fullscreen-button>
      </media-control-bar>
    </media-controller>
  </div>
</template>
