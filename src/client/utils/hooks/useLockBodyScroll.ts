import { useLayoutEffect } from 'react'

type UseLockBodyScrollConfig = { lock: boolean }

export const useLockBodyScroll = ({ lock = true }: UseLockBodyScrollConfig) => {
  useLayoutEffect(() => {
    const previousOverflowStyle = window.getComputedStyle(document.body)
      .overflow

    if (lock) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflowStyle
    }
  }, [lock])
}
