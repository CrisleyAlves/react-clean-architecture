import { CreateAccountService } from '@/data/usecases/create-account/create-account'
import { CreateAccountValidator } from '@/infra/validators/authentication/create-account-validator'
import { makeApiUrl } from '@/main/factories/http/api/make-api-url'
import { makeAxiosHttpPostClient } from '@/main/factories/http/axios/axios-http-client'

export const CreateAccount = (): CreateAccountService => {
  const apiUrl = makeApiUrl('authentication/authenticate')
  const createAccountValidator = new CreateAccountValidator()
  const httpPostClient = makeAxiosHttpPostClient()
  return new CreateAccountService(apiUrl, createAccountValidator, httpPostClient)
}
