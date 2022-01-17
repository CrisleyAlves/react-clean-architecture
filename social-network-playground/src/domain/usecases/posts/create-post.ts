export interface CreatePostParam {
  content: string
  photo?: string
}

export interface CreatePost {
  createPost(postData: CreatePostParam): Promise<void>
}
