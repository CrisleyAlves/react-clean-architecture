export type AccountModel = {
  _id: string
  first_name: string
  last_name: string
  gender: string
  photo: string
  token: string
}

export type CreateAccountModel = {
  first_name: string
  last_name: string
  gender: string
  email: string
  password: string
}
