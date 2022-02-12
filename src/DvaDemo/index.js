import React, { useReducer, useContext } from 'react';
import dva, { connect } from 'dva';
import userModel from './user.model';

@connect(({ user }) => {
  return user;
})
class DvaDemo extends React.Component {
  changeName = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/add',
      name: 'lisi'
    })
    dispatch({
      type: 'user/save',
      id: 1
    })
  }
  render () {
    const { name, userList } = this.props;
    return (
      <div>
        <div>
          <a onClick={this.changeName}>changeName</a>
        </div>
        user: {name}
        {
          userList && userList.map((user) => (
            <div key={user}>
              {user}
            </div>
          ))
        }
      </div>
    )
  }
}

const DvaDemoContainer = (props) => {
  
  return (
    <DvaDemo />
  )
}

export default DvaDemoContainer;
