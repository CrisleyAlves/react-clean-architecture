import { AddCommentParam } from '@/domain/usecases/comment/add-comment'
import faker from 'faker'

export const mockAddComment = (): AddCommentParam => ({
  postId: faker.random.uuid(),
  comment: faker.random.words()
})
