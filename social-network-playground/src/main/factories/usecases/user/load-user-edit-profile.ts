import { LoadUserEditProfileService } from '@/data/usecases/user/load-user-edit-profile'
import { makeApiUrl } from '../../http/api/make-api-url'
import { makeAxiosHttpGetClient } from '../../http/axios/axios-http-client'

export const loadUserEditProfile = (): LoadUserEditProfileService => {
  const url = makeApiUrl('/settings')
  const config = {
    headers: {
      Authorization: 'Bearer aldkjf'
    }
  }
  const httpGetClient = makeAxiosHttpGetClient(config)
  return new LoadUserEditProfileService(url, httpGetClient)
}
