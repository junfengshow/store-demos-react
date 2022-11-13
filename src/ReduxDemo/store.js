import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import makeReducers from './reducers';
import thunk from 'redux-thunk';

const logger = createLogger({});

const store = createStore(makeReducers(), applyMiddleware(thunk));
store.ayncReducers = {};

export default store;
