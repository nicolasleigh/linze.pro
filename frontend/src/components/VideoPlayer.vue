<script setup lang="ts">
import "hls-video-element"
import "media-chrome"

defineProps<{ src: string }>()
</script>

<template>
  <media-controller class="">
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
</template>
