import { createPostApi } from "@/api/post"
import { useMutation } from "@tanstack/vue-query"
import { toast } from "vue-sonner"

export function useCreatePost() {
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: createPostApi,
  })

  return { createPost, isPending }
}
