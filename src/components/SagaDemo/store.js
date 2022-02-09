import { createStore, applyMiddleware } from 'redux'
import { makeReducers } from './reducers'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { rootSaga, homeSaga } from './sagas'

const logger = createLogger()
const sageMiddleware = createSagaMiddleware(rootSaga)
const middlewares = [sageMiddleware, logger]
const _sagaStore = createStore(makeReducers(), applyMiddleware(...middlewares))
// _sagaStore.sageMiddleware = sageMiddleware
// sageMiddleware.run(homeSaga)
sageMiddleware.run(rootSaga, sageMiddleware)
export const sagaStore = _sagaStore 
