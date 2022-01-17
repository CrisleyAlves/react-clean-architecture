import axios, { AxiosRequestConfig } from 'axios'
import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<string, any> {
  constructor (private readonly config?: AxiosRequestConfig) {}

  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body, this.config)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
