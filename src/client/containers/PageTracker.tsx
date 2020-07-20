import React from 'react'
import { Mount } from 'react-lifecycle-components'
import { withRouter } from 'react-router-dom'

const PageTracker = withRouter(({ history, children }) => (
  <Mount
    on={() => {
      history.listen(() => {
        const castedWindow = window as any
        if (castedWindow && castedWindow.analytics) {
          castedWindow.analytics.page()
        }
      })
    }}
  >
    {children}
  </Mount>
))

export { PageTracker }
