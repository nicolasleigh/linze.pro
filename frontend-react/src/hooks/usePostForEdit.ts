import { getPostForAllLanguage } from "@/api/post"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function usePostForEdit() {
    const { slug } = useParams<{ slug: string }>()

    const {
        data: post,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["post-all", slug],
        queryFn: () => getPostForAllLanguage(slug || ""),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: !!slug,
    })

    return { post, isLoading, error }
}
