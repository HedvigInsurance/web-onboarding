import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Switch } from 'components/Switch'
import { Spinner } from 'components/utils'
import { TooltipIcon } from 'components/Tooltip/TooltipIcon'

import { BundledQuote } from 'data/graphql'
import { useTextKeys, TextKeyMap } from 'utils/textKeys'

const HandleSwitchingWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  padding: 0 0.25rem;
`

const HandleSwitchingLabel = styled.label<{ isDisabled: boolean }>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  }
`

const StyledSpinner = styled(Spinner)`
  flex: none;
  height: 1.25rem;
  width: 1.25rem;
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

type CancellationOptionProps = {
  quote: BundledQuote
  onToggleCancellationOption: (
    isChecked: boolean,
    quoteId: string,
  ) => Promise<void>
  isDisabled?: boolean
}

const CancellationOption = ({
  quote,
  onToggleCancellationOption,
  isDisabled = false,
}: CancellationOptionProps) => {
  const textKeys = useTextKeys()

  const [isLoading, setIsLoading] = useState(false)

  const { id, startDate } = quote
  const isChecked = !startDate
  const checkboxLabel = getLabelContent(textKeys, quote)

  const handleToggle = async () => {
    setIsLoading(true)
    await onToggleCancellationOption(!isChecked, id)
    setIsLoading(false)
  }

  return (
    <HandleSwitchingWrapper>
      <HandleSwitchingLabel isDisabled={isDisabled}>
        {isLoading ? (
          <StyledSpinner />
        ) : (
          <Switch
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleToggle}
          />
        )}
        {checkboxLabel}
      </HandleSwitchingLabel>
      <TooltipIcon
        body={textKeys.SIDEBAR_REQUEST_CANCELLATION_INSURANCE_NAME_TOOLTIP({
          INSURANCE_NAME: quote.displayName,
        })}
      />
    </HandleSwitchingWrapper>
  )
}

type CancellationOptionsProps = {
  loadingQuoteIds: Array<string>
  quotes: BundledQuote[]
  onToggleCancellationOption: (
    isChecked: boolean,
    quoteId: string,
  ) => Promise<void>
}

export const CancellationOptions = ({
  loadingQuoteIds,
  quotes,
  onToggleCancellationOption,
}: CancellationOptionsProps) => {
  const isDisabled = loadingQuoteIds.length > 0

  return (
    <>
      {quotes.map((quote) => {
        return (
          quote.currentInsurer?.switchable && (
            <CancellationOption
              key={quote.id}
              quote={quote}
              onToggleCancellationOption={onToggleCancellationOption}
              isDisabled={isDisabled}
            />
          )
        )
      })}
    </>
  )
}
