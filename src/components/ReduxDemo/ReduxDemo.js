import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from './redux'
import UserInfo from './UserInfo'

function addTodo (text) {
  
  return {
    type: 'ADD_TODO',
    text
  }
}
function removeTodo (index) {
  return {
    type: 'REMOVE_TODO',
    index
  }
}

function asyncTodo () {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(addTodo('asyncTodo'))
    }, 1000)
  }
}

const TodoActions = {
  addTodo,
  removeTodo,
  asyncTodo
}

// @connect((state) => {
//   console.log(state)
//   return {}
// }, {})
class ReduxDemo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: {},
      todo: []
    }
    this.store = props.store
    this.boundActionCreators = bindActionCreators(TodoActions, this.store.dispatch)
  }
  componentDidMount () {
    this.unSubscribe = this.store.subscribe(() => {
      // console.log('this.unSubscribe', this.store.getState().userReducer)
      this.setState({
        ...this.store.getState().userReducer
      })
    })
  }

  // 获取用户信息
  getUserInfo = (e) => {
    e.preventDefault()
    
    this.store.dispatch({
      type: 'GET_USER_INFO',
      payload: { userInfo: { name: 'zhangsan' } }
    })

    // 这个可以直接传递到子组件 使得子组件无感知dispatch
    this.boundActionCreators.addTodo('use redux')
    // 也可以
    const action = TodoActions.addTodo('add todo')
    this.store.dispatch(action)

    // 异步action
    // this.boundActionCreators.asyncTodo()
    this.store.dispatch(TodoActions.asyncTodo())
  }

  // 更改用户姓名
  changeUserName = (payload) => {
    this.store.dispatch({
      type: 'SET_USER_INFO',
      payload
    })
  }

  componentWillUnmount () {
    this.unSubscribe && this.unSubscribe()
  }
  render () {
    const { userInfo, todo } = this.state
    return (
      <div>
        <a href="#" onClick={this.getUserInfo}>获取用户信息</a>
        <p>{userInfo.name}</p>
        {
          todo && todo.map((item, i) => (
            <div key={i}>{item}</div>
          ))
        }
        <UserInfo 
          changeUserName={this.changeUserName}
        />
      </div>
    )
  }
}
export default ReduxDemo
