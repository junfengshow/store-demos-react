import { createContext, useContext, useReducer } from 'react';

export const  MyContext = createContext();

export const useMyContext = () => useContext(MyContext);


const initialState = {
  age: 1
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'add_age':
      return Object.assign({}, state, { age: action.age });
    default :
      return state;
  }
}

export const useMyReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, (action) => {
    console.log('action', action)
    dispatch(action)
  }]
}
