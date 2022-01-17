import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, ServerError } from '@/domain/errors'
import { Post } from '@/domain/models/post'
import { ListPosts } from '@/domain/usecases/posts/list-posts'

export class ListPostsService implements ListPosts {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, any>
  ) {}

  async list (): Promise<Post[]> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
