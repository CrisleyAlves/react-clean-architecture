import faker from 'faker'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { ServerError } from '@/domain/errors'
import { LikePostService } from './like-post'
import { mockLikePostParams } from '@/domain/test/posts/mock-like-post'

interface SutTypes {
  sut: LikePostService
  httpPostClientSpy: HttpPostClientSpy<any, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<any, any>()
  const sut = new LikePostService(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('LikePostService', () => {
  test('Should call HttpGetClient with correct url ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.likePost(mockLikePostParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.likePost(mockLikePostParams())
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should ensure that post data is being sent to the server ', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)
    const mockedCreatPost = mockLikePostParams()
    const spyCreatePost = jest.spyOn(sut, 'likePost')
    await sut.likePost(mockedCreatPost)
    expect(spyCreatePost).toHaveBeenCalledWith(mockedCreatPost)
  })
})
