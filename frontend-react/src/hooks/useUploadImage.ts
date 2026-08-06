import { uploadImageApi } from "@/api/post"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUploadImage() {
    const queryClient = useQueryClient()

    const {
        mutate: uploadImage,
        isPending,
        isError,
        isSuccess,
        data: imageUrl,
    } = useMutation({
        mutationFn: (file: File) => uploadImageApi(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] })
        },
    })

    return { uploadImage, isPending, imageUrl, isError, isSuccess }
}
