import axios from 'axios'

import { AxiosHttpPutClient } from './axios-http-put-client'
import { mockAxios } from '@/infra/test'
import { mockPutRequest } from '@/data/test/mock-http-put'

jest.mock('axios')

interface SutTypes {
  sut: AxiosHttpPutClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => ({
  sut: new AxiosHttpPutClient(),
  mockedAxios: mockAxios()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const mockedRequest = mockPutRequest()
    const { mockedAxios, sut } = makeSut()
    await sut.put(mockedRequest)
    expect(mockedAxios.put).toHaveBeenCalledWith(mockedRequest.url, mockedRequest.body, undefined)
  })

  test('Should return the correct statusCode and body', () => {
    const { mockedAxios, sut } = makeSut()
    const promise = sut.put(mockPutRequest())
    const [resolvedPromise] = mockedAxios.put.mock.results
    expect(promise).toEqual(resolvedPromise.value)
  })
})
