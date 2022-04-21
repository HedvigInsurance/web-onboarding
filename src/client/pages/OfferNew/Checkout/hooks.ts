import { useEffect, useState } from 'react'
import { EditQuoteMutationResult } from 'src/client/data/graphql'
import { useTextKeys } from 'utils/textKeys'

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
