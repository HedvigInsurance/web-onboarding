import React from 'react'
import { Mount } from 'react-lifecycle-components'
import { GlobalCss } from 'utils/globalStyles'

export const Page: React.SFC = ({ children }) => {
  return (
    <Mount
      on={() => {
        // JSDOM weirdness writes to stderr if one tries to scroll in test
        if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
          window.scrollTo(0, 0)
        }
      }}
    >
      <GlobalCss />
      {children}
    </Mount>
  )
}
