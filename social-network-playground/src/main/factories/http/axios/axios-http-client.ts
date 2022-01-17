import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { AxiosHttpGetClient } from '@/infra/http/axios-http-client/axios-http-get-client'
import { AxiosHttpPutClient } from '@/infra/http/axios-http-client/axios-http-put-client'
import { AxiosRequestConfig } from 'axios'

export const makeAxiosHttpGetClient = (config?: AxiosRequestConfig): AxiosHttpGetClient => new AxiosHttpGetClient(config)

export const makeAxiosHttpPostClient = (config?: AxiosRequestConfig): AxiosHttpClient => new AxiosHttpClient(config)

export const makeAxiosHttpPuttClient = (config?: AxiosRequestConfig): AxiosHttpPutClient => new AxiosHttpPutClient(config)
