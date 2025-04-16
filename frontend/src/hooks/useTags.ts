import { getAllTagsApi, getPostByIdApi, getPostsApi } from "@/api/post"
import { useQuery } from "@tanstack/vue-query"

export function useTags() {
  const {
    data: tagString,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getAllTagsApi(),
  })

  return { tagString, isLoading, error }
}
