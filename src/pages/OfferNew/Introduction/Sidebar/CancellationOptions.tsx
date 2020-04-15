import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Switch } from 'components/Switch'
import { Spinner } from 'components/utils'
import { useRemoveStartDateMutation, useStartDateMutation } from 'data/graphql'
import { format } from 'date-fns'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import {
  isNorwegianHomeContents,
  isNorwegianTravel,
} from 'pages/OfferNew/utils'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { gqlDateFormat } from './utils'
import { sleep } from 'utils/misc'

const HandleSwitchingWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 0.25rem;
`

const HandleSwitchingLabel = styled.span`
  font-size: 0.875rem;
  line-height: 1.2;
  color: ${colorsV3.gray700};
  width: 75%;
`

interface CancellationOptionsProps {
  quotes: OfferData['quotes']
  dateValue?: Date | null
  setDateValue: (dateValue: Date | null) => void
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
  dateValue?: Date | null
  setDateValue: (dateValue: Date | null) => void
  setShowError: (showError: boolean) => void
  refetch: () => Promise<void>
  handleFail: (e: Error) => void
}
const QuoteCancellationOption: React.FC<QuoteCancellationOptionProps> = ({
  isGenericQuote,
  quote,
  setShowError,
  dateValue,
  handleFail,
  refetch,
  setDateValue,
}) => {
  const textKeys = useTextKeys()
  const [isLoading, setIsLoading] = React.useState(false)
  const [setStartDate] = useStartDateMutation()
  const [removeStartDate] = useRemoveStartDateMutation()

  return (
    <HandleSwitchingWrapper key={quote.id}>
      <HandleSwitchingLabel>
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
        <div>
          <Spinner />
        </div>
      ) : (
        <Switch
          value={!dateValue}
          onChange={(newValue) => {
            setShowError(false)
            setIsLoading(true)
            if (newValue) {
              setStartDate({
                variables: {
                  quoteId: quote.id,
                  date: format(new Date(), gqlDateFormat),
                },
              })
                .then(() => sleep(1000))
                .then(() => refetch())
                .catch(handleFail)
                .finally(() => setIsLoading(false))
            } else {
              removeStartDate({
                variables: {
                  quoteId: quote.id,
                },
              })
                .then(() => sleep(1000))
                .then(() => refetch())
                .catch(handleFail)
                .finally(() => setIsLoading(false))
            }
            setDateValue(newValue ? null : new Date())
          }}
        />
      )}
    </HandleSwitchingWrapper>
  )
}
