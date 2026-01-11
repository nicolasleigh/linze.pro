import { getPostBySlugAndLangApi } from "@/api/post"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

export function usePost() {
    const { slug } = useParams<{ slug: string }>()
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language

    const {
        data: post,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["post", slug, currentLanguage],
        queryFn: () => getPostBySlugAndLangApi({ slug: slug || "", lang: currentLanguage || "" }),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: !!slug
    })

    return { post, isLoading, error }
}
