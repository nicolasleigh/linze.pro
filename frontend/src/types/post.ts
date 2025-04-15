export type Post = {
  id: string
  content: string
  title: string
  tags: string[]
  created_at: string
  updated_at: string
  user: {
    username: string
    email: string
  }
}

export type PostCardProps = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  username: string
  userEmail: string
}
