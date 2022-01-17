import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, ServerError } from '@/domain/errors'
import { UserEdit } from '@/domain/models/user'
import { LoadUserEditProfile } from '@/domain/usecases/user/load-user-edit-profile'

export class LoadUserEditProfileService implements LoadUserEditProfile {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, any>
  ) {}

  async load (): Promise<UserEdit> {
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
