import React, { useCallback, useEffect, useState } from 'react'
import { throttle } from 'utils/throttle'

type StickyOptions = {
  /**
   * The margin that should be used to to calculate the full element height + paddings + margins
   **/
  margin?: number
}

/**
 * A hook that will return if user has scrolled past element, based on the element height, viewport size and scroll position.
 * @param ref Reference to the element
 * @param options An object with options
 * @returns An array [hasScrolledPastTop, hasScrolledPastBottom]
 */
export const useHasScrolledPastElement = (
  ref: React.RefObject<HTMLElement>,
  options: StickyOptions,
) => {
  const [hasScrolledPastBottom, setHasScrolledPastBottom] = useState(false)
  const [hasScrolledPastTop, setHasScrolledPastTop] = useState(false)
  const [offsetTop, setOffsetTop] = useState(0)
  const { margin = 0 } = options

  useEffect(() => {
    // We need to determine the initial offsetTop, the number gets modified
    // when element becomes sticky, so we can't use that offset
    if (!hasScrolledPastBottom && !hasScrolledPastTop) {
      setOffsetTop(ref.current?.offsetTop ?? 0)
    }
  }, [hasScrolledPastBottom, hasScrolledPastTop, ref])

  const handleOnScroll = throttle(
    useCallback(() => {
      // At initial render offsetTop might be 0, and then we stick the element
      // to top unintentionally. So just abort if offsetTop is 0 or undefined
      if (!offsetTop) return

      const stickyTopBoundary = offsetTop - margin
      const offsetHeight = ref?.current?.offsetHeight ?? 0
      const stickyBottomBoundary = offsetTop + offsetHeight + margin

      // If sidebar is larger than window height:
      // stick to bottom when we have scrolled past the bottom boundrary
      if (stickyBottomBoundary > window.innerHeight) {
        setHasScrolledPastBottom(
          window.scrollY + window.innerHeight > stickyBottomBoundary,
        )
      }
      // If screen is larger than sidebar:
      // set sticky if we have scrolled past the top point of the container
      else {
        setHasScrolledPastTop(window.scrollY > stickyTopBoundary)
      }
    }, [margin, offsetTop, ref]),
    25,
  )

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll)
    return () => {
      window.removeEventListener('scroll', handleOnScroll)
    }
  }, [handleOnScroll])

  return [hasScrolledPastTop, hasScrolledPastBottom]
}
