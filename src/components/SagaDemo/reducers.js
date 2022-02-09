import { combineReducers } from 'redux'

export const SAGA_COUNT_ADD = 'SAGA_COUNT_ADD'
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'

export const sageCountAdd = (count) => {
  return {
    type: SAGA_COUNT_ADD,
    count
  }
}

const HANDLE_ACIOTNS = {
  [SAGA_COUNT_ADD]: (state, action) => Object.assign({}, state, action),
  [FETCH_LIST_SUCCESS]:  (state, action) => Object.assign({}, state, action),
}

const sageInitialState = {
  count: 1
}
function sagaReducers (state = sageInitialState, action) {
  const handle = HANDLE_ACIOTNS[action.type]
  return handle ? handle(state, action) : state
}

export function makeReducers () {
  return combineReducers({
    sagaReducers
  })
}
