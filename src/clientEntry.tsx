import { CookieStorage } from 'cookie-storage'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from './App'
import { createSession } from './utils/sessionStorage'

ReactDOM.hydrate(
  <BrowserRouter>
    <HotApp session={createSession(new CookieStorage({ expires: null }))} />
  </BrowserRouter>,
  document.getElementById('react-root'),
)
