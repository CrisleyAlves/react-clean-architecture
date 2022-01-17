import { SendFriendRequestService } from '@/data/usecases/friend-request/send-friend-request'
import { makeApiUrl } from '@/main/factories/http/api/make-api-url'
import { makeHeaders } from '@/main/factories/http/headers/make-headers'
import { makeAxiosHttpPostClient } from '../../http/axios/axios-http-client'

export const approveFriendRequest = (): SendFriendRequestService => {
  const path = 'request/approve'
  const url = makeApiUrl(path)
  const config = makeHeaders({
    headers: {
      Authorization: 'Bearer eyJhb'
    }
  })
  const httpPostClient = makeAxiosHttpPostClient(config)
  return new SendFriendRequestService(url, httpPostClient)
}
