import { getPostBySlugAndLangApi, getPostForAllLanguage } from "@/api/post"
import { useQuery } from "@tanstack/vue-query"
import { useTranslation } from "i18next-vue"
import { ref, watch } from "vue"
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
