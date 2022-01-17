import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCrentialsError, ServerError, UnexpectedError } from '@/domain/errors'
import { sendFriendRequest } from '@/domain/usecases/friend-request/send-friend-request'

export class SendFriendRequestService implements sendFriendRequest {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<any, any>
  ) {}

  async send (userId: string): Promise<boolean> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: userId
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCrentialsError()
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
