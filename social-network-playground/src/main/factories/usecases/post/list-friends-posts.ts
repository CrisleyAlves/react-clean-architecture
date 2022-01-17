import { ListPostsService } from '@/data/usecases/posts/list-posts'
import { makeApiUrl } from '../../http/api/make-api-url'
import { makeAxiosHttpGetClient } from '../../http/axios/axios-http-client'

export const listFriendsPosts = (): ListPostsService => {
  const url = makeApiUrl('/posts/friends')
  const config = {
    headers: {
      Authorization: 'Bearer aldkjf'
    }
  }
  const httpGetClient = makeAxiosHttpGetClient(config)
  return new ListPostsService(url, httpGetClient)
}
