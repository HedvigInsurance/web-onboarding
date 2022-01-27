import styled from '@emotion/styled'
import { format } from 'date-fns'
import React from 'react'
import { Switch } from 'components/Switch'
import { Spinner } from 'components/utils'
import { Tooltip } from 'components/Tooltip/Tooltip'
import { useEditBundledQuoteMutation } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import { gqlDateFormat } from 'pages/OfferNew/Introduction/Sidebar/utils'
import { useTextKeys, TextKeyMap } from 'utils/textKeys'

const HandleSwitchingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  flex: 1 0 auto;
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.5rem;
`

const StyledSwitch = styled(Switch)`
  margin-right: 0.5rem;
`

type CancellationOptionsProps = {
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
              quote={quote}
              quoteCartId={quoteCartId}
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
  quoteCartId: string
  quote: OfferQuote
  setShowError: (showError: boolean) => void
}

const QuoteCancellationOption: React.FC<QuoteCancellationOptionProps> = ({
  quoteCartId,
  quote,
  setShowError,
}) => {
  const textKeys = useTextKeys()
  const { isoLocale } = useCurrentLocale()

  const [isLoading, setIsLoading] = React.useState(false)

  const [editQuote] = useEditBundledQuoteMutation()

  const isChecked = !quote.startDate
  const labelContent = getLabelContent(textKeys, quote)

  const handleToggleStartDate = async () => {
    try {
      setShowError(false)
      setIsLoading(true)

      await editQuote({
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
      <HandleSwitchingLabel isClickable={!isLoading}>
        {isLoading ? (
          <StyledSpinner />
        ) : (
          <StyledSwitch value={isChecked} onChange={handleToggleStartDate} />
        )}
        {labelContent}
      </HandleSwitchingLabel>
      <Tooltip
        body={textKeys.SIDEBAR_REQUEST_CANCELLATION_INSURANCE_NAME_TOOLTIP({
          INSURANCE_NAME: quote.displayName,
        })}
      />
    </HandleSwitchingWrapper>
  )
}
