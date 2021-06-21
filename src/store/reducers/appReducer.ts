import { HIDE_LOADER, SHOW_LOADER, CHANGE_SIDER_VISIBILITY, RESET, CHANGE_THEME } from '../types'

const initialState = {
  loading: false,
  siderIsVisible: false,
  darkTheme: false,
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
    case CHANGE_THEME:
      return { ...state, darkTheme: !state.darkTheme }
    case RESET:
      return initialState
    default:
      return state
  }
}
