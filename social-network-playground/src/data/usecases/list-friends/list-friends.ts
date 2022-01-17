import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, ServerError } from '@/domain/errors'
import { ListFriends } from '@/domain/usecases/list-friends'
import { UserFriend } from '@/domain/models/user'

export class ListFriendsService implements ListFriends {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, any>
  ) {}

  async list (): Promise<UserFriend[]> {
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
