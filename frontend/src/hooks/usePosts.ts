import { getPostsApi } from "@/api/post"
import { POST_PAGE_LIMIT } from "@/utils/constant"
import { useQuery } from "@tanstack/vue-query"

export function usePosts({ page, limit = POST_PAGE_LIMIT }: { page: number; limit?: number }) {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPostsApi({ page, limit }),
  })

  return { posts, isLoading, error }
}
