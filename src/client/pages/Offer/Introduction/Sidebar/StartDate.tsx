import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { format, isToday, Locale, parse } from 'date-fns'
import { motion } from 'framer-motion'
import hexToRgba from 'hex-to-rgba'
import { match } from 'matchly'
import React, { useState, useEffect } from 'react'
import {
  DateInput as DateInputForm,
  getLocaleImport,
} from 'components/DateInput'
import { ChevronDown } from 'components/icons/ChevronDown'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { MarketLabel } from 'l10n/locales'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'
import { useEditBundledQuoteMutation } from 'data/graphql'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import { hasCurrentInsurer, isBundle, isDanish } from 'pages/OfferNew/utils'
import { gqlDateFormat } from 'pages/OfferNew/Introduction/Sidebar/utils'
import { StartDateLabelSwitcher } from 'pages/OfferNew/Introduction/Sidebar/StartDateLabelSwitcher'
import { useTextKeys } from 'utils/textKeys'
import { Size } from 'components/types'
import { CancellationOptions } from './CancellationOptions'

const DateFormsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1.5rem;
`

const RowButtonWrapper = styled.div<{
  isSplit: boolean
}>`
  width: ${({ isSplit }) => (isSplit ? `50%` : `100%`)};
  flex: 1;
`

const RowButton = styled.button<{
  datePickerOpen: boolean
  isSplit: boolean
  size: Size
}>`
  display: flex;
  justify-content: space-between;
  height: ${(props) => (props.size === 'lg' ? `4.375rem` : `3rem`)};
  width: 100%;
  padding: 0 1.5rem;
  border: 1px solid ${colorsV3.gray300};
  outline: 0;
  background-color: ${colorsV3.white};
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  transition: background-color 250ms, border 250ms;

  &:active {
    background-color: ${colorsV3.gray300};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${colorsV3.gray300};
  }

  ${(props) =>
    props.datePickerOpen && `border: 1px solid ${colorsV3.gray900};`};

  ${({ isSplit }) =>
    isSplit &&
    css`
      border-radius: 0;
      border-right-width: 0;

      ${RowButtonWrapper}:first-of-type & {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      ${RowButtonWrapper}:last-of-type & {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-right-width: 1px;
      }
    `}
`

const StartDateRowLabel = styled.div`
  color: ${colorsV3.gray500};
  font-size: 0.75rem;
  padding-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Value = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colorsV3.gray900};
  text-transform: capitalize;
`

const LoadingDotsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ErrorMessage = styled(motion.div)`
  background-color: ${colorsV3.purple500};
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 10px;
  color: ${colorsV3.gray900};
`

const DateInputModalWrapper = styled.div<{
  isOpen: boolean
}>`
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${hexToRgba(colorsV3.white, 0.8)};
  top: 0;
  left: 0;
  transition: all 0.2s;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 8px;
