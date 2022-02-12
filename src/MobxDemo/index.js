/**
 * mobx demo
 */
import React from 'react';
import { action, observable, computed, autorun } from 'mobx';
import { observer, Provider, inject } from 'mobx-react';
import { store } from './store';

@inject('store')
@observer
class MobxDemo extends React.Component {
  componentDidMount () {
    const { getUserList } = this.props.store;
    getUserList && getUserList();
  }
  resetTimer = () => {
    const { store } = this.props;
    store.setAge && store.setAge(store.age.get() + 1);
  }
  render () {
    const { age, userList } = this.props.store;
    return (
      <div>
        <a onClick={this.resetTimer}>click age: {age.get()}</a>
        {
          userList && userList.map((user) => (
            <div key={user}>{user}</div>
          ))
        }
      </div>
    )
  }
}

const MobxDemoContainer = () => {
  return (
    <Provider store={store}>
      <MobxDemo />
    </Provider>
  )
}

export default MobxDemoContainer;
