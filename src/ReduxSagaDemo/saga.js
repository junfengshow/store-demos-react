/**
 * saga
 */
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getUserList } from '../utils';

function * fetchUserList (action) {
  yield call(getUserList);
  const state = yield select();
  yield put({
    type: 'get_user_list',
    userList: ['shangsan']
  });
}

function * mySaga () {
  yield takeEvery('fetch_user_list', fetchUserList)
}
export default mySaga;
