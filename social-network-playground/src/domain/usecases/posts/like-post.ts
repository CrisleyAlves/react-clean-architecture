export interface LikePostParams {
  postId: string
  userId: string
}

export interface LikePost {
  likePost (params: LikePostParams): Promise<void>
}
