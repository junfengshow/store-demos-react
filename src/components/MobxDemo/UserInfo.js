import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

const person = observable({
  name: 'lisi'
})

const UserInfo = ({ appState }) => {
  console.log('UserInfo render', person.name)
  return(
    <div>
      user info: {appState.name}
    </div>
  )
}
export default inject('appState')(observer(UserInfo))
