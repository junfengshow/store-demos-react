/* eslint-disable no-constant-condition */

import { put, takeEvery, delay } from 'redux-saga/effects'

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT', count: 1 })
}

export default function* rootSaga () {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
