import { UserFriend } from '../models/user'

export interface ListFriends {
  list (): Promise<UserFriend[]>
}
