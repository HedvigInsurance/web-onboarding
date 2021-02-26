import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { format, isToday, Locale, parse } from 'date-fns'
import { motion } from 'framer-motion'
import hexToRgba from 'hex-to-rgba'
import { match } from 'matchly'
import React from 'react'
import {
  DateInput as DateInputForm,
  getLocaleImport,
} from 'components/DateInput'
import { DownArrow } from 'components/icons/DownArrow'
import {
  Market,
  useCurrentLocale,
  useMarket,
} from 'components/utils/CurrentLocale'
import { useRemoveStartDateMutation, useStartDateMutation } from 'data/graphql'
import { CancellationOptions } from 'pages/OfferNew/Introduction/Sidebar/CancellationOptions'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import {
  hasCurrentInsurer,
  insuranceTypeTextKeys,
  isBundle,
} from 'pages/OfferNew/utils'
import { useTextKeys } from 'utils/textKeys'
import { Size } from 'components/types'
import { gqlDateFormat } from './utils'
import { StartDateLabelSwitcher } from './StartDateLabelSwitcher'

interface Props {
  offerData: OfferData
  refetch: () => Promise<void>
  modal?: boolean
  size?: Size
}

const DateFormsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1.5rem;
`

const RowButtonWrapper = styled.div`
  width: 100%;
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
  border: 1px solid ${colorsV3.gray500};
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
`

const ErrorMessage = styled(motion.div)`
  background-color: #c9abf5;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 10px;
  color: ${colorsV3.gray900};
`

const DateInputModalWrapper = styled.div<{ isOpen: boolean }>`
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

const StyledDateInput = styled(DateInputForm)<{ modal: boolean }>`
  ${(props) =>
    props.modal &&
    `
  top: 50%;
  transform: translateY(-50%);
  `}
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

const DateForm: React.FC<{
  quote: OfferQuote
  isSplit: boolean
  setShowError: (showError: boolean) => void
  modal?: boolean
  refetch: () => Promise<void>
  size: Size
}> = ({ quote, isSplit, setShowError, modal, refetch, size }) => {
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)
  const [dateValue, setDateValue] = React.useState(() =>
    getDefaultDateValue(quote),
  )
  const [dateLocale, setDateLocale] = React.useState<Locale | null>(null)

  const textKeys = useTextKeys()
  const [
    setStartDate,
    { loading: isLoadingSetStartDate },
  ] = useStartDateMutation()
  const [
    removeStartDate,
    { loading: isLoadingRemoveStartDate },
  ] = useRemoveStartDateMutation()

  const locale = useCurrentLocale()
  const market = useMarket()
  const getDateFormat = match([
    [Market.Se, 'dd MMM yyyy'],
    [Market.No, 'dd/MM/yyyy'],
    [Market.Dk, 'yyyy-MM-dd'],
  ])

  React.useEffect(() => {
    setDateValue(getDefaultDateValue(quote))
  }, [quote])

  React.useEffect(() => {
    getLocaleImport(locale).then((m) => setDateLocale(m.default))
  })

  const handleFail = () => {
    setShowError(true)
  }

  const getDateLabel = () => {
    if (dateValue) {
      if (isToday(dateValue)) {
        return textKeys.SIDEBAR_STARTDATE_CELL_VALUE_NEW()
      }

      return format(dateValue, getDateFormat(market)!, { locale: dateLocale! })
    }
  }

  // TODO: make this function (which returns the calendar component) a regular React function component, in a file of its own
  const getDateInput = () => (
    <StyledDateInput
      open={datePickerOpen}
      setOpen={setDatePickerOpen}
      date={dateValue || new Date()}
      setDate={(newDateValue) => {
        setDateValue(newDateValue)
        setShowError(false)
        if (newDateValue === null) {
          removeStartDate({
            variables: {
              quoteId: quote.id,
            },
          })
            .then(() => refetch())
            .catch(handleFail)
        } else {
          setStartDate({
            variables: {
              quoteId: quote.id,
              date: format(newDateValue, gqlDateFormat),
            },
          })
            .then(() => refetch())
            .catch(handleFail)
        }
      }}
      hasCurrentInsurer={hasCurrentInsurer(quote)}
      modal={Boolean(modal)}
    />
  )

  const hasStartDate = Boolean(getDefaultDateValue(quote))

  return (
    <RowButtonWrapper>
      {isSplit && (
        <StartDateRowLabel>
          {textKeys[insuranceTypeTextKeys[quote.contractType]]()}
        </StartDateRowLabel>
      )}
      <RowButton
        datePickerOpen={datePickerOpen}
        onClick={() => setDatePickerOpen(!datePickerOpen)}
        isSplit={isSplit}
        size={size}
      >
        <Value>
          {!hasStartDate && hasCurrentInsurer(quote) && (
            <StartDateLabelSwitcher dataCollectionId={quote.dataCollectionId} />
          )}
          {hasStartDate && getDateLabel()}
          {(!isLoadingRemoveStartDate || !isLoadingSetStartDate) && (
            <DownArrow />
          )}
        </Value>
      </RowButton>
      {modal ? (
        <DateInputModalWrapper isOpen={datePickerOpen}>
          {getDateInput()}
        </DateInputModalWrapper>
      ) : (
        getDateInput()
      )}
    </RowButtonWrapper>
  )
}

export const StartDate: React.FC<Props> = ({
  offerData,
  refetch,
  modal = false,
  size = 'lg',
}) => {
  const textKeys = useTextKeys()
  const [showError, setShowError] = React.useState(false)

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
          stiffness: 400,
          damping: 100,
        }}
      >
        {textKeys.SIDEBAR_UPDATE_START_DATE_FAILED()}
      </ErrorMessage>
      <DateFormsWrapper>
        {offerData.quotes.map((quote) => (
          <DateForm
            key={quote.id}
            quote={quote}
            setShowError={setShowError}
            modal={modal}
            refetch={refetch}
            isSplit={isBundle(offerData)}
            size={size}
          />
        ))}
      </DateFormsWrapper>

      <CancellationOptions
        quotes={offerData.quotes}
        setShowError={setShowError}
        handleFail={() => setShowError(true)}
        refetch={refetch}
      />
    </>
  )
}
