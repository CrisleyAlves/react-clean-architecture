import axios from 'axios'
import { HttpPostClient, HttpPostParams, HttpResponse } from '@/manguinho/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<string, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
