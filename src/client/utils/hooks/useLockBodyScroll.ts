import { useLayoutEffect } from 'react'

type UseLockBodyScrollConfig = { lock: boolean }

function useLockBodyScroll({ lock }: UseLockBodyScrollConfig = { lock: true }) {
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

export default useLockBodyScroll
