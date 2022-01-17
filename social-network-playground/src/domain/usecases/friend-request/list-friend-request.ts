import { FriendRequest } from '@/domain/models/'

export interface ListFriendRequest {
  list(): Promise<FriendRequest[]>
}
