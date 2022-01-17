import axios from 'axios'

import { AxiosHttpGetClient } from './axios-http-get-client'
import { mockAxios } from '@/infra/test'
import { mockGetRequest } from '@/data/test/mock-http-get'

jest.mock('axios')

interface SutTypes {
  sut: AxiosHttpGetClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => ({
  sut: new AxiosHttpGetClient(),
  mockedAxios: mockAxios()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const config = {
      headers: {
        Authorization: 'Bearer '
      }
    }
    const mockedRequest = mockGetRequest(config)
    const { mockedAxios, sut } = makeSut()
    await sut.get(mockedRequest)
    expect(mockedAxios.get).toHaveBeenCalledWith(mockedRequest.url, mockedRequest.config)
  })

  test('Should return the correct statusCode and body', () => {
    const { mockedAxios, sut } = makeSut()
    const promise = sut.get(mockGetRequest())
    const [resolvedPromise] = mockedAxios.get.mock.results
    expect(promise).toEqual(resolvedPromise.value)
  })
})
