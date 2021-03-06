/**
 * 
 * redux 示例
 */
import React, { useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import store from './store';
import { injectReducers, syncReducer } from './reducers';
import { getUserList } from '../utils';

// 同步action
const setAge = (age) => {
  return {
    type: 'add_age_saga',
    age: age
  }
}
// 异步action
const getList = () => {
  return {
    type: 'fetch_user_list',
  }
}

// 同步reducer
@connect(({ userReducer }) => ({
  ...userReducer
}), { setAge, getList })
class UserList extends React.Component {
  componentDidMount () {
    this.getList();
  }
  // 异步actions
  getList = () => {
    const { getList } = this.props;
    getList && getList();
  }
  addAge = () => {
    const { setAge, age } = this.props;
    setAge && setAge(age + 1)
  }
  render () {
    const { age, userList } = this.props;
    return (
      <div>
        <a onClick={this.addAge}>获取列表</a>
        <div>age: {age}</div>
        {
          userList && userList.map((user) => (
            <div key={user}>{user}</div>
          ))
        }
      </div>
    )
  }
}

// 异步注入reducer
@connect((state) => {
  return {
    ...state.userReducer
  }
}, { setAge })
class SyncReducers extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      const { age, setAge } = this.props;
      injectReducers(store, {
        key: 'syncReducer',
        value: syncReducer,
      })
      setAge(age + 1);
    }, 3000);
  }
  render () {
    const { age } = this.props;
    return (
      <div>this is sync component age: {age}</div>
    )
  }
} 

const ReduxDemo = () => {
  return (
    <Provider store={store}>
      <UserList />
      <SyncReducers />
    </Provider>
  )
}
export default ReduxDemo;
