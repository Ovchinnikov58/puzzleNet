import { FETCH_POSTS, CHANGE_LOAD_VALUE, RESET } from '../types'
import { Post } from '../../utils/types'

const initialState = {
  fetchedPosts: [],
  loadValue: 30,
  dist: 0,
}

// eslint-disable-next-line
export const postsReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case FETCH_POSTS:
      // eslint-disable-next-line
      const result = action.payload.data.children.map((payloadItem: any): Post => {
        return {
          url: payloadItem.data?.url,
          id: payloadItem.data?.id,
          title: payloadItem.data?.title,
        }
      })
      return { ...state, fetchedPosts: result, dist: action.payload.data.dist }
    case CHANGE_LOAD_VALUE:
      return { ...state, loadValue: state.loadValue + 10 }
    case RESET:
      return initialState
    default:
      return state
  }
}
