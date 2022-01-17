import { FriendRequest } from '@/domain/models/'
import faker from 'faker'

export const mockFriendRequestList = (): FriendRequest[] => ([{
  _id: faker.random.uuid(),
  sent: faker.random.uuid(),
  received: faker.random.uuid(),
  status: 'pending'
}])
