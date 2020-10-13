import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { format } from 'date-fns'
import React from 'react'
import { Switch } from 'components/Switch'
import { Spinner } from 'components/utils'
import { useRemoveStartDateMutation, useStartDateMutation } from 'data/graphql'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import {
  isNorwegianHomeContents,
  isNorwegianTravel,
} from 'pages/OfferNew/utils'
import { useTextKeys } from 'utils/textKeys'
import { gqlDateFormat } from './utils'

const HandleSwitchingWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 0.25rem;
`

const HandleSwitchingLabel = styled.button`
  font-size: 0.875rem;
  line-height: 1.2;
  padding: 0;
  border: 0;
  color: ${colorsV3.gray700};
  width: 75%;
  background: transparent;
  text-align: left;
  cursor: pointer;

  :focus {
    outline: 0;
  }
`

const SpinnerWrapper = styled.div`
  font-size: 1.25rem;
  height: 1.25rem;
`

interface CancellationOptionsProps {
  quotes: OfferData['quotes']
  setShowError: (showError: boolean) => void
  refetch: () => Promise<void>
  handleFail: (e: Error) => void
}

export const CancellationOptions: React.FC<CancellationOptionsProps> = ({
  quotes,
  ...rest
}) => {
  return (
    <>
      {quotes.map((quote) => {
        return (
          quote.currentInsurer?.switchable && (
            <QuoteCancellationOption
              key={quote.id}
              {...rest}
              isGenericQuote={quotes.length === 1}
              quote={quote as OfferQuote}
            />
          )
        )
      })}
    </>
  )
}

interface QuoteCancellationOptionProps {
  isGenericQuote: boolean
  quote: OfferQuote
  setShowError: (showError: boolean) => void
  refetch: () => Promise<void>
  handleFail: (e: Error) => void
}
const QuoteCancellationOption: React.FC<QuoteCancellationOptionProps> = ({
  isGenericQuote,
  quote,
  setShowError,
  handleFail,
  refetch,
}) => {
  const textKeys = useTextKeys()
  const [isLoading, setIsLoading] = React.useState(false)
  const [setStartDate] = useStartDateMutation()
  const [removeStartDate] = useRemoveStartDateMutation()

  const checked = !quote.startDate

  const toggle = () => {
    setShowError(false)
    setIsLoading(true)
    if (!checked) {
      removeStartDate({
        variables: {
          quoteId: quote.id,
        },
      })
        .then(() => refetch())
        .catch(handleFail)
        .finally(() => setIsLoading(false))
    } else {
      setStartDate({
        variables: {
          quoteId: quote.id,
          date: format(new Date(), gqlDateFormat),
        },
      })
        .then(() => refetch())
        .catch(handleFail)
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <HandleSwitchingWrapper>
      <HandleSwitchingLabel onClick={toggle}>
        {(() => {
          if (isGenericQuote) {
            return textKeys.SIDEBAR_REQUEST_CANCELLATION_GENERIC_INSURANCE()
          }

          if (isNorwegianHomeContents(quote.quoteDetails)) {
            return textKeys.SIDEBAR_REQUEST_CANCELLATION_HOME_INSURANCE()
          }

          if (isNorwegianTravel(quote.quoteDetails)) {
            return textKeys.SIDEBAR_REQUEST_CANCELLATION_TRAVEL_INSURANCE()
          }
        })()}
      </HandleSwitchingLabel>

      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Switch value={checked} onChange={toggle} />
      )}
    </HandleSwitchingWrapper>
  )
}
