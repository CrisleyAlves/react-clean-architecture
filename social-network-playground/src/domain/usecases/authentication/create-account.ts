import { AccountModel } from '@/domain/models'

export interface CreateAccountParams {
  first_name: string
  last_name: string
  gender: string
  email: string
  password: string
}

export interface CreateAccount {
  createAccount (params: CreateAccountParams): Promise<AccountModel>
}
