import { CreateAccountService } from '@/data/usecases/create-account/create-account'
import { makeApiUrl } from '@/main/factories/http/api/make-api-url'
import { makeAxiosHttpPostClient } from '@/main/factories/http/axios/axios-http-client'

export const createAccount = (): CreateAccountService => {
  const apiUrl = makeApiUrl('authentication/authenticate')
  const httpPostClient = makeAxiosHttpPostClient()
  return new CreateAccountService(apiUrl, httpPostClient)
}
