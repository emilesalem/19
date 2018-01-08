import React from 'react'
import 'rxjs'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './src/application/state/store'
import App from './src/application/container'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
