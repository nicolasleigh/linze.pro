import { uploadImageApi } from "@/api/post"
import { useMutation } from "@tanstack/vue-query"
import { toast } from "vue-sonner"

export function useUploadImage() {
  const {
    mutate: uploadImage,
    isPending,
    isError,
    isSuccess,
    data: imageUrl,
  } = useMutation({
    mutationFn: uploadImageApi,
    // onSuccess: () => {
    //   toast.success("Image uploaded successfully")
    // },
    // onError: () => {
    //   toast.error("Failed to upload image")
    // },
  })

  return { uploadImage, isPending, imageUrl, isError, isSuccess }
}
