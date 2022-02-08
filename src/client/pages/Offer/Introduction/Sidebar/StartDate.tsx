import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { format as formatDate, isToday, Locale, parse } from 'date-fns'
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
import {
  useCreateQuoteBundleMutation,
  useQuoteCartQuery,
  BundledQuote,
  CurrentInsurer,
} from 'data/graphql'
import { gqlDateFormat } from 'pages/OfferNew/Introduction/Sidebar/utils'
import { StartDateLabelSwitcher } from 'pages/OfferNew/Introduction/Sidebar/StartDateLabelSwitcher'
import { useTextKeys } from 'utils/textKeys'
import { Size } from 'components/types'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { getSelectedBundleVariant } from 'api/quoteCartQuerySelectors'
import {
  isSingleStartDateBundle,
  getQuotes,
  isMultiQuoteBundle,
} from 'api/quoteBundleSelectors'
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

  :active {
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

const getDefaultDateValue = (
  startDate: string,
  currentInsurer?: CurrentInsurer,
) => {
  if (startDate) {
    return parse(startDate, 'yyyy-MM-dd', new Date())
  }

  if (currentInsurer) {
    return null
  }

  return new Date()
}

const getDateFormat = match<MarketLabel, string>([
  ['SE', 'dd MMM yyyy'],
  ['NO', 'dd/MM/yyyy'],
  ['DK', 'yyyy-MM-dd'],
])

const DateForm: React.FC<{
  quoteIds: string[]
  quoteCartId: string
  quotes: BundledQuote[]
  startDate: any
  currentInsurer?: CurrentInsurer
  dataCollectionId?: string
  quoteDisplayName: string
  isSingleStartDateBundle?: boolean
  isSplit: boolean
  setShowError: (showError: boolean) => void
  modal?: boolean
  size: Size
}> = ({
  quoteIds,
  quoteCartId,
  quotes,
  startDate,
  currentInsurer,
  dataCollectionId,
  quoteDisplayName,
  isSplit,
  setShowError,
  modal = false,
  size,
}) => {
  const textKeys = useTextKeys()
  const { isoLocale, marketLabel } = useCurrentLocale()

  const [dateValue, setDateValue] = useState(() =>
    getDefaultDateValue(startDate, currentInsurer),
  )
  const [dateLocale, setDateLocale] = useState<Locale | null>(null)
  const [isLoadingPickedStartDate, setIsLoadingPickedStartDate] = useState(
    false,
  )

  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const [createQuoteBundle] = useCreateQuoteBundleMutation()

  useEffect(() => {
    setDateValue(getDefaultDateValue(startDate, currentInsurer))
  }, [startDate, currentInsurer])

  useEffect(() => {
    getLocaleImport(isoLocale).then((m) => setDateLocale(m.default))
  }, [isoLocale])

  const getDateLabel = () => {
    if (dateValue) {
      if (isToday(dateValue)) {
        return textKeys.SIDEBAR_STARTDATE_CELL_VALUE_NEW()
      }

      return formatDate(dateValue, getDateFormat(marketLabel)!, {
        locale: dateLocale!,
      })
    }
  }

  const handleSetDate = async (newDateValue: Date | null) => {
    try {
      setShowError(false)
      setIsLoadingPickedStartDate(true)

      const formattedDateValue =
        newDateValue !== null ? formatDate(newDateValue, gqlDateFormat) : null

      await createQuoteBundle({
        variables: {
          locale: isoLocale,
          quoteCartId,
          quotes: quotes.map((quote) => {
            const {
              id,
              firstName,
              lastName,
              birthDate,
              email,
              ssn,
              phoneNumber,
              dataCollectionId,
              currentInsurer,
              data,
            } = quote

            return {
              firstName,
              lastName,
              email,
              birthDate,
              ssn,
              currentInsurer: currentInsurer?.id,
              phoneNumber,
              dataCollectionId,
              startDate: quoteIds.includes(id)
                ? formattedDateValue
                : quote.startDate,
              data,
            }
          }),
        },
      })

      setDateValue(newDateValue)
    } catch {
      setShowError(true)
    } finally {
      setIsLoadingPickedStartDate(false)
    }
  }

  return (
    <RowButtonWrapper isSplit={isSplit}>
      {isSplit && <StartDateRowLabel>{quoteDisplayName}</StartDateRowLabel>}
      <RowButton
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
              {!dateValue && currentInsurer && (
                <StartDateLabelSwitcher dataCollectionId={dataCollectionId} />
              )}
              {dateValue && getDateLabel()}
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
            hasCurrentInsurer={Boolean(currentInsurer)}
          />
        </DateInputModalWrapper>
      ) : (
        <DateInputForm
          open={datePickerOpen}
          setOpen={setDatePickerOpen}
          date={dateValue || new Date()}
          setDate={handleSetDate}
          hasCurrentInsurer={Boolean(currentInsurer)}
        />
      )}
    </RowButtonWrapper>
  )
}

