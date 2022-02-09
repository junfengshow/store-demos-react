import { createStore, applyMiddleware } from './redux'
import { createLogger } from 'redux-logger'
// import thunk from './redux-thunk'

import reducers from './reducer'
import createMiddleware from 'redux-saga'
import sagas from '../sagas'
const sagaMiddle = createMiddleware()
// console.log(sagaMiddle)
const middlewares = [sagaMiddle]

const logger = createLogger({}) 

// middleware

// 第一层
// middlewares.map 中执行
middlewares.push(({ dispatch, getState }) => {
  // console.log('第一层')
  return (_dispatch) => {
    // console.log('compose 返回的函数')
    return (action) => {
      // console.log('触发 action')
      _dispatch(action)
    }
  }
})

middlewares.push(logger)


const store = createStore(reducers, applyMiddleware(...middlewares))

sagaMiddle.run(sagas)

export default store
