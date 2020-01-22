import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { externalInsuranceProviders } from '@hedviginsurance/embark'
import { format, isToday, parse } from 'date-fns'
import { motion } from 'framer-motion'
import {
  CurrentInsurer,
  useExternalInsuranceDataQuery,
  useRemoveStartDateMutation,
  useStartDateMutation,
} from 'generated/graphql'
import hexToRgba from 'hex-to-rgba'
import { DateInput } from 'new-components/DateInput'
import { Switch } from 'new-components/Switch'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { CalendarIcon } from './CalendarIcon'

interface Props {
  dataCollectionId?: string | null
  currentInsurer: CurrentInsurer | null
  startDate: string | null
  offerId: string
  refetch: () => Promise<void>
  modal?: boolean
}

const RowButton = styled.button<{ datePickerOpen: boolean }>`
  width: 100%;
  padding: 0.8rem 1.2rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${colorsV2.lightgray};
  outline: 0;
  background-color: ${colorsV2.white};
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  transition: background-color 250ms, border 250ms;

  :active {
    background-color: ${colorsV2.lightgray};
  }

  ${(props) =>
    props.datePickerOpen && `border: 1px solid ${colorsV2.violet500};`};
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
  font-weight: 600;
  color: ${colorsV2.darkgray};
`

const SubTitle = styled.div`
  font-size: 0.75rem;
  line-height: 0.75rem;
  font-weight: 500;
  color: ${colorsV2.gray};
`

const Value = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colorsV2.darkgray};
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
  font-weight: 500;
  color: ${colorsV2.gray};
  width: 50%;
`

const ErrorMessage = styled(motion.div)`
  background-color: ${colorsV2.flamingo500};
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 10px;
  color: ${colorsV2.black};
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
  color: ${colorsV2.gray};
`

const DataCollectedStartDateValue = styled.span`
  font-size: 1rem;
`

const DateInputModalWrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${hexToRgba(colorsV2.white, 0.8)};
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

export const StartDate: React.FC<Props> = ({
  offerId,
  startDate,
  currentInsurer,
  dataCollectionId,
  refetch,
  modal = false,
}) => {
  const { data: externalInsuranceData } = useExternalInsuranceDataQuery({
    variables: {
      reference: dataCollectionId || '',
    },
  })
  const getDefaultDateValue = () => {
    if (startDate) {
      return parse(startDate, 'yyyy-MM-dd', new Date())
    }

    if (currentInsurer) {
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
  }, [startDate])

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
              insuranceProvider: externalInsuranceProvider.name,
            })}
          </DataCollectedStartDateDescription>
        </DataCollectedStartDateWrapper>
      )
    }

    return textKeys.SIDEBAR_STARTDATE_CELL_VALUE_SWITCHER()
  }

  const gqlDateFormat = 'yyyy-MM-dd'

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
              quoteId: offerId,
            },
          }).catch(handleFail)
        } else {
          setStartDate({
            variables: {
              quoteId: offerId,
              date: format(newDateValue, gqlDateFormat),
            },
          })
            .then(() => refetch())
            .catch(handleFail)
        }
      }}
      hasCurrentInsurer={currentInsurer !== null}
    />
  )

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
            color={dateValue ? colorsV2.violet500 : colorsV2.gray}
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

      {currentInsurer?.switchable && (
        <HandleSwitchingWrapper>
          <HandleSwitchingLabel>
            {textKeys.SIDEBAR_REQUEST_CANCELLATION()}
          </HandleSwitchingLabel>
          <Switch
            value={dateValue == null}
            onChange={(newValue) => {
              setShowError(false)

              if (newValue) {
                removeStartDate({
                  variables: {
                    quoteId: offerId,
                  },
                }).catch(handleFail)
              } else {
                setStartDate({
                  variables: {
                    quoteId: offerId,
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
      )}
    </>
  )
}
