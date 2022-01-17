import { PostListActivityModel, UserListActivityModel } from '.'

export type ActivityModel = {
  _id: string
  from: UserListActivityModel
  to: string
  post_id: PostListActivityModel
  type: 'like' | 'comment' | 'friend_request'
  created_at: string
}