export type StartDateProps = {
  quoteCartId: string
  modal?: boolean
  size?: Size
}

export const StartDate: React.FC<StartDateProps> = ({
  quoteCartId,
  modal = false,
  size = 'lg',
}) => {
  const textKeys = useTextKeys()
  const [showError, setShowError] = useState(false)
  const [
    isCancellationOptionLoading,
    setIsCancellationOptionLoading,
  ] = React.useState(false)

  const { isoLocale, marketLabel } = useCurrentLocale()
  const [createQuoteBundle] = useCreateQuoteBundleMutation()
  const { data: quoteCartQueryData } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: isoLocale },
  })
  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()
  const selectedQuoteBundle = getSelectedBundleVariant(
    quoteCartQueryData,
    selectedInsuranceTypes,
  )
  const singleDate = isSingleStartDateBundle(selectedQuoteBundle, marketLabel)
  const quotes = getQuotes(selectedQuoteBundle)

  if (quotes.length === 0) throw Error('Selected bundle has no quotes')

  const onToggleCancellationOption = async (
    isChecked: boolean,
    quoteId: string,
  ) => {
    try {
      setShowError(false)
      setIsCancellationOptionLoading(true)

      await createQuoteBundle({
        variables: {
          locale: isoLocale,
          quoteCartId,
          quotes: quotes.map((quote) => {
            const {
              id,
              firstName,
              lastName,
              birthDate,
              email,
              ssn,
              phoneNumber,
              startDate,
              currentInsurer,
              dataCollectionId,
              data,
            } = quote

            const todaysDate = formatDate(new Date(), gqlDateFormat)
            const newStartDate =
              id === quoteId ? (isChecked ? null : todaysDate) : startDate

            return {
              firstName,
              lastName,
              email,
              birthDate,
              ssn,
              currentInsurer: currentInsurer?.id,
              phoneNumber,
              dataCollectionId,
              startDate: newStartDate,
              data,
            }
          }),
        },
      })
    } catch (e) {
      setShowError(true)
    } finally {
      setIsCancellationOptionLoading(false)
    }
  }

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
        {singleDate ? (
          <DateForm
            key={quotes[0].id}
            quoteIds={quotes.map((q) => q.id)}
            quoteCartId={quoteCartId}
            quotes={quotes}
            startDate={quotes[0].startDate}
            currentInsurer={quotes[0].currentInsurer ?? undefined}
            quoteDisplayName={quotes[0].displayName}
            dataCollectionId={quotes[0].dataCollectionId ?? undefined}
            setShowError={setShowError}
            modal={modal}
            isSingleStartDateBundle={singleDate}
            isSplit={false}
            size={size}
          />
        ) : (
          <>
            {quotes.map((quote) => (
              <DateForm
                key={quote.id}
                quoteIds={[quote.id]}
                quoteCartId={quoteCartId}
                startDate={quote.startDate}
                currentInsurer={quote.currentInsurer ?? undefined}
                quoteDisplayName={quote.displayName}
                dataCollectionId={quote.dataCollectionId ?? undefined}
                quotes={quotes}
                setShowError={setShowError}
                modal={modal}
                isSplit={isMultiQuoteBundle(selectedQuoteBundle)}
                size={size}
              />
            ))}
          </>
        )}
      </DateFormsWrapper>

      <CancellationOptions
        quotes={quotes}
        isLoading={isCancellationOptionLoading}
        onToggleCancellationOption={onToggleCancellationOption}
      />
    </>
  )
}
