import { getPostsByTagApi } from "@/api/post"
import { POST_PAGE_LIMIT } from "@/utils/constant"
import { useQuery } from "@tanstack/vue-query"
import { computed, toValue, type MaybeRef } from "vue"

export function usePostsByTag(page: MaybeRef<number>, tag: MaybeRef<string>) {
  const limit = POST_PAGE_LIMIT

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: computed(() => ["posts-by-tag", { page: toValue(page), limit, tag: toValue(tag) }]),
    queryFn: () => getPostsByTagApi({ page: toValue(page), limit, tag: toValue(tag) }),
    enabled: computed(() => Boolean(toValue(tag))),
  })

  return { posts, isLoading, error }
}
