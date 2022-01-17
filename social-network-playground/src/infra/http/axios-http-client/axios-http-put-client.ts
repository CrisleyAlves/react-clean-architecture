import axios, { AxiosRequestConfig } from 'axios'
import { HttpPutClient, HttpPutParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpPutClient implements HttpPutClient<string, any> {
  constructor (private readonly config?: AxiosRequestConfig) {}

  async put (params: HttpPutParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.put(params.url, params.body, this.config)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
