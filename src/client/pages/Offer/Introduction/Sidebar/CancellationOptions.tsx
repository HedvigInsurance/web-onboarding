import styled from '@emotion/styled'
import { format } from 'date-fns'
import React from 'react'
import { Switch } from 'components/Switch'
import { Spinner } from 'components/utils'
import { Tooltip } from 'components/Tooltip/Tooltip'
import { useSetStartDateMutation, QuoteDetails } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import {
  isNorwegianHomeContents,
  isNorwegianTravel,
} from 'pages/OfferNew/utils'
import { gqlDateFormat } from 'pages/OfferNew/Introduction/Sidebar/utils'
import { useTextKeys, TextKeyMap } from 'utils/textKeys'

const HandleSwitchingWrapper = styled.div`
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.25rem;
`

const HandleSwitchingLabel = styled.label`
  display: inline-flex;

  &:hover {
    cursor: pointer;
  }
`

const StyledSpinner = styled(Spinner)`
  margin-right: 0.5rem;
  font-size: 1.25rem;
  height: 1.25rem;
`

const StyledSwitch = styled(Switch)`
  margin-right: 0.5rem;
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

const getLabelContent = (
  textKeys: TextKeyMap,
  quoteDetails: QuoteDetails,
  isGenericQuote: boolean,
) => {
  if (isGenericQuote) {
    return textKeys.SIDEBAR_REQUEST_CANCELLATION_GENERIC_INSURANCE()
  }

  if (isNorwegianHomeContents(quoteDetails)) {
    return textKeys.SIDEBAR_REQUEST_CANCELLATION_HOME_INSURANCE()
  }

  if (isNorwegianTravel(quoteDetails)) {
    return textKeys.SIDEBAR_REQUEST_CANCELLATION_TRAVEL_INSURANCE()
  }

  return null
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

  const isChecked = !quote.startDate
  const labelContent = getLabelContent(
    textKeys,
    quote.quoteDetails,
    isGenericQuote,
  )

  const handleToggleStartDate = async () => {
    try {
      setShowError(false)
      setIsLoading(true)

      await setStartDate({
        variables: {
          quoteCartId,
          locale: isoLocale,
          quoteId: quote.id,
          payload: {
            startDate: isChecked ? format(new Date(), gqlDateFormat) : null,
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
      <HandleSwitchingLabel>
        {isLoading ? (
          <StyledSpinner />
        ) : (
          <StyledSwitch value={isChecked} onChange={handleToggleStartDate} />
        )}
        {labelContent}
      </HandleSwitchingLabel>
      <Tooltip body={textKeys.SIDEBAR_REQUEST_CANCELLATION_TOOLTIP()} />
    </HandleSwitchingWrapper>
  )
}
