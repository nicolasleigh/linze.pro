import { getPostLikeApi, updatePostLikeApi, updatePostViewApi } from "@/api/like"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { useRoute } from "vue-router"

export function usePostLike() {
  const route = useRoute()
  const id = route.params.postId as string

  const { mutate: updatePostLike, data: likeNum } = useMutation({
    mutationFn: () => updatePostLikeApi(id),
  })

  return { likeNum, updatePostLike }
}

export function useGetPostLike() {
  const route = useRoute()
  const id = route.params.postId as string

  const { data: likeNum } = useQuery({
    queryKey: ["post-like-num", id],
    queryFn: () => getPostLikeApi(id),
  })

  return { likeNum }
}

export function usePostView() {
  const route = useRoute()
  const id = route.params.postId as string

  const { data: viewNum } = useQuery({
    queryKey: ["post-view-num", id],
    queryFn: () => updatePostViewApi(id),
  })

  return { viewNum }
}
