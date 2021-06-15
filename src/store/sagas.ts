import { takeEvery, put, call } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import { REST_API } from '../utils/constants'
import { Post } from '../utils/types'
import { FETCH_POSTS, REQUEST_POSTS } from './types'
import { hideLoader, showLoader } from './actions'

function* sagaWorker({ value }: AnyAction) {
  try {
    yield put(showLoader())
    const payload: Array<Post> = yield call(() => fetchPosts(value))
    yield put({ type: FETCH_POSTS, payload })
    yield put(hideLoader())
  } catch (e) {
    // yield put(showAlert('Что-то пошло не так'))
    yield put(hideLoader())
  }
}

async function fetchPosts(n: number) {
  const value = n ?? 30

  const response = await fetch(`${REST_API}?&limit=${value}`)
  return response.json()
}

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker)
}
