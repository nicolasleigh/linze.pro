import { getPostByIdApi, getPostsApi, getPostsByTagApi } from "@/api/post"
import { POST_PAGE_LIMIT } from "@/utils/constant"
import { useQuery } from "@tanstack/vue-query"
import { useRoute } from "vue-router"

export function usePosts(page: number) {
  const limit = POST_PAGE_LIMIT

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
