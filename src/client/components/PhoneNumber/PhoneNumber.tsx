import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { format as formatDate, getDay } from 'date-fns'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { CallCenterData } from 'l10n/callCenters'
import { Telephone } from '../icons/Telephone'

const { black, white, gray700, gray500 } = colorsV3

type Color = 'black' | 'white'

const Wrapper = styled.div<{ color: Color }>`
  color: ${({ color }) => (color === 'black' ? black : white)};
`

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  && {
    margin-right: 0.4rem;
  }
`

const PhoneLink = styled.a<{ color: Color }>`
  text-decoration: none;
  color: inherit;
  font-size: 0.875rem;

  &:hover,
  &:focus {
    color: ${({ color }) => (color === 'black' ? gray700 : gray500)};
  }
`

const Text = styled.p<{ color: Color }>`
  color: ${({ color }) => (color === 'black' ? gray700 : gray500)};
  font-size: 0.75rem;
  text-align: right;

  && {
    margin-top: 0.2rem;
  }
`

const isLunchHour = (currentTime: string, data: CallCenterData): boolean =>
  currentTime >= data.lunchStartsAt && currentTime < data.lunchEndsAt

const isWeekend = (): boolean => {
  const currentDay = getDay(new Date())
  return currentDay === 6 || currentDay === 0
}
const phoneIsOpen = (currentTime: string, data: CallCenterData): boolean =>
  !isLunchHour(currentTime, data) &&
  !isWeekend() &&
  currentTime >= data.opensAt &&
  currentTime < data.closesAt

const getStatus = (currentTime: string, phoneNumber: CallCenterData) =>
  phoneIsOpen(currentTime, phoneNumber) ? 'opened' : 'closed'

const PhoneOpeningHours: React.FC<{
  phoneNumber: CallCenterData
  color: Color
}> = ({ phoneNumber, color }) => {
  const textKeys = useTextKeys()
  const currentTime = formatDate(new Date(), 'HH')
  const currentDay = getDay(new Date())

  const isFridayAfterHours =
    currentDay === 5 && currentTime >= phoneNumber.closesAt

  if (isFridayAfterHours || isWeekend()) {
    return (
      <Text color={color}>
        {textKeys.PHONE_OPENS_MONDAY_AT()} {phoneNumber.opensAt}
      </Text>
    )
  }

  if (isLunchHour(currentTime, phoneNumber)) {
    return (
      <Text color={color}>
        {textKeys.PHONE_OPENS_AT()} {phoneNumber.lunchEndsAt}
      </Text>
    )
  }

  if (phoneIsOpen(currentTime, phoneNumber)) {
    return (
      <Text color={color}>
        {textKeys.PHONE_OPEN_TODAY()} {phoneNumber.opensAt}-
        {phoneNumber?.closesAt}
      </Text>
    )
  }

  return (
    <Text color={color}>
      {textKeys.PHONE_CLOSED_UNTIL()} {phoneNumber.opensAt}
    </Text>
  )
}

export const PhoneNumber: React.FC<{
  color: Color
  onClick: (status: 'opened' | 'closed') => void
}> = ({ color, onClick }) => {
  const currentLocale = useCurrentLocale()
  const currentTime = formatDate(new Date(), 'HH')
  const { callCenter: phoneNumber } = currentLocale

  if (!phoneNumber) return null

  return (
    <Wrapper color={color}>
      <InnerWrapper>
        <IconWrapper>
          <Telephone size="1rem" />
        </IconWrapper>
        <PhoneLink
          color={color}
          href={phoneNumber.hrefNumber}
          onClick={() => onClick(getStatus(currentTime, phoneNumber))}
        >
          {phoneNumber.displayNumber}
        </PhoneLink>
      </InnerWrapper>
      <PhoneOpeningHours phoneNumber={phoneNumber} color={color} />
    </Wrapper>
  )
}
