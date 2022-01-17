import { HttpPutClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, ServerError } from '@/domain/errors'
import { UserEdit } from '@/domain/models/user'
import { UpdateUser } from '@/domain/usecases/user/update-user'

export class UpdateUserService implements UpdateUser {
  constructor (
    private readonly url: string,
    private readonly httpPutClient: HttpPutClient<any, any>
  ) {}

  async update (params: UserEdit): Promise<UserEdit> {
    const httpResponse = await this.httpPutClient.put({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
