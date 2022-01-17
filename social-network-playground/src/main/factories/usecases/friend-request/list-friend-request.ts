import { ListFriendRequestService } from '@/data/usecases/friend-request/list-friend-request'
import { makeAxiosHttpGetClient } from '@/main/factories/http/axios/axios-http-client'
import { makeApiUrl } from '@/main/factories/http/api/make-api-url'
import { makeHeaders } from '@/main/factories/http/headers/make-headers'

export const listFriendRequest = (): ListFriendRequestService => {
  const path = 'request/list'
  const url = makeApiUrl(path)
  const config = makeHeaders({
    headers: {
      Authorization: 'Bearer eyJhbGciO'
    }
  })
  const httpGetClient = makeAxiosHttpGetClient(config)
  const listFriendRequest = new ListFriendRequestService(url, httpGetClient)
  return listFriendRequest
}
