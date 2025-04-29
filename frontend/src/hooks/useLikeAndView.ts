import {
  getPostLikeApi,
  getProjectLikeApi,
  updatePostLikeApi,
  updatePostViewApi,
  updateProjectLikeApi,
  updateProjectViewApi,
} from "@/api/like"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { useRoute } from "vue-router"

export function usePostLike() {
  const route = useRoute()
  const slug = route.params.slug as string

  const { mutate: updatePostLike, data: likeNum } = useMutation({
    mutationFn: () => updatePostLikeApi(slug),
  })

  return { likeNum, updatePostLike }
}

export function useGetPostLike() {
  const route = useRoute()
  const slug = route.params.slug as string

  const { data: likeNum } = useQuery({
    queryKey: ["post-like-num", slug],
    queryFn: () => getPostLikeApi(slug),
  })

  return { likeNum }
}

export function usePostView() {
  const route = useRoute()
  const slug = route.params.slug as string

  const { data: viewNum } = useQuery({
    queryKey: ["post-view-num", slug],
    queryFn: () => updatePostViewApi(slug),
  })

  return { viewNum }
}

export function useProjectLike() {
  const route = useRoute()
  const slug = route.name as string

  const { mutate: updateProjectLike, data: likeNum } = useMutation({
    mutationFn: () => updateProjectLikeApi(slug),
  })

  return { likeNum, updateProjectLike }
}

export function useGetProjectLike() {
  const route = useRoute()
  const slug = route.name as string

  const { data: likeNum } = useQuery({
    queryKey: ["project-like-num", slug],
    queryFn: () => getProjectLikeApi(slug),
  })

  return { likeNum }
}

export function useProjectView() {
  const route = useRoute()
  const slug = route.name as string

  const { data: viewNum } = useQuery({
    queryKey: ["project-view-num", slug],
    queryFn: () => updateProjectViewApi(slug),
  })

  return { viewNum }
}
