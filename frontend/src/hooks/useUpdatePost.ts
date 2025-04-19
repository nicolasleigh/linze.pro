import { updatePostApi } from "@/api/post"
import { useMutation } from "@tanstack/vue-query"

export function useUpdatePost() {
  const { mutate: updatePost, isPending } = useMutation({
    mutationFn: updatePostApi,
  })

  return { updatePost, isPending }
}
