import { Dispatch } from 'redux'
import {
  HIDE_ALERT,
  HIDE_LOADER,
  REQUEST_POSTS,
  SHOW_ALERT,
  SHOW_LOADER,
  CHANGE_SIDER_VISIBILITY,
  CHANGE_LOAD_VALUE,
} from './types'

export function changeSiderVisibility() {
  return {
    type: CHANGE_SIDER_VISIBILITY,
  }
}

export function changeLoadValue() {
  return {
    type: CHANGE_LOAD_VALUE,
  }
}

export function showLoader() {
  return {
    type: SHOW_LOADER,
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
  }
}

export function showAlert(text: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    })

    setTimeout(() => {
      dispatch(hideAlert())
    }, 3000)
  }
}

export function hideAlert() {
  return {
    type: HIDE_ALERT,
  }
}

export function fetchPosts(value: number) {
  return {
    type: REQUEST_POSTS,
    value,
  }
}
