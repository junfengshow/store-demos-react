import React from 'react'
// import { ReduxDemo } from './ReduxDemo'
import { SagaDemo } from './SagaDemo'
import { Provider } from './ReduxDemo/react-redux'
import store from './ReduxDemo/store'
import { sagaStore } from './SagaDemo/store' 
import { MobxDemo, MobxStore } from './MobxDemo'
import { Provider as MobxProvider } from 'mobx-react'

class App extends React.Component {
  onDownLoad = (e) => {
    e.preventDefault()
    window.location = 'itms-services://?action=download-manifest&url=https://app.timichat.com/mainfest/0.plist'
  }
  render () {
    return (
      <div>
        {/* <Provider store={store}>
          <ReduxDemo store={store} />
        </Provider>   */}
        {/* <ReduxDemo store={store} /> */}
        
        <Provider store={sagaStore}>
          <SagaDemo store={sagaStore} />
        </Provider> 

        <MobxProvider {...MobxStore}>
          <MobxDemo />
        </MobxProvider> 
        <div>
          <a href="#" onClick={this.onDownLoad}>download</a>
        </div>
      </div>
    )
  }
}
export default App
