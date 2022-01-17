export interface ApproveFriendRequestParams {
  _id: string
  received: string
  sent: string
}

export interface ApproveFriendRequest {
  approve(params: ApproveFriendRequestParams): Promise<void>
}
