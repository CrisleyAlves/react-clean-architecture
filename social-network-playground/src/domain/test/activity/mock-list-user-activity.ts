import { ActivityModel } from '@/domain/models/'
import faker from 'faker'

export const mockListUserActivities = (): ActivityModel[] => ([
  {
    _id: faker.random.uuid(),
    from: {
      _id: faker.random.uuid(),
      first_name: faker.name.firstName()
    },
    to: faker.random.uuid(),
    post_id: {
      _id: faker.random.uuid(),
      photo: faker.image.imageUrl(),
      content: faker.random.words()
    },
    type: 'like',
    created_at: faker.date.recent.toString()
  }
])
