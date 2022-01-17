import { LikePostParams } from '@/domain/usecases/posts/like-post'
import faker from 'faker'

export const mockLikePostParams = (): LikePostParams => (
  {
    postId: faker.random.uuid(),
    userId: faker.random.uuid()
  }
)
