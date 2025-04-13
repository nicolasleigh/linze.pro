import { getPostByIdApi } from "@/api/post";
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";

export function usePost() {
  const route = useRoute();
  const id = route.params.postId as string;

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostByIdApi(id),
  });

  return { post, isLoading, error };
}
