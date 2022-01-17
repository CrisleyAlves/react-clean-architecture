import { CreatePostService } from '@/data/usecases/posts/create-post'
import { makeApiUrl } from '../../http/api/make-api-url'
import { makeAxiosHttpPostClient } from '../../http/axios/axios-http-client'

export const createPost = (): CreatePostService => {
  const url = makeApiUrl('/posts/new')
  const config = {
    headers: {
      Authorization: 'Bearer aldkjf'
    }
  }
  const httpPostClient = makeAxiosHttpPostClient(config)
  return new CreatePostService(url, httpPostClient)
}
