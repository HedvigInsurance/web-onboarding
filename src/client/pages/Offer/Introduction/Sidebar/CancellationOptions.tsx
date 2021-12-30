import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { format } from 'date-fns'
import React from 'react'
import { Switch } from 'components/Switch'
import { Spinner } from 'components/utils'
import { useSetStartDateMutation } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import {
  isNorwegianHomeContents,
  isNorwegianTravel,
} from 'pages/OfferNew/utils'
import { gqlDateFormat } from 'pages/OfferNew/Introduction/Sidebar/utils'
import { useTextKeys } from 'utils/textKeys'

const HandleSwitchingWrapper = styled.div`
  margin-bottom: 0.75rem;
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
  quoteCartId: string
  quotes: OfferData['quotes']
  setShowError: (showError: boolean) => void
}

export const CancellationOptions: React.FC<CancellationOptionsProps> = ({
  quoteCartId,
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
              quoteCartId={quoteCartId}
            />
          )
        )
      })}
    </>
  )
}

interface QuoteCancellationOptionProps {
  isGenericQuote: boolean
  quoteCartId: string
  quote: OfferQuote
  setShowError: (showError: boolean) => void
}
const QuoteCancellationOption: React.FC<QuoteCancellationOptionProps> = ({
  isGenericQuote,
  quoteCartId,
  quote,
  setShowError,
}) => {
  const textKeys = useTextKeys()
  const { isoLocale } = useCurrentLocale()

  const [isLoading, setIsLoading] = React.useState(false)

  const [setStartDate] = useSetStartDateMutation()

  const checked = !quote.startDate

  const toggle = async () => {
    try {
      setShowError(false)
      setIsLoading(true)

      await setStartDate({
        variables: {
          quoteCartId,
          locale: isoLocale,
          quoteId: quote.id,
          payload: {
            startDate: checked ? format(new Date(), gqlDateFormat) : null,
          },
        },
      })
    } catch (e) {
      setShowError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // TODO: This logic needs some clarification
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
