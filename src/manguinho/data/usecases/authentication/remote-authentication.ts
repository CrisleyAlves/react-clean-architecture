import { HttpPostClient, HttpStatusCode } from '@/manguinho/data/protocols/http'
import { AuthenticationParams, Authentication } from '@/manguinho/domain/usecases/authentication'
import { InvalidCrentialsError, UnexpectedError, NotFoundError, ServerError } from '@/manguinho/domain/errors'
import { AccountModel } from '@/manguinho/domain/models'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCrentialsError()
      case HttpStatusCode.notFound: throw new NotFoundError()
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
