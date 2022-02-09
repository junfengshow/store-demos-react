/**
 * mobx demo
 */
import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

const appState = observable({
  timer: 0
});
appState.setTimer = action(function reset () {
  appState.timer += 1;
});

setTimeout(() => {
  appState.timer += 1;
}, 3000)

@observer
class MobxDemo extends React.Component {
  resetTimer = () => {
    const { setTimer } = this.props.appState;
    setTimer();
  }
  render () {
    const { timer } = this.props.appState;
    return (
      <div>
        <a onClick={this.resetTimer}>timer: {timer}</a>
      </div>
    )
  }
}

const MobxDemoContainer = () => {
  return (
    <MobxDemo appState={appState}/>
  )
}

export default MobxDemoContainer;
