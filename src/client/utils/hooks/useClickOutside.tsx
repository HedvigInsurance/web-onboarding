import React, { useEffect } from 'react'

export type PossibleEvent = MouseEvent | TouchEvent
export type Handler = (event: PossibleEvent) => void

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: Handler,
) => {
  useEffect(
    function attachClickOutsideListner() {
      const listener = (event: PossibleEvent) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    [ref, handler],
  )
}
