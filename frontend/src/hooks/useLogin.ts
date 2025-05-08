import { loginApi } from "@/api/auth"
import type { LoginUser } from "@/types/user"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { useRouter } from "vue-router"
import { toast } from "vue-sonner"

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginUser) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: (data) => {
      const token = data.token
      const user = data.user
      queryClient.setQueryData(["user"], user)
      localStorage.setItem("jwt-token", token)
      router.push({ path: "/", replace: true })
      // console.log(user);
    },
    onError: () => {
      toast.error("Email or password is incorrect")
    },
  })
  return { login, isPending }
}
