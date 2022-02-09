import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import makeReducers from './reducers';
import createSaga from 'redux-saga';
import mySaga from './saga';

const logger = createLogger({});
const sagaMiddleware = createSaga();

const store = createStore(makeReducers(), applyMiddleware(sagaMiddleware, logger));
store.ayncReducers = {};

sagaMiddleware.run(mySaga);

export default store;
