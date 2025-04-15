<template>
  <div
    class="hover:shadow-lg hover:-mt-3 hover:mb-3 transition-all duration-500 cursor-pointer overflow-hidden rounded-xl"
    @click="goToPost"
  >
    <Card>
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription>{{ username }}</CardDescription>
      </CardHeader>
      <CardContent> {{ content }}... </CardContent>
      <CardFooter>
        {{ formattedDate }}
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import type { PostCardProps } from "@/types/post"

const props = defineProps<PostCardProps>()
const router = useRouter()

const goToPost = () => {
  router.push({ path: `/post/${props.id}` })
}

const formattedDate = computed(() => {
  const date = new Date(props.updatedAt)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
})
</script>
