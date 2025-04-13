import { loginApi } from "@/api/auth";
import type { LoginUser } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginUser) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      router.push({ path: "/dashboard", replace: true });
      console.log(user);
    },
    onError: () => {
      toast.error("Email or password are incorrect");
    },
  });
  return { login, isPending };
}
