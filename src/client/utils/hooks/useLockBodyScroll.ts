import { useLayoutEffect } from 'react'

type UseLockBodyScrollConfig = { isLocked: boolean }

export const useLockBodyScroll = ({
  isLocked = false,
}: UseLockBodyScrollConfig) => {
  useLayoutEffect(() => {
    const previousOverflowStyle = window.getComputedStyle(document.body)
      .overflow
    if (isLocked) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflowStyle
    }
  }, [isLocked])
}
