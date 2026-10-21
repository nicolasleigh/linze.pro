import { createPostApi } from "@/api/post"
import { useMutation } from "@tanstack/vue-query"

export function useCreatePost() {
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: createPostApi,
  })

  return { createPost, isPending }
}
