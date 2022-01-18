import faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases/authentication/authentication'
import { AccountModel } from '../models'
import { CreateAccountParams } from '../usecases'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  _id: faker.random.uuid(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  photo: faker.image.imageUrl(),
  gender: faker.random.word(),
  token: faker.name.lastName()
})

export const mockCreateAccount = (): CreateAccountParams => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  gender: 'male',
  email: faker.internet.email(),
  password: faker.random.word()
})
