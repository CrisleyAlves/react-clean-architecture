import { AddCommentService } from '@/data/usecases/comment/add-comment'
import { makeApiUrl } from '../../http/api/make-api-url'
import { makeAxiosHttpPostClient } from '../../http/axios/axios-http-client'

export const addComment = (): AddCommentService => {
  const url = makeApiUrl('/posts/comment/add')
  const config = {
    headers: {
      Authorization: 'Bearer aldkjf'
    }
  }
  const httpPostClient = makeAxiosHttpPostClient(config)
  return new AddCommentService(url, httpPostClient)
}
