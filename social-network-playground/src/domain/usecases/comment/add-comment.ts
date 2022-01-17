export type AddCommentParam = {
  postId: string
  comment: string
}

export interface AddComment {
  add: (params: AddCommentParam) => void
}
