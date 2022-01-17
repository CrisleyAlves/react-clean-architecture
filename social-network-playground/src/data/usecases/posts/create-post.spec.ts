import faker from 'faker'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { ServerError } from '@/domain/errors'
import { CreatePostService } from './create-post'
import { mockCreatePostParam } from '@/domain/test/posts/mock-create-post'

interface SutTypes {
  sut: CreatePostService
  httpPostClientSpy: HttpPostClientSpy<any, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<any, any>()
  const sut = new CreatePostService(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('ListFriend', () => {
  test('Should call HttpGetClient with correct url ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.createPost(mockCreatePostParam())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.createPost(mockCreatePostParam())
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should ensure that data is being sent to the server ', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)
    const mockedCreatPost = mockCreatePostParam()
    const spyCreatePost = jest.spyOn(sut, 'createPost')
    await sut.createPost(mockedCreatPost)
    expect(spyCreatePost).toHaveBeenCalledWith(mockedCreatPost)
  })
})
