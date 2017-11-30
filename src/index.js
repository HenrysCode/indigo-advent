
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import App from './App'
import registerServiceWorker from './registerServiceWorker';
import Store from './store'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider store={Store}>
    <App />
  </Provider>,
  target
)

registerServiceWorker();
