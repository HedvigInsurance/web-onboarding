import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { datadogRum } from '@datadog/browser-rum'
import { useRegisterDirectDebitMutation } from 'data/graphql'
import { SUCCESS_SUFFIX, FAIL_SUFFIX } from './Payment.constants'

type Params = {
  onError: () => void
}

export const useCreateTrustlyURL = ({ onError }: Params) => {
  const { pathname } = useLocation()
  const baseURL = `${window.location.origin}${pathname}`
  const [registerDirectDebit, { data }] = useRegisterDirectDebitMutation({
    variables: {
      clientContext: {
        successUrl: [baseURL, SUCCESS_SUFFIX].join(''),
        failureUrl: [baseURL, FAIL_SUFFIX].join(''),
      },
    },
    onError: (error) => {
      datadogRum.addError(error, { message: 'Failed to create Trustly URL' })
      onError()
    },
  })

  useEffect(() => {
    registerDirectDebit()
  }, [registerDirectDebit])

  const trustlyURL = data?.registerDirectDebit.url

  return [registerDirectDebit, trustlyURL] as const
}
