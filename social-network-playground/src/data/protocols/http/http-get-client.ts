import { HttpResponse } from '.'

export interface HttpGetParams<T> {
  url: string
  config?: any
}

export interface HttpGetClient<T, R> {
  get(params: HttpGetParams<T>): Promise<HttpResponse<R>>
}
