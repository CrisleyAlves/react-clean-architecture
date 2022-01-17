import faker from 'faker'
import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domain/models'
import { CreateAccountParams } from '@/domain/usecases'
import { CreateAccountService } from './create-account'
import { mockAccountModel, mockCreateAccount } from '@/domain/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { ServerError, UnexpectedError } from '@/domain/errors'

interface SutTypes {
  sut: CreateAccountService
  httpPostClientSpy: HttpPostClientSpy<CreateAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<CreateAccountParams, AccountModel>()
  const sut = new CreateAccountService(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('CreateAccount', () => {
  test('Should call HttpPostClient with correct url ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.createAccount(mockCreateAccount())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const createAccountParams = mockCreateAccount()
    await sut.createAccount(createAccountParams)
    expect(httpPostClientSpy.body).toEqual(createAccountParams)
  })

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.createAccount(mockCreateAccount())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.createAccount(mockCreateAccount())
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.createAccount(mockCreateAccount())
    await expect(account).toEqual(httpResult)
  })
})
