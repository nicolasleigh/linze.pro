import { createPostApi } from "@/api/post"
import { useMutation } from "@tanstack/vue-query"
import { toast } from "vue-sonner"

export function useCreatePost() {
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      toast.success("Post created successfully")
    },
    onError: () => {
      toast.error("Failed to create post")
    },
  })

  return { createPost, isPending }
}
