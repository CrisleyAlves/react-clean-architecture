import axios, { AxiosRequestConfig } from 'axios'
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpGetClient implements HttpGetClient<string, any> {
  constructor (private readonly config?: AxiosRequestConfig) {}

  async get (params: HttpGetParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.get(params.url, this.config)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
