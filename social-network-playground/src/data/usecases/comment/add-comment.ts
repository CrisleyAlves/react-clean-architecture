import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, ServerError, InvalidCrentialsError } from '@/domain/errors'
import { AddComment, AddCommentParam } from '@/domain/usecases/comment/add-comment'

export class AddCommentService implements AddComment {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<any, any>
  ) {}

  async add (params: AddCommentParam): Promise<void> {
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
