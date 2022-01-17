import { Post } from '../../models/post'

export interface ListPosts {
  list (): Promise<Post[]>
}
