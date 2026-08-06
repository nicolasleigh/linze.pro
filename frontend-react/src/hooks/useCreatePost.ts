import { createPostApi } from "@/api/post"
import type { CreatePost } from "@/types/post"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export function useCreatePost() {
    const navigate = useNavigate()

    const { mutate: createPost, isPending } = useMutation({
        mutationFn: (post: CreatePost) => createPostApi(post),
        onSuccess: (_, variables) => {
            navigate(`/posts/${variables.slug}`)
        },
    })

    return { createPost, isPending }
}
