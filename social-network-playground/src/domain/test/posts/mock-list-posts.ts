import faker from 'faker'
import { mockCreateAccount } from '..'
import { Post } from '../../models/post'
import { mockUserFriend } from '../mock-list-friends'

export const mockListPosts = (): Post[] => ([
  {
    id: faker.random.uuid(),
    content: faker.random.words(),
    photo: faker.image.imageUrl(),
    user: mockCreateAccount(),
    created_at: faker.date.future().toISOString(),
    comments: [{
      comment: faker.random.words(),
      created_at: faker.date.recent.toString(),
      id: faker.random.uuid(),
      user: mockUserFriend()
    }],
    likes: [{
      created_at: faker.date.recent.toString(),
      id: faker.random.uuid(),
      user: mockUserFriend()
    }]
  }
])
