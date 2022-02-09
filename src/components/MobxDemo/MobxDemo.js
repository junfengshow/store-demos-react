import React, { Component } from 'react'
// import { observable, autorun } from 'mobx'
import { inject, observer } from 'mobx-react'
import UserInfo from './UserInfo'

@inject('appState')
@observer
class MobxDemo extends Component {
  constructor (props) {
    super(props)
    this.state = { age: 1 }
    
  }
  componentDidMount () {
    
    // this.todoStore.todos.push('hello')
  }
  addTodo = (e) => {
    e.preventDefault()
    const { appState } = this.props
    appState.addTodo()
    appState.total = 10
    this.setState({ age: this.state.age + 1 })
  }
  render () {
    const { appState } = this.props
    const { todos } = appState
    const { age } = this.state
    return (
      <div>
        <div>
          <a href="#" onClick={this.addTodo}>addTodo</a>
        </div>
        {
          todos && todos.map((item, i) => (
            <p key={i}>{item}</p>
          ))
        }
        <UserInfo todos={todos} age={age} />
      </div>
    )
  }
}
export default MobxDemo
