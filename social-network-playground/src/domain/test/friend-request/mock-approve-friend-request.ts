import { ApproveFriendRequestParams } from '@/domain/usecases/friend-request/approve-friend-request'
import faker from 'faker'

export const mockApproveFriendRequestParams = (): ApproveFriendRequestParams => ({
  _id: faker.random.uuid(),
  sent: faker.random.uuid(),
  received: faker.random.uuid()
})
