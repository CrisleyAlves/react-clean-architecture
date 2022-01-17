import { UserFriend } from './user'

export type Post = {
  id: string
  user: any
  photo: string
  content: string
  comments: [Comment]
  likes: [Like]
  created_at: string
}

export type Comment = {
  id: string
  user: UserFriend
  comment: string
  created_at: string
}

export type Like = {
  id: string
  user: UserFriend
  created_at: string
}

export interface LikePost {
  postId: string
  userId: string
}

export type PostListActivityModel = {
  _id: string
  photo: string
  content: string
}
