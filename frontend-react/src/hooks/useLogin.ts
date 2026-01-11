import { loginApi } from "@/api/auth"
import type { LoginUser } from "@/types/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

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
            navigate("/", { replace: true })
            // console.log(user);
        },
        onError: () => {
            toast.error("Email or password is incorrect")
        },
    })
    return { login, isPending }
}
