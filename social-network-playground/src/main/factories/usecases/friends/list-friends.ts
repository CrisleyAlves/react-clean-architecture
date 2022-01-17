import { makeAxiosHttpGetClient } from '@/main/factories/http/axios/axios-http-client'
import { makeApiUrl } from '@/main/factories/http/api/make-api-url'
import { makeHeaders } from '@/main/factories/http/headers/make-headers'
import { ListFriendsService } from '@/data/usecases/list-friends/list-friends'

export const listFriends = (): ListFriendsService => {
  const path = 'users/friends'
  const url = makeApiUrl(path)
  const config = makeHeaders({
    headers: {
      Authorization: 'Bearer eyJhbG'
    }
  })
  const httpGetClient = makeAxiosHttpGetClient(config)
  return new ListFriendsService(url, httpGetClient)
}
