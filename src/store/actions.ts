import { AuthControl } from '../utils/types'
import {
  HIDE_LOADER,
  REQUEST_POSTS,
  SHOW_LOADER,
  CHANGE_SIDER_VISIBILITY,
  CHANGE_LOAD_VALUE,
  REQUEST_USER,
  RESET,
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

export function fetchPosts(value: number) {
  return {
    type: REQUEST_POSTS,
    value,
  }
}

export function fetchUser(values: AuthControl) {
  return {
    type: REQUEST_USER,
    values,
  }
}

export function resetStore() {
  return {
    type: RESET,
  }
}
