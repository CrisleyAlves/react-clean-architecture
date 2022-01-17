import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCrentialsError, ServerError } from '@/domain/errors'
import { ListUserActivitiesService } from './list-user-activities'
import { mockListUserActivities } from '@/domain/test/activity/mock-list-user-activity'

interface SutTypes {
  sut: ListUserActivitiesService
  httpGetClientSpy: HttpGetClientSpy<any, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<any, any>()
  const sut = new ListUserActivitiesService(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('ListUserActivities', () => {
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

  test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.list()
    await expect(promise).rejects.toThrow(new InvalidCrentialsError())
  })

  test('Should receive listUserActivities on success', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)
    const mockedFriendRequestList = mockListUserActivities()
    jest.spyOn(sut, 'list').mockReturnValueOnce(
      new Promise(resolve => resolve(mockedFriendRequestList))
    )
    const data = await sut.list()
    expect(data).toEqual(mockedFriendRequestList)
  })
})
