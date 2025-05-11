import { getAllImagesApi } from "@/api/post"
import { useQuery } from "@tanstack/vue-query"

export function useImages() {
  const {
    data: images,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["images"],
    queryFn: () => getAllImagesApi(),
  })

  return { images, isLoading, error }
}
