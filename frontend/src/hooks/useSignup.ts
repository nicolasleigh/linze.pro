import { signupApi } from "@/api/auth"
import type { SignupUser } from "@/types/user"
import { useMutation } from "@tanstack/vue-query"
import { toast } from "vue-sonner"

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ email, password, username }: SignupUser) =>
      signupApi({
        email,
        password,
        username,
      }),
    onSuccess: () => {
      toast.success("Signup successfully")
    },
    onError: () => {
      toast.error("Failed to signup")
    },
  })
  return { signup, isPending }
}
