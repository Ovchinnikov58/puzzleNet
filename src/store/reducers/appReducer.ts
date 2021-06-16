import { HIDE_LOADER, SHOW_LOADER, CHANGE_SIDER_VISIBILITY, RESET } from '../types'

const initialState = {
  loading: false,
  siderIsVisible: false,
  alert: null,
}

// eslint-disable-next-line
export const appReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true }
    case HIDE_LOADER:
      return { ...state, loading: false }
    case CHANGE_SIDER_VISIBILITY:
      return { ...state, siderIsVisible: !state.siderIsVisible }
    case RESET:
      return initialState
    default:
      return state
  }
}
