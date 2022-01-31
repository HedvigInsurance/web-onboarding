import React from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { usePriceQuery } from 'data/graphql'
import { Spinner } from '../utils'

const { gray900, gray700 } = colorsV3

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
`
const TotalPrice = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${gray900};
`
const CancelInfo = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${gray700};
`
const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: ${gray900};
`

export const PaymentInfo = () => {
  const textKeys = useTextKeys()
  const { currency, isoLocale } = useCurrentLocale()
  const { id: quoteCartId } = useParams<{ id: string }>()
  const { data, loading: isLoading, error } = usePriceQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })

  const totalMonthlyCost = Math.round(
    Number(data?.quoteCart.bundle?.bundleCost.monthlyNet.amount),
  )

  if (isLoading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (error) {
    return null
  }

  return (
    <Wrapper>
      <TotalPrice>{`${totalMonthlyCost} ${
        currency.currencySymbol
      }${textKeys.PRICE_SUFFIX_INTERVAL()}`}</TotalPrice>
      <CancelInfo>{textKeys.CHECKOUT_FOOTER_CANCELLATION_INFO()}</CancelInfo>
    </Wrapper>
  )
}
