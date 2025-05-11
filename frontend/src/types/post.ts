export type Post = {
  id: number
  slug: string
  contentEn: string
  contentZh: string
  titleEn: string
  titleZh: string
  aboutEn: string
  aboutZh: string
  photo: string
  tags: string[]
  created_at: string
  updated_at: string
  user: {
    username: string
    email: string
  }
  viewNum: number
  likeNum: number
}

export type PostCardProps = {
  slug: string
  title: string
  about: string
  photo: string
  tags: string[]
  createdAt: string
  view: number
  like: number
}

export type CreatePost = {
  slug: string
  titleEn: string
  titleZh: string
  contentEn: string
  contentZh: string
  aboutEn: string
  aboutZh: string
  tags: string[]
  imageUrl: string
}

export type UpdatePost = {
  titleEn: string
  titleZh: string
  contentEn: string
  contentZh: string
  aboutEn: string
  aboutZh: string
  tags: string[]
  photo?: File
}
