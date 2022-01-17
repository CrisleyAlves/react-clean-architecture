import { HttpGetParams } from '../protocols/http'

import faker from 'faker'

export const mockGetRequest = (config?: any): HttpGetParams<any> => ({
  url: faker.internet.url()
})
