import { getPostBySlugAndLangApi } from "@/api/post"
import { useQuery } from "@tanstack/vue-query"
import { useTranslation } from "i18next-vue"
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

export function usePost() {
  const route = useRoute()
  const slug = route.params.slug as string
  const { i18next } = useTranslation()

  const currentLanguage = ref<string | null>(null)

  watch(
    () => i18next.language,
    (newLang) => {
      currentLanguage.value = newLang
    },
    { immediate: true },
  )

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", slug, currentLanguage],
    queryFn: () => getPostBySlugAndLangApi({ slug, lang: currentLanguage.value || "" }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return { post, isLoading, error }
}
