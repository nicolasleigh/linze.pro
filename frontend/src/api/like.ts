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
