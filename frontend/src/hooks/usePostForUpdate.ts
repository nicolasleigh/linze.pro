import { getPostForAllLanguage } from "@/api/post"
import { useQuery } from "@tanstack/vue-query"
import { useRoute } from "vue-router"

export function usePostForEdit() {
  const route = useRoute()
  const slug = route.params.slug as string

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post-all", slug],
    queryFn: () => getPostForAllLanguage(slug),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return { post, isLoading, error }
}
