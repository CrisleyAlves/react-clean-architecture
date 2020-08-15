export class InvalidCrentialsError extends Error {
  constructor () {
    super('Invalid Credentials')
    this.name = 'InvalidCrentialsError'
  }
}
