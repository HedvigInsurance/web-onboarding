import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { externalInsuranceProviders } from '@hedviginsurance/embark'
import { DateInput } from 'components/DateInput'
import { Switch } from 'components/Switch'
import {
  useExternalInsuranceDataQuery,
  useRemoveStartDateMutation,
  useStartDateMutation,
} from 'data/graphql'
import { format, isToday } from 'date-fns'
import { motion } from 'framer-motion'
import hexToRgba from 'hex-to-rgba'
import { OfferData } from 'pages/OfferNew/types'
import { getQuoteIds, hasCurrentInsurer, isBundle } from 'pages/OfferNew/utils'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { CalendarIcon } from './CalendarIcon'

interface Props {
  offerData: OfferData
  refetch: () => Promise<void>
  modal?: boolean
}

const RowButton = styled.button<{ datePickerOpen: boolean }>`
  width: 100%;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
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
`

const Label = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const DateLabel = styled.span`
  margin-right: 5px;
`

const Title = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colorsV3.gray900};
`

const SubTitle = styled.div`
  font-size: 0.75rem;
  line-height: 0.75rem;
  font-weight: 200;
  color: ${colorsV3.gray700};
`

const Value = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colorsV3.gray700};
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`

const HandleSwitchingWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 1.25rem;
`

const HandleSwitchingLabel = styled.span`
  font-size: 0.8rem;
  line-height: 0.9rem;
  color: ${colorsV3.gray700};
  width: 50%;
`

const ErrorMessage = styled(motion.div)`
  background-color: ${colorsV3.purple500};
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 10px;
  color: ${colorsV3.gray900};
`

const DataCollectedStartDateWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  text-align: right;
  margin-right: 0.5rem;
`

const DataCollectedStartDateDescription = styled.span`
  font-size: 0.75rem;
  line-height: 0.75rem;
  color: ${colorsV3.gray700};
`

const DataCollectedStartDateValue = styled.span`
  font-size: 1rem;
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

const StyledDateInput = styled(DateInput)<{ modal: boolean }>`
  ${(props) =>
    props.modal &&
    `
  top: 50%;
  transform: translateY(-50%);
  `}
`

const getExternalInsuranceData = (offerData: OfferData) => {
  // TODO: At some point we should handle external insurance data for bundles
  if (isBundle(offerData)) {
    return undefined
  }
  const { data: externalInsuranceData } = useExternalInsuranceDataQuery({
    variables: {
      reference: offerData.quotes[0].dataCollectionId || '',
    },
  })
  return externalInsuranceData
}

export const StartDate: React.FC<Props> = ({
  offerData,
  refetch,
  modal = false,
}) => {
  const externalInsuranceData = getExternalInsuranceData(offerData)

  const getDefaultDateValue = () => {
    if (offerData.startDate) {
      return offerData.startDate
    }

    if (hasCurrentInsurer(offerData)) {
      return null
    }

    return new Date()
  }

  const [datePickerOpen, setDatePickerOpen] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [dateValue, setDateValue] = React.useState(getDefaultDateValue)
  const textKeys = useTextKeys()
  const [setStartDate] = useStartDateMutation()
  const [removeStartDate] = useRemoveStartDateMutation()

  React.useEffect(() => {
    setDateValue(getDefaultDateValue())
  }, [offerData.startDate])

  const handleFail = () => {
    setShowError(true)
  }

  const getDateLabel = () => {
    if (dateValue) {
      if (isToday(dateValue)) {
        return textKeys.SIDEBAR_STARTDATE_CELL_VALUE_NEW()
      }

      return format(dateValue, 'dd MMM yyyy')
    }

    const firstExternalInsurance =
      externalInsuranceData?.externalInsuranceProvider?.dataCollection[0]
    const renewalDate = firstExternalInsurance?.renewalDate

    if (renewalDate) {
      const externalInsuranceProvider = externalInsuranceProviders.find(
        (provider: { externalCollectionId?: string }) =>
          provider.externalCollectionId ===
          firstExternalInsurance?.insuranceProvider?.toUpperCase(),
      )

      return (
        <DataCollectedStartDateWrapper>
          <DataCollectedStartDateValue>
            {renewalDate}
          </DataCollectedStartDateValue>
          <DataCollectedStartDateDescription>
            {textKeys.START_DATE_EXTERNAL_PROVIDER_SWITCH({
              insuranceProvider: externalInsuranceProvider?.name,
            })}
          </DataCollectedStartDateDescription>
        </DataCollectedStartDateWrapper>
      )
    }

    return textKeys.SIDEBAR_STARTDATE_CELL_VALUE_SWITCHER()
  }

  const gqlDateFormat = 'yyyy-MM-dd'

  const quoteIds = getQuoteIds(offerData)

  const getDateInput = () => (
    <StyledDateInput
      open={datePickerOpen}
      setOpen={setDatePickerOpen}
      date={dateValue || new Date()}
      setDate={(newDateValue) => {
        setDateValue(newDateValue)
        setShowError(false)
        if (newDateValue === null) {
          Promise.all(
            quoteIds.map((quoteId) =>
              removeStartDate({
                variables: {
                  quoteId,
                },
              }),
            ),
          )
            .then(() => refetch())
            .catch(handleFail)
        } else {
          Promise.all(
            quoteIds.map((quoteId) =>
              setStartDate({
                variables: {
                  quoteId,
                  date: format(newDateValue, gqlDateFormat),
                },
              }),
            ),
          )
            .then(() => refetch())
            .catch(handleFail)
        }
      }}
      hasCurrentInsurer={hasCurrentInsurer(offerData)}
      modal={modal}
    />
  )

  if (isBundle(offerData)) {
    return (
      <>
        {textKeys.OFFER_START_DATE_LABEL()} {textKeys.OFFER_START_NOW()}
      </>
    )
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
          stiffness: 400,
          damping: 100,
        }}
      >
        {textKeys.SIDEBAR_UPDATE_START_DATE_FAILED()}
      </ErrorMessage>
      <RowButton
        datePickerOpen={datePickerOpen}
        onClick={() => setDatePickerOpen(!datePickerOpen)}
      >
        <Label>
          <Title>{textKeys.SIDEBAR_STARTDATE_CELL_LABEL()}</Title>
          <SubTitle>{textKeys.SIDEBAR_STARTDATE_CELL_SUBLABEL()}</SubTitle>
        </Label>
        <Value>
          <DateLabel>{getDateLabel()}</DateLabel>
          <CalendarIcon
            color={dateValue ? colorsV3.gray700 : colorsV3.gray500}
          />
        </Value>
      </RowButton>
      {modal ? (
        <DateInputModalWrapper isOpen={datePickerOpen}>
          {getDateInput()}
        </DateInputModalWrapper>
      ) : (
        getDateInput()
      )}
      {offerData.quotes.map((quote) => {
        return (
          quote.currentInsurer?.switchable && (
            <HandleSwitchingWrapper key={quote.id}>
              <HandleSwitchingLabel>
                {textKeys.SIDEBAR_REQUEST_CANCELLATION()}
              </HandleSwitchingLabel>
              <Switch
                value={dateValue == null}
                onChange={(newValue) => {
                  setShowError(false)
                  if (newValue === null) {
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
                        date: format(new Date(), gqlDateFormat),
                      },
                    })
                      .then(() => refetch())
                      .catch(handleFail)
                  }

                  setDateValue(newValue ? null : new Date())
                }}
              />
            </HandleSwitchingWrapper>
          )
        )
      })}
    </>
  )
}
