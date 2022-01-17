import { UserEdit } from '@/domain/models/user'
import faker from 'faker'

export const mockLoadUserEditProfile = (): UserEdit => ({
  _id: faker.random.uuid(),
  background: faker.image.imageUrl(),
  photo: faker.image.imageUrl(),
  biography: faker.random.words(),
  city: faker.random.words(),
  country: faker.random.words(),
  facebook: faker.internet.url(),
  instagram: faker.internet.url(),
  twitter: faker.internet.url(),
  youtube: faker.internet.url(),
  email: faker.internet.email(),
  first_name: faker.random.word(),
  gender: 'male',
  job: faker.random.word(),
  last_name: faker.random.word()
})
