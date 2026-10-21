import { loginApi } from "@/api/auth"
import type { LoginUser } from "@/types/user"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { useRoute, useRouter } from "vue-router"
import { toast } from "vue-sonner"
import { useLocalizedPath } from "@/hooks/useLocalizedPath"

export function useLogin() {
  const queryClient = useQueryClient()
  const route = useRoute()
  const router = useRouter()
  const { localizedPath } = useLocalizedPath()

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
      const requestedRedirect = route.query.redirect
      const redirect =
        typeof requestedRedirect === "string" &&
        requestedRedirect.startsWith("/") &&
        !requestedRedirect.startsWith("//")
          ? requestedRedirect
          : localizedPath("/")
      router.replace(redirect)
    },
    onError: () => {
      toast.error("Email or password is incorrect")
    },
  })
  return { login, isPending }
}
