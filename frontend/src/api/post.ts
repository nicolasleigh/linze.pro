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
