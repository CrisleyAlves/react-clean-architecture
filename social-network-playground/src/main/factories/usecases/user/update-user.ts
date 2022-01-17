import { UpdateUserService } from '@/data/usecases/user/update-user'
import { makeApiUrl } from '../../http/api/make-api-url'
import { makeAxiosHttpPuttClient } from '../../http/axios/axios-http-client'

export const updateUser = (): UpdateUserService => {
  const url = makeApiUrl('/users/update')
  const config = {
    headers: {
      Authorization: 'Bearer aldkjf'
    }
  }
  const httpPutClient = makeAxiosHttpPuttClient(config)
  return new UpdateUserService(url, httpPutClient)
}
