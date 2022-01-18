import { CreateAccountValidation, ParamError } from '@/data/protocols/validation/create-account-validation'
import { CreateAccountParams } from '@/domain/usecases'

export class CreateAccountValidator implements CreateAccountValidation {
  errors?: [ParamError?] = []

  validate (params: CreateAccountParams): ParamError[] {
    for (const param in params) {
      if (params[param].length === 0) {
        const error = {
          name: param,
          value: params[param],
          message: 'required field'
        }
        this.errors.push(error)
      }
    }
    return this.errors
  }
}
