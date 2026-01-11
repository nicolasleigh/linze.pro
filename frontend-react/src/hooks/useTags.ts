import { getAllTagsApi } from "@/api/post"
import { useQuery } from "@tanstack/react-query"

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
