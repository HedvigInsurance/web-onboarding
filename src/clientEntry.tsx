import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from './App'

ReactDOM.hydrate(
  <BrowserRouter>
    <HotApp />
  </BrowserRouter>,
  document.getElementById('react-root'),
)
