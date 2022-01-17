export interface sendFriendRequest {
  send (userId: string): Promise<boolean>
}
