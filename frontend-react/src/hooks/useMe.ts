import { useQuery } from "@tanstack/react-query"
import { meApi } from "@/api/auth"

// Returns the authenticated user (with role). Reuses the ["user"] cache key
// that useLogin seeds, but fetches the full profile (incl. role) from the
// backend so permissions can be checked client-side.
export function useMe() {
    const token = localStorage.getItem("jwt-token")

    return useQuery({
        queryKey: ["user"],
        queryFn: meApi,
        enabled: !!token,
    })
}
