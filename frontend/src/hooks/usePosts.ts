import { getPostByIdApi, getPostsApi } from "@/api/post";
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";

export function usePosts() {
  const route = useRoute();
  const page = Number(route.query.page) || 1;
  // const limit = Number(route.query.limit) || 10;
  const limit = 10;

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPostsApi({ page, limit }),
  });

  return { posts, isLoading, error };
}
