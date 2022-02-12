import React, { useContext } from 'react';
import { MyContext, useMyContext, useMyReducer } from './store';
import './index.css';

const ContextDemoChild = () => {
  const context = useMyContext();
  const { age, dispatch } = context;
  return (
    <div>
      <div>
        <a onClick={() => {
          dispatch({
            type: 'add_age',
            age: age + 1,
          })
        }}>dispatch</a>
      </div>
      use context age: {age}
    </div>
  )
}

class ContextDemo extends React.Component {
  static contextType = MyContext;

  componentDidMount () {
    // console.log('props', this.context)
  }

  render () {
    const { age } = this.context;
    return (
      <div>
        <div className='context-demo-parent context-demo-parent-1'>
          parent age: {age}
        </div>

        <a href="#aa">冒点</a>
        <div>
          <input type="text" className='context-demo-input' />
        </div>
        <ContextDemoChild />
      </div>
    )
  }
}

const ContextDemoContainer = () => {
  const [state, dispatch] = useMyReducer();
  return (
    <MyContext.Provider value={{
      dispatch,
      ...state,
    }} dispatch={dispatch}>
      <ContextDemo />   
    </MyContext.Provider>
  )
}
export default ContextDemoContainer;
