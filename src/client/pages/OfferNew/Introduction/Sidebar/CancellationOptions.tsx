import styled from '@emotion/styled'
import { format as formatDate } from 'date-fns'
import React from 'react'
import { Switch } from 'components/Switch'
import { Spinner } from 'components/utils'
import { useRemoveStartDateMutation, useStartDateMutation } from 'data/graphql'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import { useTextKeys, TextKeyMap } from 'utils/textKeys'
import { gqlDateFormat } from './utils'

const HandleSwitchingWrapper = styled.div`
  margin-bottom: 0.75rem;
  padding: 0 0.25rem;
`

const HandleSwitchingLabel = styled.label<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;

  &:hover {
    cursor: ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
  }
`

const StyledSpinner = styled(Spinner)`
  flex: none;
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 1rem;
`

const StyledSwitch = styled(Switch)`
  margin-right: 1rem;
`

type CancellationOptionsProps = {
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
              quote={quote as OfferQuote}
            />
          )
        )
      })}
    </>
  )
}

const getLabelContent = (textKeys: TextKeyMap, quote: OfferQuote) => {
  if (quote.currentInsurer?.displayName) {
    return textKeys.SIDEBAR_REQUEST_CANCELLATION_INSURANCE_NAME_PROVIDER_LABEL({
      INSURANCE_NAME: quote.displayName,
      INSURANCE_PROVIDER: quote.currentInsurer.displayName,
    })
  }

  return textKeys.SIDEBAR_REQUEST_CANCELLATION_INSURANCE_NAME_LABEL({
    INSURANCE_NAME: quote.displayName,
  })
}

type QuoteCancellationOptionProps = {
  quote: OfferQuote
  setShowError: (showError: boolean) => void
  refetch: () => Promise<void>
  handleFail: (e: Error) => void
}

const QuoteCancellationOption: React.FC<QuoteCancellationOptionProps> = ({
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
  const checkboxLabel = getLabelContent(textKeys, quote)

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
      } else {
        await setStartDate({
          variables: {
            quoteId: quote.id,
            date: formatDate(new Date(), gqlDateFormat),
          },
        })
      }

      await refetch()
    } catch (e) {
      handleFail(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HandleSwitchingWrapper>
      <HandleSwitchingLabel isDisabled={isLoading}>
        {isLoading ? (
          <StyledSpinner />
        ) : (
          <StyledSwitch checked={checked} onChange={toggle} />
        )}
        {checkboxLabel}
      </HandleSwitchingLabel>
    </HandleSwitchingWrapper>
  )
}
