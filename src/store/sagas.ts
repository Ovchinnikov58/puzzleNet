import { takeEvery, put, call } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import { toast } from 'react-toastify'
import { REST_API, USERS_API } from '../utils/constants'
import { Post, AuthControl, User } from '../utils/types'
import { FETCH_POSTS, FETCH_USER, REQUEST_POSTS, REQUEST_USER } from './types'
import { hideLoader, showLoader } from './actions'

function* getPostsWorker({ value }: AnyAction) {
  try {
    yield put(showLoader())
    const payload: Array<Post> = yield call(() => fetchPosts(value))
    yield put({ type: FETCH_POSTS, payload })
    yield put(hideLoader())
  } catch (e) {
    yield call(() => toast('Ошибка при загрузке данных!', { type: 'error' }))
    yield put(hideLoader())
  }
}

async function fetchPosts(n: number) {
  const value = n ?? 30

  const response = await fetch(`${REST_API}?&limit=${value}`)
  return response.json()
}

function* authWorker({ values }: AnyAction) {
  try {
    const payload: Array<User> = yield call(() => fetchUsers())
    const result: User = yield call(() => checkUser(values, payload))
    if (result) {
      yield put({ type: FETCH_USER, payload: { ...result } })
      yield call(() => userToLocalStorage(result))
      yield call(() => {
        if (values.location !== '/') {
          values.history.push(values.location)
          return
        }
        if (values.location === '/auth') values.history.push('/')
      })
    } else {
      toast('Пользователя не существует!', { type: 'error' })
    }
  } catch (e) {
    yield call(() => toast('Ошибка при загрузке данных!', { type: 'error' }))
  }
}

async function fetchUsers() {
  const response = await fetch(`${USERS_API}`)
  return response.json()
}

function userToLocalStorage(result: User) {
  localStorage.setItem('id', result.id)
  localStorage.setItem('user', result.login)
  localStorage.setItem('password', result.password)
}

function checkUser(values: AuthControl, payload: Array<User>) {
  return payload.find((user) => (user.login === values.login && user.password === values.password ? user : null))
}

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, getPostsWorker)
  yield takeEvery(REQUEST_USER, authWorker)
}
