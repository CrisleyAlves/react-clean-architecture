import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { BadRequestError, InvalidCrentialsError, ServerError, UnexpectedError } from '@/domain/errors'
import { ApproveFriendRequest, ApproveFriendRequestParams } from '@/domain/usecases/friend-request/approve-friend-request'

export class ApproveFriendRequestService implements ApproveFriendRequest {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<any, any>
  ) {}

  async approve (params: ApproveFriendRequestParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.badRequest: throw new BadRequestError()
      case HttpStatusCode.unauthorized: throw new InvalidCrentialsError()
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
