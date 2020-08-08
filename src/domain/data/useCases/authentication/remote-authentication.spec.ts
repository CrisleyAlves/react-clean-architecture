import { HttpPostClient } from 'domain/data/data/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct url', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }

    const url = 'any_url'
    const httpClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpClientSpy)
    await sut.auth()

    expect(httpClientSpy.url).toBe(url)
  })
})
