import { combineReducers } from './redux'

export const COUNT_ADD = 'COUNT_ADD'
export const INCREMENT ='INCREMENT'

const userReducerInitial = {
  userInfo: { name: '' },
  todo: []
}
function userReducer (state = userReducerInitial, action) {
  
  switch (action.type) {
    case 'GET_USER_INFO':
      return Object.assign({}, state, action.payload)
    case 'SET_USER_INFO':
      return Object.assign({}, state, action.payload)
    case 'ADD_TODO':
      const { todo } = state
      todo.push(action.text)
      return Object.assign({}, state, { todo })
    default :
      return state 
  }
}

const sagaReducerInitial = {
  count: 0
}

export const countAddFunc = (count) => {
  return {
    type: COUNT_ADD,
    count
  }
}
export const incrementSync = () => {
  return {
    type: 'INCREMENT_ASYNC'
  }
}

const SAGA_ACTIONS = {
  [COUNT_ADD]: (state, action) => {
    return Object.assign({}, state, { count: action.count })
  },
  [INCREMENT]: (state, action) => {
    return Object.assign({}, state, { count: action.count })
  },
}

function sagaReducers (state = sagaReducerInitial, action) {
  const handle = SAGA_ACTIONS[action.type]
  return handle ? handle(state, action) : state
}

export const makeReducers = () => {
  return combineReducers({ userReducer, sagaReducers })
}

export default makeReducers()
