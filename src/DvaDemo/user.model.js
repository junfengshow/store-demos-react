import { getUserList } from '../utils';

export default {
  namespace: 'user',
  state: {
    name: 'zhangsan',
    userList: []
  },
  reducers: {
    add: (state, { name }) => {
      return Object.assign({}, state, {
        name
      });
    },
    getUserList (state, { userList }) {
      return Object.assign({}, state, {
        userList
      });
    }
  },
  effects: {
    *save ({ id }, { call, put }) {
      const userList = yield call(getUserList, id)
      yield put({
        type: 'getUserList',
        userList
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }, done) {
      return history.listen(({ location }) => {
        console.log('location: ', location);
      })
    },
  }
}