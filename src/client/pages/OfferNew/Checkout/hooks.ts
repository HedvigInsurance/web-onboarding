import React, { useEffect, useState } from 'react'
import { EditQuoteMutationResult } from 'src/client/data/graphql'
import { useTextKeys } from 'utils/textKeys'

export enum VisibilityState {
  CLOSED = 'CLOSED',
  CLOSING = 'CLOSING',
  OPENING = 'OPENING',
  OPEN = 'OPEN',
}

export const useScrollLock = (
  visibilityState: VisibilityState,
  outerWrapperRef: React.RefObject<HTMLDivElement | undefined>,
) =>
  React.useEffect(() => {
    const listener = (e: WheelEvent | TouchEvent) => {
      if (visibilityState !== VisibilityState.OPEN) {
        return
      }

      const { current } = outerWrapperRef
      if (!current) {
        return
      }

      const tryingToScrollUpButCant =
        e instanceof WheelEvent && current.scrollTop === 0 && e.deltaY < 0
      const tryingToScrollDownButCant =
        e instanceof WheelEvent &&
        current.offsetHeight + current.scrollTop >= current.scrollHeight &&
        e.deltaY > 0
      if (
        !current!.contains(e.target as Node) ||
        tryingToScrollUpButCant ||
        tryingToScrollDownButCant
      ) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', listener, { passive: false })
    window.addEventListener('touchmove', listener, { passive: false })

    return () => {
      window.removeEventListener('wheel', listener)
      window.removeEventListener('touchmove', listener)
    }
  }, [outerWrapperRef, visibilityState])

export const useSsnError = (editQuoteResult: EditQuoteMutationResult) => {
  const textKeys = useTextKeys()
  const [ssnBackendError, setSsnBackendError] = useState<string | null>(null)
  const editQuote = editQuoteResult.data?.editQuote

  useEffect(() => {
    const ssnErrorCodeTranslation = (errorCode: string) => {
      switch (errorCode) {
        case 'INVALID_SSN_LENGTH':
          return textKeys.INVALID_SSN_LENGTH()
        case 'SSN_DOES_NOT_MATCH_BIRTH_DATE':
          return textKeys.SSN_DOES_NOT_MATCH_BIRTH_DATE()
        default:
          return textKeys.INVALID_SSN()
      }
    }

    if (
      editQuote?.__typename === 'UnderwritingLimitsHit' &&
      editQuote?.limits.length > 0
    ) {
      const { code } = editQuote.limits[editQuote.limits.length - 1]
      setSsnBackendError(ssnErrorCodeTranslation(code))
      return
    }
    setSsnBackendError(null)
  }, [editQuote, textKeys])

  return { ssnBackendError }
}