`

const getDefaultDateValue = (quote: OfferQuote) => {
  if (quote.startDate) {
    return parse(quote.startDate, 'yyyy-MM-dd', new Date())
  }

  if (hasCurrentInsurer(quote)) {
    return null
  }

  return new Date()
}

const getDateFormat = match<MarketLabel, string>([
  ['SE', 'dd MMM yyyy'],
  ['NO', 'dd/MM/yyyy'],
  ['DK', 'yyyy-MM-dd'],
])

type DateFormProps = {
  quoteCartId: string
  quote: OfferQuote
  offerData: OfferData
  isSingleStartDateBundle?: boolean
  isSplit: boolean
  setShowError: (showError: boolean) => void
  modal?: boolean
  disabled?: boolean
  size: Size
}

const DateForm = ({
  quoteCartId,
  quote,
  offerData,
  isSingleStartDateBundle = false,
  isSplit,
  setShowError,
  modal = false,
  disabled,
  size,
}: DateFormProps) => {
  const textKeys = useTextKeys()
  const { isoLocale, marketLabel } = useCurrentLocale()

  const [dateValue, setDateValue] = useState(() => getDefaultDateValue(quote))
  const [dateLocale, setDateLocale] = useState<Locale | null>(null)
  const [isLoadingPickedStartDate, setIsLoadingPickedStartDate] = useState(
    false,
  )
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const [editQuote] = useEditBundledQuoteMutation()

  useEffect(() => {
    setDateValue(getDefaultDateValue(quote))
  }, [quote])

  useEffect(() => {
    getLocaleImport(isoLocale).then((m) => setDateLocale(m.default))
  }, [isoLocale])

  const getDateLabel = () => {
    if (dateValue) {
      if (isToday(dateValue)) {
        return textKeys.SIDEBAR_STARTDATE_CELL_VALUE_NEW()
      }

      return format(dateValue, getDateFormat(marketLabel)!, {
        locale: dateLocale!,
      })
    }
  }

  const handleSetDate = async (newDateValue: Date | null) => {
    try {
      setShowError(false)
      setIsLoadingPickedStartDate(true)

      const formattedDateValue =
        newDateValue !== null ? format(newDateValue, gqlDateFormat) : null
      const quotesToBeUpdated = isSingleStartDateBundle
        ? offerData.quotes
        : [quote]

      await Promise.all(
        quotesToBeUpdated.map((quote) =>
          editQuote({
            variables: {
              quoteCartId,
              locale: isoLocale,
              quoteId: quote.id,
              payload: {
                startDate: formattedDateValue,
              },
            },
          }),
        ),
      )

      setDateValue(newDateValue)
    } catch {
      setShowError(true)
    } finally {
      setIsLoadingPickedStartDate(false)
    }
  }

  const hasStartDate = Boolean(getDefaultDateValue(quote))

  return (
    <RowButtonWrapper isSplit={isSplit}>
      {isSplit && <StartDateRowLabel>{quote.displayName}</StartDateRowLabel>}
      <RowButton
        disabled={disabled}
        datePickerOpen={datePickerOpen}
        onClick={() => setDatePickerOpen(!datePickerOpen)}
        isSplit={isSplit}
        size={size}
      >
        <Value>
          {isLoadingPickedStartDate && (
            <LoadingDotsWrapper>
              <LoadingDots color={colorsV3.gray500} />
            </LoadingDotsWrapper>
          )}
          {!isLoadingPickedStartDate && (
            <>
              {!hasStartDate && hasCurrentInsurer(quote) && (
                <StartDateLabelSwitcher
                  dataCollectionId={quote.dataCollectionId}
                />
              )}
              {hasStartDate && getDateLabel()}
              <ChevronDown />
            </>
          )}
        </Value>
      </RowButton>
      {modal ? (
        <DateInputModalWrapper isOpen={datePickerOpen}>
          <DateInputForm
            open={datePickerOpen}
            setOpen={setDatePickerOpen}
            date={dateValue || new Date()}
            setDate={handleSetDate}
            hasCurrentInsurer={hasCurrentInsurer(quote)}
          />
        </DateInputModalWrapper>
      ) : (
        <DateInputForm
          open={datePickerOpen}
          setOpen={setDatePickerOpen}
          date={dateValue || new Date()}
          setDate={handleSetDate}
          hasCurrentInsurer={hasCurrentInsurer(quote)}
        />
      )}
    </RowButtonWrapper>
  )
}

export type StartDateProps = {
  quoteCartId: string
  offerData: OfferData
  modal?: boolean
  size?: Size
}

export const StartDate: React.FC<StartDateProps> = ({
  quoteCartId,
  offerData,
  modal = false,
  size = 'lg',
}) => {
  const textKeys = useTextKeys()

  const [showError, setShowError] = useState(false)

  // TODO: Make this flag more generic. This logic should not live here.
  const isSingleStartDateBundle = isBundle(offerData) && isDanish(offerData)

  return (
    <>
      <ErrorMessage
        aria-hidden={!showError}
        initial={{ height: 0, opacity: 0 }}
        animate={
          showError
            ? { height: 'auto', opacity: 1, display: 'block' }
            : { height: 0, opacity: 0, display: 'none' }
        }
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 50,
        }}
      >
        {textKeys.SIDEBAR_UPDATE_START_DATE_FAILED()}
      </ErrorMessage>
      <DateFormsWrapper>
        {isSingleStartDateBundle ? (
          <DateForm
            key={offerData.quotes[0].id}
            disabled={!offerData.quotes[0].startDate}
            quoteCartId={quoteCartId}
            quote={offerData.quotes[0]}
            offerData={offerData}
            setShowError={setShowError}
            modal={modal}
            isSingleStartDateBundle
            isSplit={false}
            size={size}
          />
        ) : (
          <>
            {offerData.quotes.map((quote) => (
              <DateForm
                key={quote.id}
                disabled={!quote.startDate}
                quoteCartId={quoteCartId}
                quote={quote}
                offerData={offerData}
                setShowError={setShowError}
                modal={modal}
                isSplit={isBundle(offerData)}
                size={size}
              />
            ))}
          </>
        )}
      </DateFormsWrapper>

      <CancellationOptions
        quoteCartId={quoteCartId}
        quotes={offerData.quotes}
        setShowError={setShowError}
      />
    </>
  )
}
