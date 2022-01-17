import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { ServerError } from '@/domain/errors'
import { ListPosts } from '@/domain/usecases/posts/list-posts'
import { mockListPosts } from '@/domain/test/posts/mock-list-posts'
import { ListPostsService } from './list-posts'

interface SutTypes {
  sut: ListPosts
  httpGetClientSpy: HttpGetClientSpy<any, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<any, any>()
  const sut = new ListPostsService(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('ListFriend', () => {
  test('Should call HttpGetClient with correct url ', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.list()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.list()
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should list friends posts with data on success ', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)

    const mockedListPosts = mockListPosts()
    jest.spyOn(sut, 'list').mockReturnValueOnce(
      new Promise(resolve => resolve(mockedListPosts))
    )

    const data = await sut.list()
    expect(data).toEqual(mockedListPosts)
  })

  test('Should list friends posts with no data on success ', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)

    const mockedListPosts = []
    jest.spyOn(sut, 'list').mockReturnValueOnce(
      new Promise(resolve => resolve(mockedListPosts))
    )

    const data = await sut.list()
    expect(data).toEqual(mockedListPosts)
  })
})
