import { makeAxiosHttpGetClient } from '@/main/factories/http/axios/axios-http-client'
import { makeApiUrl } from '@/main/factories/http/api/make-api-url'
import { makeHeaders } from '@/main/factories/http/headers/make-headers'
import { ListUserActivitiesService } from '@/data/usecases/activitiy/list-user-activities'

export const listUserActivities = (): ListUserActivitiesService => {
  const path = 'users/notifications'
  const url = makeApiUrl(path)
  const config = makeHeaders({
    headers: {
      Authorization: 'Bearer eyJhb'
    }
  })
  const httpGetClient = makeAxiosHttpGetClient(config)
  return new ListUserActivitiesService(url, httpGetClient)
}
