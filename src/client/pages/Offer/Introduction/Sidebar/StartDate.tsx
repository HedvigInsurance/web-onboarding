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
  CurrentInsurer,
} from 'data/graphql'
import { gqlDateFormat } from 'pages/OfferNew/Introduction/Sidebar/utils'
import { StartDateLabelSwitcher } from 'pages/OfferNew/Introduction/Sidebar/StartDateLabelSwitcher'
import { useTextKeys } from 'utils/textKeys'
import { Size } from 'components/types'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { getSelectedBundleVariant } from 'api/quoteCartQuerySelectors'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
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

type DateFormProps = {
  startDate: any
  currentInsurer?: CurrentInsurer
  dataCollectionId?: string
  quoteDisplayName: string
  isSplit: boolean
  modal?: boolean
  size: Size
  onChange: (date: Date | null) => void
  loading: boolean
}

const DateForm = ({
  startDate,
  currentInsurer,
  dataCollectionId,
  quoteDisplayName,
  isSplit,
  modal = false,
  size,
  onChange,
  loading,
}: DateFormProps) => {
  const textKeys = useTextKeys()
  const { isoLocale, marketLabel } = useCurrentLocale()

  const [dateValue, setDateValue] = useState(() =>
    getDefaultDateValue(startDate, currentInsurer),
  )
  const [dateLocale, setDateLocale] = useState<Locale | null>(null)

  const [datePickerOpen, setDatePickerOpen] = useState(false)

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

  return (
    <RowButtonWrapper isSplit={isSplit}>
      {isSplit && <StartDateRowLabel>{quoteDisplayName}</StartDateRowLabel>}
      <RowButton
        disabled={currentInsurer && !startDate}
        datePickerOpen={datePickerOpen}
        onClick={() => setDatePickerOpen(!datePickerOpen)}
        isSplit={isSplit}
        size={size}
      >
        <Value>
          {loading && (
            <LoadingDotsWrapper>
              <LoadingDots color={colorsV3.gray500} />
            </LoadingDotsWrapper>
          )}
          {!loading && (
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
            setDate={onChange}
            hasCurrentInsurer={Boolean(currentInsurer)}
          />
        </DateInputModalWrapper>
      ) : (
        <DateInputForm
          open={datePickerOpen}
          setOpen={setDatePickerOpen}
          date={dateValue || new Date()}
          setDate={onChange}
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

export const StartDate = ({
  quoteCartId,
  modal = false,
  size = 'lg',
}: StartDateProps) => {
  const textKeys = useTextKeys()
  const [showError, setShowError] = useState(false)
  const [loadingQuoteIds, setLoadingQuoteIds] = React.useState<Array<string>>(
    [],
  )

  const { isoLocale, marketLabel } = useCurrentLocale()
  const [createQuoteBundle] = useCreateQuoteBundleMutation()
  const { data: quoteCartQueryData } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: isoLocale },
  })
  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()
  const { bundle: selectedBundle } =
    getSelectedBundleVariant(quoteCartQueryData, selectedInsuranceTypes) ?? {}
  const singleDate = quoteBundleSelector.isSingleStartDate(
    selectedBundle,
    marketLabel,
  )
  const quotes = quoteBundleSelector.getQuotes(selectedBundle)

  if (quotes.length === 0) throw Error('Selected bundle has no quotes')

  const handleSelectNewStartDate = async (
    newDateValue: Date | null,
    quoteIds: Array<string>,
  ) => {
    try {
      setShowError(false)
      setLoadingQuoteIds(quoteIds)

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
    } catch {
      setShowError(true)
    } finally {
      setLoadingQuoteIds([])
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
            startDate={quotes[0].startDate}
            currentInsurer={quotes[0].currentInsurer ?? undefined}
            quoteDisplayName={quotes[0].displayName}
            dataCollectionId={quotes[0].dataCollectionId ?? undefined}
            modal={modal}
            isSplit={false}
            size={size}
            onChange={(newDate) =>
              handleSelectNewStartDate(
                newDate,
                quotes.map((q) => q.id),
              )
            }
            loading={loadingQuoteIds.length > 0}
          />
        ) : (
          <>
            {quotes.map((quote) => (
              <DateForm
                key={quote.id}
                startDate={quote.startDate}
                currentInsurer={quote.currentInsurer ?? undefined}
                quoteDisplayName={quote.displayName}
                dataCollectionId={quote.dataCollectionId ?? undefined}
                modal={modal}
                isSplit={quoteBundleSelector.isMultiQuote(selectedBundle)}
                size={size}
                onChange={(newDate) =>
                  handleSelectNewStartDate(newDate, [quote.id])
                }
                loading={loadingQuoteIds.includes(quote.id)}
              />
            ))}
          </>
        )}
      </DateFormsWrapper>

      <CancellationOptions
        quotes={quotes}
        loadingQuoteIds={loadingQuoteIds}
        onToggleCancellationOption={(isChecked, quoteId) =>
          handleSelectNewStartDate(isChecked ? null : new Date(), [quoteId])
        }
      />
    </>
  )
}
