import { client } from "./client"

export const updatePostLikeApi = async (id: string) => {
    const { data } = await client.post(`/like/post/${id}`)
    return data.data
}

export const getPostLikeApi = async (id: string) => {
    const { data } = await client.get(`/like/post/${id}`)
    return data.data
}

export const updatePostViewApi = async (id: string) => {
    const { data } = await client.get(`/view/post/${id}`)
    return data.data
}

export const updateProjectLikeApi = async (slug: string) => {
    const { data } = await client.post(`/like/project/${slug}`)
    return data.data
}

export const getProjectLikeApi = async (slug: string) => {
    const { data } = await client.get(`/like/project/${slug}`)
    return data.data
}

export const updateProjectViewApi = async (slug: string) => {
    const { data } = await client.get(`/view/project/${slug}`)
    return data.data
}
