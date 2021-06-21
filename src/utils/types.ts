export type RootState = {
  app: AppState
  posts: PostsState
  auth: AuthState
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

export type AuthState = {
  user: string
  isAuth: boolean
  id: string
}

export type Post = {
  url: string
  id: string
  title: string
}

export type AuthControl = {
  login: string | null
  password: string | null
  history: any
}

export type User = {
  id: string
  login: string
  password: string
}

export type Message = {
  id: string
  user: string
  message: string
}
