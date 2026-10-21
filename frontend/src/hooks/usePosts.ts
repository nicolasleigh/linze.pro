import { getPostsApi } from "@/api/post"
import { POST_PAGE_LIMIT } from "@/utils/constant"
import { useQuery } from "@tanstack/vue-query"
import { computed, toValue, type MaybeRef } from "vue"

export function usePosts({
  page,
  limit = POST_PAGE_LIMIT,
}: {
  page: MaybeRef<number>
  limit?: MaybeRef<number>
}) {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: computed(() => ["posts", { page: toValue(page), limit: toValue(limit) }]),
    queryFn: () => getPostsApi({ page: toValue(page), limit: toValue(limit) }),
  })

  return { posts, isLoading, error }
}
