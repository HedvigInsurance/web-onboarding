import React, { useState, useEffect, useCallback } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { format as formatDate, isToday, Locale, parse } from 'date-fns'
import { motion } from 'framer-motion'
import hexToRgba from 'hex-to-rgba'
import { match } from 'matchly'
import {
  DateInput as DateInputForm,
  getLocaleImport,
} from 'components/DateInput'
import { ChevronDown } from 'components/icons/ChevronDown'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { MarketLabel } from 'l10n/locales'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'
import {
  useQuoteCartQuery,
  CurrentInsurer,
  useEditBundledQuoteMutation,
  BundledQuote,
} from 'data/graphql'
import { StartDateLabelSwitcher } from 'pages/Offer/Introduction/Sidebar/StartDateLabelSwitcher'
import { useTextKeys } from 'utils/textKeys'
import { Size } from 'components/types'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import {
  getSelectedBundleVariant,
  getAllQuotes,
} from 'api/quoteCartQuerySelectors'
import { isCar } from 'api/quoteSelector'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { isCarSwitcher } from 'api/quoteBundleSelectors'
import { Features, useFeature } from 'utils/hooks/useFeature'
import { isStartDateValidForCarSwitching } from 'utils/isStartDateValidForCarSwitching'
import { useExternalDataCollection } from 'utils/hooks/useExternalDataCollection'
import { CancellationOptions } from './CancellationOptions'
import { TooSoonSwitcherErrorModal } from './TooSoonSwitcherErrorModal'

export const gqlDateFormat = 'yyyy-MM-dd'

const DateFormsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
type TFieldLayout = 'left' | 'right' | 'full'

const RowButtonWrapper = styled.div<{
  fieldLayout: TFieldLayout
}>`
  flex: 1 ${({ fieldLayout }) => (fieldLayout !== 'full' ? `50%` : `100%`)};
  margin-top: auto;
  &:nth-of-type(n + 3) {
    margin-top: 0.5rem;
  }
`

const RowButton = styled.button<{
  datePickerOpen: boolean
  fieldLayout: TFieldLayout
  size: Size
}>`
  display: flex;
  justify-content: space-between;
  height: ${(props) => (props.size === 'lg' ? `4.375rem` : `3rem`)};
  width: 100%;
  padding: 0 1rem;
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

  ${({ fieldLayout }) =>
    fieldLayout !== 'full' &&
    css`
      border-radius: 0;
      border-right-width: 0;

      ${fieldLayout === 'left' &&
        `
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      `}
      ${fieldLayout === 'right' &&
        `
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border-right-width: 1px;
      `}
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
  z-index: 1;
