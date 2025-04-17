import { getPostsByTagApi } from "@/api/post"
import { POST_PAGE_LIMIT } from "@/utils/constant"
import { useQuery } from "@tanstack/vue-query"
import type { Ref } from "vue"
import { useRoute } from "vue-router"

export function usePostsByTag(page: number, tag: Ref) {
  const limit = POST_PAGE_LIMIT

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts-by-tag", page],
    queryFn: () => getPostsByTagApi({ page, limit, tag: tag.value }),
  })

  return { posts, isLoading, error, refetch }
}
