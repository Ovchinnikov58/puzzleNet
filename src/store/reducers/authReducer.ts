import { FETCH_USER, RESET } from '../types'
import { AuthState } from '../../utils/types'

const initialState: AuthState = {
  user: '',
  isAuth: false,
  id: '',
}

// eslint-disable-next-line
export const authReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload
        ? { ...state, user: action.payload.login, id: action.payload.id, isAuth: true }
        : { ...state }
    case RESET:
      return initialState
    default:
      return state
  }
}
