export type FriendRequest = {
  _id: string
  sent: string
  received: string
  status: 'pending' | 'approved' | 'denied'
}