`

const getDefaultDateValue = (
  startDate: string | null,
  isSwitcher?: boolean,
) => {
  if (startDate) {
    return parse(startDate, 'yyyy-MM-dd', new Date())
  }

  // If user is a switcher, we accept null as default start date - it translates to "as soon as possible"
  if (isSwitcher) {
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
  startDate: string | null
  currentInsurer?: CurrentInsurer
  currentInsurerRenewalDate?: Date
  userIsCarSwitcher?: boolean
  dataCollectionId?: string
  quoteDisplayName: string
  fieldLayout: TFieldLayout
  modal?: boolean
  disabled?: boolean
  size: Size
  onChange: (date: Date | null) => void
  loading: boolean
  displayLabel?: boolean
}

const DateForm = ({
  startDate,
  currentInsurer,
  currentInsurerRenewalDate,
  userIsCarSwitcher = false,
  dataCollectionId,
  quoteDisplayName,
  fieldLayout,
  modal = false,
  disabled = false,
  size,
  onChange,
  loading,
  displayLabel,
}: DateFormProps) => {
  // We should take car-specific switchable from backend
  const isSwitcher = currentInsurer?.switchable || userIsCarSwitcher
  // ...currently is only knows if home insurance providers are switchable
  const isCurrentHomeInsuranceSwitchable = currentInsurer?.switchable === true

  // We do not accept null as default value for Car insurances,
  // so even if user is a switcher, we do not include car switchers in this logic
  const dateValue = getDefaultDateValue(
    startDate,
    currentInsurer?.switchable === true,
  )

  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const getDateLabel = useGetDateLabel()

  const dateInputForm = (
    <DateInputForm
      open={datePickerOpen}
      setOpen={setDatePickerOpen}
      date={dateValue || new Date()}
      setDate={onChange}
      currentInsurerRenewalDate={
        // For home insurance we create a pending contract with null as start date
        isCurrentHomeInsuranceSwitchable ? null : currentInsurerRenewalDate
      }
    />
  )
  return (
    <RowButtonWrapper fieldLayout={fieldLayout}>
      {displayLabel && (
        <StartDateRowLabel>{quoteDisplayName}</StartDateRowLabel>
      )}
      <RowButton
        disabled={disabled}
        datePickerOpen={datePickerOpen}
        onClick={() => setDatePickerOpen(!datePickerOpen)}
        fieldLayout={fieldLayout}
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
              {isSwitcher && !dateValue && (
                <StartDateLabelSwitcher dataCollectionId={dataCollectionId} />
              )}
              {dateValue && getDateLabel(dateValue)}
              <ChevronDown />
            </>
          )}
        </Value>
      </RowButton>
      {modal ? (
        <DateInputModalWrapper isOpen={datePickerOpen}>
          {dateInputForm}
        </DateInputModalWrapper>
      ) : (
        dateInputForm
      )}
    </RowButtonWrapper>
  )
}

export type StartDateProps = {
  singleDate: boolean
  selectedQuotes: BundledQuote[]
  isLoading: boolean
  onSelect: (quoteId: string, startDate: Date | null) => Promise<void>
  modal?: boolean
  size?: Size
  currentInsurerRenewalDate?: Date
}

export const StartDate = ({
  singleDate,
  selectedQuotes,
  isLoading,
  onSelect,
  modal = false,
  size = 'lg',
  currentInsurerRenewalDate,
}: StartDateProps) => {
  const [carCancellationEnabled] = useFeature([Features.CAR_CANCELLATION])
  const userIsCarSwitcher =
    carCancellationEnabled && isCarSwitcher(selectedQuotes)
  const textKeys = useTextKeys()
  const [showError, setShowError] = useState(false)
  const [showTooSoonError, setShowToSoonError] = useState(false)
  const [loadingQuoteIds, setLoadingQuoteIds] = useState<Array<string>>([])

  const handleSelectNewStartDate = async (
    newDateValue: Date | null,
    quoteIds: Array<string>,
  ) => {
    try {
      setShowToSoonError(
        userIsCarSwitcher && !isStartDateValidForCarSwitching(newDateValue),
      )

      setShowError(false)
      setLoadingQuoteIds(quoteIds)
      await Promise.all(
        quoteIds.map((quoteId) => onSelect(quoteId, newDateValue)),
      )
    } catch {
      setShowError(true)
    } finally {
      setLoadingQuoteIds([])
    }
  }

  const singleDateQuote = singleDate ? selectedQuotes[0] : undefined

  return (
    <>
      <ErrorMessage
        aria-hidden={!showError}
        initial={{ height: 0, opacity: 0, display: 'none' }}
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
      <TooSoonSwitcherErrorModal
        isVisible={showTooSoonError}
        onClose={() => setShowToSoonError(false)}
      />
      <DateFormsWrapper>
        {singleDateQuote ? (
          <DateForm
            startDate={singleDateQuote.startDate}
            currentInsurer={singleDateQuote.currentInsurer ?? undefined}
            currentInsurerRenewalDate={currentInsurerRenewalDate}
            userIsCarSwitcher={userIsCarSwitcher}
            quoteDisplayName={singleDateQuote.displayName}
            dataCollectionId={singleDateQuote.dataCollectionId ?? undefined}
            modal={modal}
            disabled={
              loadingQuoteIds.length > 0 ||
              Boolean(
                singleDateQuote.currentInsurer?.switchable &&
                  !singleDateQuote.startDate,
              ) ||
              isLoading
            }
            fieldLayout={'full'}
            size={size}
            onChange={(newDate) =>
              handleSelectNewStartDate(
                newDate,
                selectedQuotes?.map((q) => q.id),
              )
            }
            loading={loadingQuoteIds.length > 0 || isLoading}
          />
        ) : (
          <>
            {selectedQuotes?.map((quote, index, arr) => {
              const isArrayLengthEven = arr.length % 2 === 0
              const isItemIndexEven = index % 2 === 0
              const isExpandedFirstItem = index === 0 && !isArrayLengthEven

              return (
                <DateFormWrapper key={quote.id}>
                  <DateForm
                    startDate={quote.startDate}
                    currentInsurer={quote.currentInsurer ?? undefined}
                    currentInsurerRenewalDate={currentInsurerRenewalDate}
                    userIsCarSwitcher={userIsCarSwitcher}
                    quoteDisplayName={quote.displayName}
                    dataCollectionId={quote.dataCollectionId ?? undefined}
                    modal={modal}
                    disabled={
                      loadingQuoteIds.length > 0 ||
                      Boolean(
                        quote.currentInsurer?.switchable && !quote.startDate,
                      ) ||
                      isLoading
                    }
                    fieldLayout={
                      isExpandedFirstItem
                        ? 'full'
                        : isItemIndexEven
                        ? isArrayLengthEven
                          ? 'left'
                          : 'right'
                        : isArrayLengthEven
                        ? 'right'
                        : 'left'
                    }
                    size={size}
                    onChange={(newDate) =>
                      handleSelectNewStartDate(newDate, [quote.id])
                    }
                    loading={loadingQuoteIds.includes(quote.id) || isLoading}
                    displayLabel
                  />
                </DateFormWrapper>
              )
            })}
          </>
        )}
      </DateFormsWrapper>

      <CancellationOptions
        quotes={selectedQuotes}
        isDisabled={loadingQuoteIds.length > 0 || isLoading}
        onToggleCancellationOption={(isChecked, quoteId) =>
          handleSelectNewStartDate(isChecked ? null : new Date(), [quoteId])
        }
      />
    </>
  )
}

export const useStartDateProps = (): Omit<StartDateProps, 'size' | 'modal'> => {
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const { isoLocale, marketLabel } = useCurrentLocale()

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

  const selectedQuotes = quoteBundleSelector.getQuotes(selectedBundle)
  const [editQuote, { loading: isLoading }] = useEditBundledQuoteMutation()

  const onSelect = async (quoteId: string, startDate: Date | null) => {
    const formattedDateValue =
      startDate !== null ? formatDate(startDate, gqlDateFormat) : null
    const quotes = getAllQuotes(quoteCartQueryData)
    const quotesToBeUpdated = [quoteId]

    // Car quotes need to share the same start date
    const selectedQuote = quotes.find(({ id }) => quoteId === id)
    const isUpdatingCarQuote =
      selectedQuote !== undefined && isCar(selectedQuote)
    if (isUpdatingCarQuote) {
      const remainingCarQuotes = quotes.filter(
        (quote) => quote.id !== quoteId && isCar(quote),
      )
      remainingCarQuotes.forEach((quote) => quotesToBeUpdated.push(quote.id))
    }

    await Promise.all(
      quotesToBeUpdated.map((quoteId) =>
        editQuote({
          variables: {
            quoteCartId,
            quoteId,
            locale: isoLocale,
            payload: {
              startDate: formattedDateValue,
            },
          },
        }),
      ),
    )
  }

  const matchingDataCollection = useExternalDataCollection(quoteCartQueryData, {
    async onCompleted(data) {
      // CAR: pre-select current insurance renewal date as start date
      const isCarAndWithoutStartDate = selectedQuotes.every(
        (quote) => isCar(quote) && quote.startDate === null,
      )
      if (!isCarAndWithoutStartDate) return

      const renewalDate = data.renewalDate
        ? new Date(data.renewalDate)
        : undefined

      if (!renewalDate) return

      await Promise.all(
        selectedQuotes.map((quote) =>
          onSelect(quote.id, new Date(renewalDate)),
        ),
      )
    },
  })

  return {
    singleDate,
    selectedQuotes,
    isLoading: isLoading,
    onSelect,
    currentInsurerRenewalDate: matchingDataCollection
      ? new Date(matchingDataCollection.renewalDate)
      : undefined,
  }
}

export const useGetDateLabel = () => {
  const textKeys = useTextKeys()
  const { isoLocale, marketLabel } = useCurrentLocale()
  const [dateLocale, setDateLocale] = useState<Locale | null>(null)

  useEffect(() => {
    getLocaleImport(isoLocale).then((m) => setDateLocale(m.default))
  }, [isoLocale])

  return useCallback(
    (dateValue: Date) => {
      if (dateLocale) {
        if (isToday(dateValue)) {
          return textKeys.SIDEBAR_STARTDATE_CELL_VALUE_NEW()
        }

        return formatDate(dateValue, getDateFormat(marketLabel)!, {
          locale: dateLocale,
        })
      }
    },
    [dateLocale, textKeys, marketLabel],
  )
}

const DateFormWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '100%',
})
