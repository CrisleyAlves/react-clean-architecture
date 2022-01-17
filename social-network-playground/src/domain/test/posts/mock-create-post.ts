import { CreatePostParam } from '@/domain/usecases/posts/create-post'
import faker from 'faker'

export const mockCreatePostParam = (): CreatePostParam => (
  {
    content: faker.random.words(),
    photo: faker.image.imageUrl()
  }
)
