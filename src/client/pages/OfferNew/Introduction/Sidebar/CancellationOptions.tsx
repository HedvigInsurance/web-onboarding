import styled from '@emotion/styled'
import { format } from 'date-fns'
import React from 'react'
import { Switch } from 'components/Switch'
import { Spinner } from 'components/utils'
import { Tooltip } from 'components/Tooltip/Tooltip'
import {
  useRemoveStartDateMutation,
  useStartDateMutation,
  QuoteDetails,
} from 'data/graphql'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import {
  isNorwegianHomeContents,
  isNorwegianTravel,
} from 'pages/OfferNew/utils'
import { useTextKeys, TextKeyMap } from 'utils/textKeys'
import { gqlDateFormat } from './utils'

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
  const labelContent = getLabelContent(
    textKeys,
    quote.quoteDetails,
    isGenericQuote,
  )

  const toggle = async () => {
    try {
      setShowError(false)
      setIsLoading(true)

      if (!checked) {
        await removeStartDate({
          variables: {
            quoteId: quote.id,
          },
        })
        await refetch()
      } else {
        await setStartDate({
          variables: {
            quoteId: quote.id,
            date: format(new Date(), gqlDateFormat),
          },
        })
        await refetch()
      }
    } catch (e) {
      handleFail(e)
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
          <StyledSwitch value={checked} onChange={toggle} />
        )}
        {labelContent}
      </HandleSwitchingLabel>
      <Tooltip body={textKeys.SIDEBAR_REQUEST_CANCELLATION_TOOLTIP()} />
    </HandleSwitchingWrapper>
  )
}
