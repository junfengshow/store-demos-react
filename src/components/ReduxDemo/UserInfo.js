import React, { useState } from 'react'
import { connect } from './react-redux'


const UserInfo = ({ userInfo, changeUserName }) => {
  const [age, setAge] = useState(0)
  const onNameChange = (e) => {
    const { value } = e.target
    changeUserName({ userInfo: { name: value } })
  }
  
  return (
    <div>
      user info: {userInfo.name}
      <p>age: {age}</p>
      <input 
        type="text"
        placeholder='更改用户名字'
        value={userInfo.name}
        onChange={onNameChange}
      />
    </div>
  )
}

class UserInfo2 extends React.Component {
  render () {
    return (
      <div>kddldl</div>
    )
  }
}

export default connect(({ userReducer }) => {
  return {
    userInfo: userReducer.userInfo
  }
}, {})(UserInfo)
// connect(() => {
//   return {}
// }, {})(UserInfo)
