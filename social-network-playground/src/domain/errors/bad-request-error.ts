export class BadRequestError extends Error {
  constructor () {
    super('BadRequest Error')
    this.name = 'BadRequestError'
  }
}
