import { updatePostApi } from "@/api/post"
import type { UpdatePost } from "@/types/post"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export function useUpdatePost() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: updatePost, isPending } = useMutation({
        mutationFn: ({ slug, post }: { slug: string; post: UpdatePost }) => updatePostApi({ slug, post }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["post"] })
            navigate(`/posts/${variables.slug}`)
        },
    })

    return { updatePost, isPending }
}
