import { observable, action, computed, when, autorun } from 'mobx'

class AppState {
  constructor () {
    when(() => !this.isVisible, () => { console.log('this is when') })
  }
  todos = observable([], {deep: true})
  @observable name = 'zhangsan'
  @observable price = 10
  @observable amount = 8
  sum = computed(() => {
    return this.todos.length
  })
  @computed get isVisible () {
    return false
  }
  @computed get total () {
    console.log('this is total function')
    return this.price * this.amount
  }
  set total (total) {
    console.log('this is set total function', total)
    this.price = total / this.amount
  }

  disposer = autorun(() => { console.log('this is autorun: ', this.sum.get()) })
  
  @action addTodo = async () => {
    setTimeout(() => {
      let { todos } = this
      todos.push('hello')
      // this.todos = todos
    }, 2000)
  }
}

const store = {
  appState: new AppState()
}
export default store
