import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HotApp } from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.hydrate(
  <BrowserRouter>
    <HotApp />
  </BrowserRouter>,
  document.getElementById('react-root'),
)
