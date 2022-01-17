import faker from 'faker'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { BadRequestError, ServerError } from '@/domain/errors'
import { ApproveFriendRequestService } from './approve-friend-request'
import { mockApproveFriendRequestParams } from '@/domain/test/friend-request/mock-approve-friend-request'

interface SutTypes {
  sut: ApproveFriendRequestService
  httpPostClientSpy: HttpPostClientSpy<any, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<any, any>()
  const sut = new ApproveFriendRequestService(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('ApproveFriendRequestService', () => {
  test('Should call HttpGetClient with correct url ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    const mockApproveFriendRequest = mockApproveFriendRequestParams()
    await sut.approve(mockApproveFriendRequest)
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should throw BadRequestError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const mockApproveFriendRequest = mockApproveFriendRequestParams()
    const promise = sut.approve(mockApproveFriendRequest)
    await expect(promise).rejects.toThrow(new BadRequestError())
  })

  test('should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const mockApproveFriendRequest = mockApproveFriendRequestParams()
    const promise = sut.approve(mockApproveFriendRequest)
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should ensure that post data is being sent to the server ', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)
    const mockApproveFriendRequest = mockApproveFriendRequestParams()
    const spySend = jest.spyOn(sut, 'approve')
    await sut.approve(mockApproveFriendRequest)
    expect(spySend).toHaveBeenCalledWith(mockApproveFriendRequest)
  })
})
