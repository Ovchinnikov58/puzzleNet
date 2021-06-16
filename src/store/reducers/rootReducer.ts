import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { postsReducer } from './postsReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
  app: appReducer,
  posts: postsReducer,
  auth: authReducer,
})
