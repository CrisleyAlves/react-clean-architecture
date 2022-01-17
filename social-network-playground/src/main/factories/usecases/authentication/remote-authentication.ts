import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeApiUrl } from '@/main/factories/http/api/make-api-url'
import { makeAxiosHttpPostClient } from '@/main/factories/http/axios/axios-http-client'

export const remoteAuthentication = (): RemoteAuthentication => {
  const apiUrl = makeApiUrl('authentication/authenticate')
  const httpPostClient = makeAxiosHttpPostClient()
  return new RemoteAuthentication(apiUrl, httpPostClient)
}
