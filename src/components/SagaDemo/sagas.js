import { takeEvery, put, all, delay, select } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'

import { FETCH_LIST_SUCCESS } from './reducers'
export const SAGA_FETCH_LIST = 'SAGA_FETCH_LIST'
export const SAGA_FETCH_DETAILS = 'SAGA_FETCH_DETAILS'
// export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'

function *fetchSuccess () {}

export function *fetchList (action) {
  const state = yield select()
  yield delay(1000)
  yield put({ type: FETCH_LIST_SUCCESS, count: 10 })
}
export function fetchListDispatch () {
  return {
    type: SAGA_FETCH_LIST
  }
}


function *fetchDetails () {
  yield delay(2000)
  yield put({ type: FETCH_LIST_SUCCESS, count: 11 })
}

export function *homeSaga (sageMiddleware) {
  
  yield takeEvery(SAGA_FETCH_DETAILS, fetchDetails)
}

export function *rootSaga (sageMiddleware) {
  yield takeEvery(SAGA_FETCH_LIST, fetchList)
  sageMiddleware.run(homeSaga)
  // yield takeEvery(FETCH_LIST_SUCCESS, fetchListSuccess)
}
