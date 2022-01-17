import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { CreateAccount, CreateAccountParams } from '@/domain/usecases/'
import { InvalidCrentialsError, UnexpectedError, NotFoundError, ServerError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

export class CreateAccountService implements CreateAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<CreateAccountParams, AccountModel>
  ) {}

  async createAccount (params: CreateAccountParams): Promise<AccountModel> {
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
