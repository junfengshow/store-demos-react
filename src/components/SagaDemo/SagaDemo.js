import React, { Component } from 'react'
import { connect } from '../ReduxDemo/react-redux'
import { sageCountAdd } from './reducers'
import { fetchListDispatch } from './sagas'
// import { bindActionCreators } from '../ReduxDemo/redux'

@connect(({ sagaReducers }) => {
  return {
    sagaReducers
  }
}, { sageCountAdd, fetchListDispatch })
class SagaDemo extends Component {
  countAddFunc = (e) => {
    e.preventDefault()
    const { sagaReducers, sageCountAdd } = this.props
    const { count } = sagaReducers
    
    sageCountAdd(count + 1)
  }

  incrementSyncFunc = e => {
    e.preventDefault()
    const { fetchListDispatch, store } = this.props
    fetchListDispatch()
    store.dispatch({
      type: 'SAGA_FETCH_DETAILS'
    })
  }
  render () {
    const { sagaReducers } = this.props
    const { count } = sagaReducers
    
    return (
      <div>
        <a href="#" onClick={this.countAddFunc}>countAddFunc</a>
        <p></p>
        <a href="#" onClick={this.incrementSyncFunc}>incrementSync</a>
        <h3>{count}</h3>
      </div>
    )
  }
}
export default SagaDemo
