import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { ServerError } from '@/domain/errors'
import { LoadUserEditProfileService } from './load-user-edit-profile'
import { mockLoadUserEditProfile } from '@/domain/test/user/mock-load-user-edit-profile'

interface SutTypes {
  sut: LoadUserEditProfileService
  httpGetClientSpy: HttpGetClientSpy<any, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<any, any>()
  const sut = new LoadUserEditProfileService(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('LoadUserEditProfileService', () => {
  test('Should call HttpGetClient with correct url ', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should list user friends on success ', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)

    const mockedUser = mockLoadUserEditProfile()
    jest.spyOn(sut, 'load').mockReturnValueOnce(
      new Promise(resolve => resolve(mockedUser))
    )

    const data = await sut.load()
    expect(data).toEqual(mockedUser)
  })
})
