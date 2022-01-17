import faker from 'faker'
import { HttpStatusCode } from '@/data/protocols/http'
import { ServerError } from '@/domain/errors'
import { UpdateUserService } from './update-user'
import { mockLoadUserEditProfile } from '@/domain/test/user/mock-load-user-edit-profile'
import { HttpPutClientSpy } from '@/data/test/mock-http-put-client'

interface SutTypes {
  sut: UpdateUserService
  httpPutClientSpy: HttpPutClientSpy<any, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPutClientSpy = new HttpPutClientSpy<any, any>()
  const sut = new UpdateUserService(url, httpPutClientSpy)

  return {
    sut,
    httpPutClientSpy
  }
}

describe('UpdateUserService', () => {
  test('Should call HttpPutClient with correct url ', async () => {
    const url = faker.internet.url()
    const { sut, httpPutClientSpy } = makeSut(url)
    await sut.update(mockLoadUserEditProfile())
    expect(httpPutClientSpy.url).toBe(url)
  })

  test('should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPutClientSpy } = makeSut()
    httpPutClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.update(mockLoadUserEditProfile())
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should ensure that data is being sent to the server ', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)
    const mockedCreatPost = mockLoadUserEditProfile()
    const spyUpdate = jest.spyOn(sut, 'update')
    await await sut.update(mockedCreatPost)
    expect(spyUpdate).toHaveBeenCalledWith(mockedCreatPost)
  })
})
