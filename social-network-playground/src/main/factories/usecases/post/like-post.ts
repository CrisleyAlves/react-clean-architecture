import { LikePostService } from '@/data/usecases/posts/like-post'
import { makeApiUrl } from '../../http/api/make-api-url'
import { makeAxiosHttpPostClient } from '../../http/axios/axios-http-client'

export const likePost = (): LikePostService => {
  const url = makeApiUrl('/posts/likeOrDeslikePost')
  const config = {
    headers: {
      Authorization: 'Bearer aldkjf'
    }
  }
  const httpPostClient = makeAxiosHttpPostClient(config)
  return new LikePostService(url, httpPostClient)
}
