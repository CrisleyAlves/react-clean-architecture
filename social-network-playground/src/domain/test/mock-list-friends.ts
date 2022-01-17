import faker from 'faker'
import { UserFriend } from '../models/user'

export const mockListFriends = (): UserFriend[] => {
  return [
    {
      _id: faker.random.uuid(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      gender: faker.random.word(),
      photo: faker.image.imageUrl()
    }
  ]
}

export const mockUserFriend = (): UserFriend => ({
  _id: faker.random.uuid(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  gender: faker.random.word(),
  photo: faker.image.imageUrl()
})
