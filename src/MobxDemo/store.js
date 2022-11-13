/**
 * 
 * store
 */
import { observable, action, autorun, flow, configure } from 'mobx';
import { getUserList } from '../utils';

configure({
  enforceActions: true
})
class Store {
  age = observable.box(1);
  userList = observable([]);

  constructor () {
    this.getUserList = this.getUserList.bind(this);
  }
  setAge = action((_age) => {
    this.age.set(_age);
  })
  showAge = autorun(() => {
    // console.log('autorun age: ', this.age)
    this.age.set(2);
  })
  // 获取用户列表
  getUserList = flow(function* () {
    yield getUserList()
    // this.userList = ['zhangsan', 'lisi']
    this.userList.push(...['zhangsan', 'lisi']);
  })
}
export const store = new Store();
