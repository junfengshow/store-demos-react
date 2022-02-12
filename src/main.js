import React from 'react'
import ReactDom from 'react-dom'
import ReduxDemo from './ReduxDemo'
import ReduxSagaDemo from './ReduxSagaDemo'
import MobxDemo from './MobxDemo';
import DvaDemo from './DvaDemo';
import ContextDemo from './ContextDemo';

import dva, { connect } from 'dva';
import userModel from './DvaDemo/user.model';
import { createHashHistory } from 'history'

const render = (Component, id) => {
  const node = document.getElementById(id);
  ReactDom.render(<Component />, node);
};

render(ReduxDemo, 'redux');
render(ReduxSagaDemo, 'saga');
render(MobxDemo, 'mobx');

const app = dva({
  history: createHashHistory(),
  onError(e) {
    console.error('error:', e);
  },
});
app.model(userModel);

// 注册视图
app.router(({ history }) => <DvaDemo history={history}/>);

// 启动
app.start('#dva')
// render(DvaDemo, 'dva');

render(ContextDemo, 'context');

;(() => {
  // console.log('start');
  // setTimeout(() => {
  //   console.log('this is setTimeout1')
  // });
  // new Promise((resolve, reject) => {
  //   console.log('Promise1')
  //   setTimeout(resolve)
  // })
  // .then(() => {
  //   console.log('then1')
  //   return new Promise((resolve) => {
  //     setTimeout(resolve)
  //   }).then(() => {
  //     console.log('inner promise then')
  //     return new Promise((resolve) => {
  //       setTimeout(resolve)
  //     }).then(() => {
  //       console.log('inner inner promise then')
  //     })
  //   })
  // })
  // .then(() => {
  //   console.log('then2')
  // })
  // start
  // Promise1
  // this is setTimeout1
  // then1
  // inner promise then
  // then2
})();