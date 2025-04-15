import type { GetPostsOptions } from "@/types/user"
import { client } from "./client"
import type { Post } from "@/types/post"

export const getPostByIdApi = async (id: string): Promise<Post> => {
  const token = await localStorage.getItem("jwt-token")
  const { data } = await client.get(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.data
}

export const getPostsApi = async (options: GetPostsOptions): Promise<Post[]> => {
  const { data } = await client.get(`/posts`, {
    params: {
      page: options.page,
      limit: options.limit,
    },
  })
  return data.data
}
