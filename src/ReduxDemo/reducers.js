import { combineReducers } from 'redux';

const userReducer = (state = {
  age: 1
}, action) => {
  
  switch (action.type) {
    case 'add_age':
      return Object.assign({}, state, { age: action.age });
    default:
      return state;
  }
}

const makeReducers = (ayncReducers) => {
  return combineReducers({
    userReducer,
    ...ayncReducers
  });
}

export const syncReducer = (state = {
  name: 'zhangsan'
}, action) => {
  
  switch (action.type) {
    case 'change_name':
      return Object.assign({}, state, { name: action.name });
    default:
      return state;
  }
}


export const injectReducers = (store, { key, value }) => {
  if (Object.hasOwnProperty.call(store.ayncReducers, key)) {
    return;
  }
  store.ayncReducers[key] = value;
  const reducers = makeReducers(store.ayncReducers);
  store.replaceReducer(reducers);
}

export default makeReducers;
