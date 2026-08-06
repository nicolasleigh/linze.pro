import { signupApi } from "@/api/auth"
import type { SignupUser } from "@/types/user"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { getErrorMessage } from "@/utils/helper"

export function useSignup() {
    const navigate = useNavigate()

    const { mutate: signup, isPending } = useMutation({
        mutationFn: ({ email, password, username }: SignupUser) =>
            signupApi({
                email,
                password,
                username,
            }),
        onSuccess: () => {
            toast.success("Signup successfully")
            navigate("/login", { replace: true })
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, "Failed to signup"))
        },
    })

    return { signup, isPending }
}
