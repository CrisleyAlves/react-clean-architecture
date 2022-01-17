import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, ServerError, InvalidCrentialsError } from '@/domain/errors'
import { ActivityModel } from '@/domain/models/'
import { ListUserActivities } from '@/domain/usecases/activities/list-user-activities'

export class ListUserActivitiesService implements ListUserActivities {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, any>
  ) {}

  async list (): Promise<ActivityModel[]> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCrentialsError()
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
