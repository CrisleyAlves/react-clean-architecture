import faker from 'faker'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { ServerError } from '@/domain/errors'
import { SendFriendRequestService } from './send-friend-request'

interface SutTypes {
  sut: SendFriendRequestService
  httpPostClientSpy: HttpPostClientSpy<any, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<any, any>()
  const sut = new SendFriendRequestService(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('SendFriendRequestService', () => {
  test('Should call HttpGetClient with correct url ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    const userId = faker.random.uuid()
    await sut.send(userId)
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const userId = faker.random.uuid()
    const promise = sut.send(userId)
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should ensure that post data is being sent to the server ', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)
    const userId = faker.random.uuid()
    const spySend = jest.spyOn(sut, 'send')
    await sut.send(userId)
    expect(spySend).toHaveBeenCalledWith(userId)
  })
})
