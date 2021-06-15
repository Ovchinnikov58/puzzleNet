import { HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER, CHANGE_SIDER_VISIBILITY } from '../types'

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
    case SHOW_ALERT:
      return { ...state, alert: action.payload }
    case HIDE_ALERT:
      return { ...state, alert: null }
    case CHANGE_SIDER_VISIBILITY:
      return { ...state, siderIsVisible: !state.siderIsVisible }
    default:
      return state
  }
}
