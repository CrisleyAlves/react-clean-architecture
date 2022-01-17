export type UserFriend = {
  _id: string
  first_name: string
  last_name: string
  gender: string
  photo: string
}

export type UserEdit = {
  _id: string
  first_name: string
  last_name: string
  country: string
  city: string
  gender: 'male' | 'female'
  email: string
  job: string
  background: string
  photo: string
  biography: string
  twitter: string
  facebook: string
  instagram: string
  youtube: string
}

export type UserListActivityModel = {
  _id: string
  first_name: string
}
