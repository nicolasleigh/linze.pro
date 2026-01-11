import { getPostsByTagApi } from "@/api/post"
import { POST_PAGE_LIMIT } from "@/utils/constant"
import { useQuery } from "@tanstack/react-query"

export function usePostsByTag(page: number, tag: string | null) {
    const limit = POST_PAGE_LIMIT

    const {
        data: posts,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["posts-by-tag", page, tag], // Include tag in queryKey
        queryFn: () => getPostsByTagApi({ page, limit, tag: tag || "" }),
        enabled: !!tag, // Only run if tag is present
    })

    return { posts, isLoading, error, refetch }
}
