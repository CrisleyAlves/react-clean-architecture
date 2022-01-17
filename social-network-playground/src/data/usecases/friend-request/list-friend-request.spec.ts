import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { ServerError } from '@/domain/errors'
import { ListFriendRequestService } from './list-friend-request'
import { mockFriendRequestList } from '@/domain/test/friend-request/mock-friend-request-list'

interface SutTypes {
  sut: ListFriendRequestService
  httpGetClientSpy: HttpGetClientSpy<any, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<any, any>()
  const sut = new ListFriendRequestService(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('ListFriendRequestService', () => {
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

  test('Should ensure that post data is being sent to the server ', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)
    const mockedFriendRequestList = mockFriendRequestList()
    jest.spyOn(sut, 'list').mockReturnValueOnce(
      new Promise(resolve => resolve(mockedFriendRequestList))
    )
    const data = await sut.list()
    expect(data).toEqual(mockedFriendRequestList)
  })
})
