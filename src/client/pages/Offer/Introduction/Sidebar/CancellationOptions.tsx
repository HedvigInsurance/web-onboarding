import styled from '@emotion/styled'
import React from 'react'
import { Switch } from 'components/Switch'
import { Spinner } from 'components/utils'
import { BundledQuote } from 'data/graphql'
import { useTextKeys, TextKeyMap } from 'utils/textKeys'

const HandleSwitchingWrapper = styled.div`
  margin-bottom: 0.75rem;
  padding: 0 0.25rem;
`

const HandleSwitchingLabel = styled.label<{ isClickable: boolean }>`
  display: flex;
  align-items: center;

  &:hover {
    cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'initial')};
  }
`

const StyledSpinner = styled(Spinner)`
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.5rem;
`

const StyledSwitch = styled(Switch)`
  margin-right: 0.5rem;
`

const getLabelContent = (textKeys: TextKeyMap, quote: BundledQuote) => {
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

type CancellationOptionsProps = {
  loadingQuoteId: string | null
  quotes: BundledQuote[]
  onToggleCancellationOption: (isChecked: boolean, quoteId: string) => void
}

export const CancellationOptions = ({
  loadingQuoteId,
  quotes,
  onToggleCancellationOption,
}: CancellationOptionsProps) => {
  const textKeys = useTextKeys()

  const isDisabled = Boolean(loadingQuoteId)

  return (
    <>
      {quotes.map((quote) => {
        const { id, startDate, currentInsurer } = quote
        const isChecked = !startDate
        const checkboxLabel = getLabelContent(textKeys, quote)
        const isLoading = loadingQuoteId === id

        console.log(loadingQuoteId, id)

        return (
          currentInsurer?.switchable && (
            <HandleSwitchingWrapper key={id}>
              <HandleSwitchingLabel isClickable={isDisabled}>
                {isLoading ? (
                  <StyledSpinner />
                ) : (
                  <StyledSwitch
                    checked={isChecked}
                    onChange={() => onToggleCancellationOption(!isChecked, id)}
                  />
                )}
                {checkboxLabel}
              </HandleSwitchingLabel>
            </HandleSwitchingWrapper>
          )
        )
      })}
    </>
  )
}
