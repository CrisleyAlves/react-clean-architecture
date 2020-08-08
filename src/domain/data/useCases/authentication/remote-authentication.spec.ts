import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '../../data/test/mock-http-client'

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct url', async () => {
    const url = 'any_url'
    const httpClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpClientSpy)
    await sut.auth()

    expect(httpClientSpy.url).toBe(url)
  })
})
