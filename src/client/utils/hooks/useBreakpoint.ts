import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '../mediaQueries'

export function useBreakpoint() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onWindowResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', onWindowResize)

    return () => window.removeEventListener('resize', onWindowResize)
  })

  return {
    isLargeScreen: windowWidth >= BREAKPOINTS.largeScreen,
  }
}
