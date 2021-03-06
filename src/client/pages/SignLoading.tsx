import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { LinkButton } from 'components/buttons'
import { LoadingPage } from 'components/LoadingPage'
import { getIsoLocale, useCurrentLocale } from 'components/utils/CurrentLocale'
import {
  QuoteBundle,
  SignState,
  useMemberQuery,
  useQuoteBundleQuery,
  useSignStatusQuery,
} from 'data/graphql'
import { getOfferData } from 'pages/OfferNew/utils'
import { useTextKeys } from 'utils/textKeys'
import { handleSignedEvent } from 'utils/tracking/signing'
import { useTrack } from 'utils/tracking/tracking'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { useQuoteIds } from 'utils/hooks/useQuoteIds'

const InnerWrapper = styled(motion.div)`
  text-align: center;
`

const TextWrapper = styled('div')`
  padding-bottom: 2rem;
`

export const SignLoading: React.FC = () => {
  const [hasTakenLong, setHasTakenLong] = useState(false)
  const signStatusQuery = useSignStatusQuery({
    pollInterval: 1000,
  })
  const textKeys = useTextKeys()
  const currentLocale = useCurrentLocale()
  const variation = useVariation()
  const localeIsoCode = getIsoLocale(currentLocale)
  const { isLoading: quoteIdsIsLoading, quoteIds } = useQuoteIds()
  const { data: quoteBundleData } = useQuoteBundleQuery({
    variables: {
      input: {
        ids: [...quoteIds],
      },
      locale: localeIsoCode,
    },
    skip: quoteIdsIsLoading,
  })
  const member = useMemberQuery()

  useTrack({
    offerData:
      quoteBundleData &&
      getOfferData(quoteBundleData.quoteBundle as QuoteBundle),
    signState: signStatusQuery.data?.signStatus?.signState,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setHasTakenLong(true), 10000)
    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (signStatusQuery.data?.signStatus?.signState !== SignState.Completed) {
      return
    }
    if (variation === Variation.AVY) {
      handleSignedEvent(member.data?.member ?? null)
    }
  }, [
    signStatusQuery.data?.signStatus?.signState,
    member.data?.member,
    variation,
  ])

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
    <LoadingPage loading={!hasTakenLong}>
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
