import type { GetPostsByTagOptions, GetPostsOptions } from "@/types/user"
import { client } from "./client"
import type { CreatePost, Post, UpdatePost } from "@/types/post"
import { toast } from "vue-sonner"

export const getPostByIdApi = async (id: string): Promise<Post> => {
  const token = localStorage.getItem("jwt-token")
  const { data } = await client.get(`/post/${id}`, {
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
  const form = new FormData()
  form.append("image", post.photo)
  form.append("title", post.title)
  form.append("about", post.about)
  form.append("content", post.content)
  form.append("tags", JSON.stringify(post.tags))
  const promise = client.post(`/posts`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  toast.promise(promise, {
    loading: "Creating post...",
    success: "Post created successfully",
    error: "Failed to create post",
  })
}

export const updatePostApi = async ({ id, post }: { id: string; post: UpdatePost }) => {
  const token = localStorage.getItem("jwt-token")
  const promise = client.patch(
    `/post/${id}`,
    {
      title: post.title,
      about: post.about,
      // tags: JSON.stringify(post.tags),
      tags: post.tags,
      content: post.content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  toast.promise(promise, {
    loading: "Updating post...",
    success: "Post updated successfully",
    error: "Failed to update post",
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

export const getAllTagsApi = async (): Promise<string> => {
  const { data } = await client.get(`/posts/tags`)
  return data.data
}

export const getPostsByTagApi = async (options: GetPostsByTagOptions): Promise<Post[]> => {
  const { data } = await client.get(`/posts/tag`, {
    params: {
      page: options.page,
      limit: options.limit,
      tag: options.tag,
    },
  })
  return data.data
}
