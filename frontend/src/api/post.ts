import type { GetPostsOptions } from "@/types/user";
import { client } from "./client";

export const getPostByIdApi = async (id: string) => {
  const token = await localStorage.getItem("jwt-token");
  const { data } = await client.get(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const getPostsApi = async (options: GetPostsOptions) => {
  const { data } = await client.get(`/posts`, {
    params: {
      page: options.page,
      limit: options.limit,
    },
  });
  return data.data;
};
