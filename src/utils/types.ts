export type RootState = {
  app: AppState
  posts: PostsState
}

export type AppState = {
  loading: boolean
  siderIsVisible: boolean
}

export type PostsState = {
  fetchedPosts: Array<Post>
  loadValue: number
  dist: number
}

export type Post = {
  url: string
  id: string
  title: string
}
