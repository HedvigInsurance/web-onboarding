import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useRegisterDirectDebitMutation } from 'data/graphql'
import { SUCCESS_SUFFIX, FAIL_SUFFIX } from './Payment.constants'

export const useCreateTrustlyURL = () => {
  const { pathname } = useLocation()
  const baseURL = `${window.location.origin}${pathname}`
  const [registerDirectDebit, { data }] = useRegisterDirectDebitMutation({
    variables: {
      clientContext: {
        successUrl: [baseURL, SUCCESS_SUFFIX].join(''),
        failureUrl: [baseURL, FAIL_SUFFIX].join(''),
      },
    },
  })

  useEffect(() => {
    registerDirectDebit()
  }, [registerDirectDebit])

  const trustlyURL = data?.registerDirectDebit.url

  return [registerDirectDebit, trustlyURL] as const
}
