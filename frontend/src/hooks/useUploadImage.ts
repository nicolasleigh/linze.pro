import { uploadImageApi } from "@/api/post"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

export function useUploadImage() {
  const queryClient = useQueryClient()

  const {
    mutate: uploadImage,
    isPending,
    isError,
    isSuccess,
    data: imageUrl,
  } = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] })
    },
  })

  return { uploadImage, isPending, imageUrl, isError, isSuccess }
}
