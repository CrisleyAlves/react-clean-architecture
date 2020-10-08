import axios from 'axios'

import { AxiosHttpClient } from './axios-http-client'
import { mockAxios } from '@/infra/test'
import { mockPostRequest } from '@/data/test/'

jest.mock('axios')

interface SutTypes {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => ({
  sut: new AxiosHttpClient(),
  mockedAxios: mockAxios()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const { mockedAxios, sut } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body', () => {
    const { mockedAxios, sut } = makeSut()
    const promise = sut.post(mockPostRequest())
    const [resolvedPromise] = mockedAxios.post.mock.results
    expect(promise).toEqual(resolvedPromise.value)
  })
})
