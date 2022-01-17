import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, ServerError, InvalidCrentialsError } from '@/domain/errors'
import { LikePost, LikePostParams } from '@/domain/usecases/posts/like-post'

export class LikePostService implements LikePost {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<any, any>
  ) {}

  async likePost (params: LikePostParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCrentialsError()
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
