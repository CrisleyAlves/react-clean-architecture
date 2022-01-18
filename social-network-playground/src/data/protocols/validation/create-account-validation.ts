import { CreateAccountParams } from '@/domain/usecases'

export interface ParamError {
  name: string
  value: string
  message: string
}

export interface CreateAccountValidation {
  validate (params: CreateAccountParams): ParamError[]
}
