import type { GetPostsOptions } from "@/types/user"
import { client } from "./client"
import type { CreatePost, Post } from "@/types/post"
import { toast } from "vue-sonner"

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

export const createPostApi = async (post: CreatePost) => {
  const token = localStorage.getItem("jwt-token")
  await client.post(`/posts`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const uploadImageApi = async (imageFile: File) => {
  const token = localStorage.getItem("jwt-token")
  const form = new FormData()
  form.append("image", imageFile)
  const promise = client.post(`/posts/image`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  toast.promise(promise, {
    loading: "Uploading image...",
    success: "Image uploaded successfully",
    error: "Failed to upload image",
  })
  const { data } = await promise
  return data.data
}
