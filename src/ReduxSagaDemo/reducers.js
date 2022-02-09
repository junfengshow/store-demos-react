import { combineReducers } from 'redux';

const userReducer = (state = {
  age: 1,
  userList: []
}, action) => {
  
  switch (action.type) {
    case 'add_age_saga':
      return Object.assign({}, state, { age: action.age });
    case 'get_user_list':
      return Object.assign({}, state, { userList: action.userList });
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
