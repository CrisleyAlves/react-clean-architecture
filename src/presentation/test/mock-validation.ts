import { Validation } from '../protocols/validation'

export class ValidationSpy implements Validation {
  input: object
  errorMessage: string
  fieldName: string
  fieldValue: string

  validate (fieldName, fieldValue): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}
