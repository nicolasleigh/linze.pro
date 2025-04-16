export type Post = {
  id: number
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
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  username: string
  userEmail: string
}

export type CreatePost = {
  title: string
  content: string
  tags: string[]
  photo: File
  about: string
}
