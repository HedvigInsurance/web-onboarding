import * as React from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface Measured {
  left: number
  top: number
  width: number
  height: number
}

export const useMeasure = <T extends Element>(): [
  { ref: React.MutableRefObject<T | null> },
  Measured,
] => {
  const ref = React.useRef<T>(null)
  const [bounds, set] = React.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })
  const [ro] = React.useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect)),
  )
  React.useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [{ ref }, bounds]
}
