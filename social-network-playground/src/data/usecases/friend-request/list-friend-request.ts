import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { BadRequestError, InvalidCrentialsError, ServerError, UnexpectedError } from '@/domain/errors'
import { FriendRequest } from '@/domain/models/'
import { ListFriendRequest } from '@/domain/usecases/friend-request/list-friend-request'

export class ListFriendRequestService implements ListFriendRequest {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpGetClient<any, any>
  ) {}

  async list (): Promise<FriendRequest[]> {
    const httpResponse = await this.httpPostClient.get({
      url: this.url
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
