export type UserRole = {
    id: number
    name: string
    level: number
    description?: string
}

export type User = {
    id: number
    username: string
    email: string
    created_at: string
    is_active: boolean
    role_id: number
    role: UserRole
}

export type LoginUser = {
    email: string
    password: string
}
export type SignupUser = {
    username: string
    email: string
    password: string
}
export type GetPostsOptions = {
    page: number
    limit: number
}
export type GetPostsByTagOptions = {
    page: number
    limit: number
    tag: string
}
