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
