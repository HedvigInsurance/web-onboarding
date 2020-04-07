import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { LinkButton } from 'components/buttons'
import { LoadingPage } from 'components/LoadingPage'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { SignState, useSignStatusQuery } from 'data/graphql'
import { motion } from 'framer-motion'
import * as React from 'react'
import { Redirect } from 'react-router'
import { useTextKeys } from 'utils/hooks/useTextKeys'

const InnerWrapper = styled(motion.div)`
  text-align: center;
`

const TextWrapper = styled('div')`
  padding-bottom: 2rem;
`

export const SignLoading: React.FC = () => {
  const [timer, setTimer] = React.useState<number | null>(null)
  const [hasTakenLong, setHasTakenLong] = React.useState(false)
  const signStatusQuery = useSignStatusQuery({
    pollInterval: 1000,
  })
  const currentLocale = useCurrentLocale()
  const textKeys = useTextKeys()

  React.useEffect(() => {
    setTimer(window.setTimeout(() => setHasTakenLong(true), 5000))
    return () => {
      window.clearTimeout(timer!)
    }
  }, [])

  const failureReturnUrl = currentLocale
    ? `/${currentLocale}/new-member/offer?sign-error=yes`
    : '/new-member/offer?sign-error=yes'
  if (signStatusQuery.data?.signStatus?.signState === SignState.Failed) {
    return <Redirect to={failureReturnUrl} />
  }
  if (signStatusQuery.data?.signStatus?.signState === SignState.Completed) {
    return (
      <Redirect
        to={
          currentLocale
            ? `/${currentLocale}/new-member/connect-payment`
            : '/new-member/connect-payment'
        }
      />
    )
  }

  return (
    <LoadingPage>
      <InnerWrapper
        initial="hidden"
        animate={hasTakenLong ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0, height: 0 },
          visible: { opacity: 1, height: 'auto' },
        }}
      >
        <TextWrapper>{textKeys.BANKID_NOT_RESPONDING()}</TextWrapper>
        <LinkButton
          to={failureReturnUrl}
          foreground={colorsV3.black}
          background={colorsV3.white}
        >
          {textKeys.RETRY_QUESTION()}
        </LinkButton>
      </InnerWrapper>
    </LoadingPage>
  )
}
