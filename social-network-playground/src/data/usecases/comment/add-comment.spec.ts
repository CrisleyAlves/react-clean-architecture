import faker from 'faker'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { ServerError } from '@/domain/errors'
import { AddCommentService } from './add-comment'
import { mockAddComment } from '@/domain/test/comment/mock-add-comment'

interface SutTypes {
  sut: AddCommentService
  httpPostClientSpy: HttpPostClientSpy<any, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<any, any>()
  const sut = new AddCommentService(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('AddCommentService', () => {
  test('Should call HttpGetClient with correct url ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddComment())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddComment())
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should ensure that data is being sent to the server ', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut(url)
    const mockedCreatPost = mockAddComment()
    const spyCreatePost = jest.spyOn(sut, 'add')
    await sut.add(mockedCreatPost)
    expect(spyCreatePost).toHaveBeenCalledWith(mockedCreatPost)
  })
})
