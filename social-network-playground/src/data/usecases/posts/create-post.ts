import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, ServerError, InvalidCrentialsError } from '@/domain/errors'
import { CreatePost, CreatePostParam } from '@/domain/usecases/posts/create-post'

export class CreatePostService implements CreatePost {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<any, any>
  ) {}

  async createPost (postData: CreatePostParam): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: postData
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCrentialsError()
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
