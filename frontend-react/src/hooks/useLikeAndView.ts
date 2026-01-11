import {
    getPostLikeApi,
    getProjectLikeApi,
    updatePostLikeApi,
    updatePostViewApi,
    updateProjectLikeApi,
    updateProjectViewApi,
} from "@/api/like"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams, useLocation } from "react-router-dom"

// Helper to get slug from route name/path
function useSlug() {
    const params = useParams()
    if (params.slug) return params.slug

    // For projects (e.g. /projects/musicfy), the slug is the last part of path
    const location = useLocation()
    const pathParts = location.pathname.split('/').filter(Boolean)
    return pathParts[pathParts.length - 1]
}

export function usePostLike() {
    const slug = useSlug()

    const { mutate: updatePostLike, data: likeNum } = useMutation({
        mutationFn: () => updatePostLikeApi(slug),
    })

    return { likeNum, updatePostLike }
}

export function useGetPostLike() {
    const slug = useSlug()

    const { data: likeNum } = useQuery({
        queryKey: ["post-like-num", slug],
        queryFn: () => getPostLikeApi(slug),
        enabled: !!slug
    })

    return { likeNum }
}

export function usePostView() {
    const slug = useSlug()

    const { data: viewNum } = useQuery({
        queryKey: ["post-view-num", slug],
        queryFn: () => updatePostViewApi(slug),
        enabled: !!slug
    })

    return { viewNum }
}

export function useProjectLike() {
    const slug = useSlug()

    const { mutate: updateProjectLike, data: likeNum } = useMutation({
        mutationFn: () => updateProjectLikeApi(slug),
    })

    return { likeNum, updateProjectLike }
}

export function useGetProjectLike() {
    const slug = useSlug()

    const { data: likeNum } = useQuery({
        queryKey: ["project-like-num", slug],
        queryFn: () => getProjectLikeApi(slug),
        enabled: !!slug
    })

    return { likeNum }
}

export function useProjectView() {
    const slug = useSlug()

    const { data: viewNum } = useQuery({
        queryKey: ["project-view-num", slug],
        queryFn: () => updateProjectViewApi(slug),
        enabled: !!slug
    })

    return { viewNum }
}
