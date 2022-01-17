import { HttpResponse } from '.'

export interface HttpPutParams<T> {
  url: string
  body?: T
}

export interface HttpPutClient<T, R> {
  put(params: HttpPutParams<T>): Promise<HttpResponse<R>>
}
