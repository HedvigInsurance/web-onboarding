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
  isLoading: boolean
  quotes: BundledQuote[]
  onToggleCancellationOption: (isChecked: boolean, quoteId: string) => void
}

export const CancellationOptions = ({
  isLoading,
  quotes,
  onToggleCancellationOption,
}: CancellationOptionsProps) => {
  const textKeys = useTextKeys()

  return (
    <>
      {quotes.map((quote) => {
        const { id, startDate, currentInsurer } = quote
        const isChecked = !startDate
        const checkboxLabel = getLabelContent(textKeys, quote)

        return (
          currentInsurer?.switchable && (
            <HandleSwitchingWrapper key={id}>
              <HandleSwitchingLabel isClickable={!isLoading}>
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

// type QuoteCancellationOptionProps = {
//   quoteCartId: string
//   quote: OfferQuote
//   setShowError: (showError: boolean) => void
// }

// const QuoteCancellationOption = ({
//   quoteCartId,
//   quote,
//   setShowError,
// }: QuoteCancellationOptionProps) => {
//   const textKeys = useTextKeys()
//   const { isoLocale } = useCurrentLocale()

//   const [isLoading, setIsLoading] = React.useState(false)

//   const [editQuote] = useEditBundledQuoteMutation()

//   const isChecked = !quote.startDate
//   const checkboxLabel = getLabelContent(textKeys, quote)

//   const handleToggleStartDate = async () => {
//     try {
//       setShowError(false)
//       setIsLoading(true)

//       await editQuote({
//         variables: {
//           quoteCartId,
//           locale: isoLocale,
//           quoteId: quote.id,
//           payload: {
//             startDate: isChecked ? formatDate(new Date(), gqlDateFormat) : null,
//           },
//         },
//       })
//     } catch (e) {
//       setShowError(true)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <HandleSwitchingWrapper>
//       <HandleSwitchingLabel isClickable={!isLoading}>
//         {isLoading ? (
//           <StyledSpinner />
//         ) : (
//           <StyledSwitch checked={isChecked} onChange={handleToggleStartDate} />
//         )}
//         {checkboxLabel}
//       </HandleSwitchingLabel>
//     </HandleSwitchingWrapper>
//   )
// }
