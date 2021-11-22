import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { format as formatDate, getDay } from 'date-fns'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { PhoneNumberData } from 'l10n/phoneNumbers'
import { Telephone } from '../icons/Telephone'

type Props = {
  color?: 'black' | 'white'
}

const Wrapper = styled.div<Props>`
  color: ${({ color }) =>
    color === 'black' ? colorsV3.black : colorsV3.white};
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

const PhoneLink = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 0.875rem;

  &:hover {
    color: ${({ color }) =>
      color === 'black' ? colorsV3.gray700 : colorsV3.gray500};
  }
`

const Text = styled.p<Props>`
  color: ${({ color }) =>
    color === 'black' ? colorsV3.gray700 : colorsV3.gray500};
  font-size: 0.75rem;
  && {
    margin: 0.2rem 0 0 1.4rem;
  }
`

const PhoneOpeningHours: React.VFC<{
  phoneNumber?: PhoneNumberData
  color: Props['color']
}> = ({ phoneNumber, color }) => {
  const textKeys = useTextKeys()
  const currentTime = formatDate(new Date(), 'HH')
  const currentDay = getDay(new Date())

  if (!phoneNumber) {
    return null
  }

  const { opensAt, closesAt, lunchStartsAt, lunchEndsAt } = phoneNumber
  const isPhoneOpen = currentTime >= opensAt && currentTime < closesAt
  const isLunchHour = currentTime >= lunchStartsAt && currentTime < lunchEndsAt
  const isFridayAfterHours = currentDay === 5 && currentTime >= closesAt
  const isWeekend = currentDay === 6 || currentDay === 0

  if (isFridayAfterHours || isWeekend) {
    return <Text>weekend text</Text>
  }

  if (isLunchHour) {
    return (
      <Text color={color}>
        {textKeys.PHONE_OPENS_AT()} {phoneNumber?.lunchEndsAt}
      </Text>
    )
  }

  if (isPhoneOpen) {
    return (
      <Text color={color}>
        {textKeys.PHONE_OPEN_TODAY()} {phoneNumber?.opensAt}-
        {phoneNumber?.closesAt}
      </Text>
    )
  } else {
    return (
      <Text color={color}>
        {textKeys.PHONE_CLOSED_UNTIL()} {phoneNumber?.opensAt}
      </Text>
    )
  }
}

export const PhoneNumber: React.FC<Props> = ({ color }) => {
  const currentLocale = useCurrentLocale()
  const { phoneNumber } = currentLocale

  return (
    <Wrapper color={color}>
      <InnerWrapper>
        <IconWrapper>
          <Telephone size="1rem" />
        </IconWrapper>
        <PhoneLink href={phoneNumber?.hrefNumber}>
          {phoneNumber?.displayNumber}
        </PhoneLink>
      </InnerWrapper>
      <PhoneOpeningHours phoneNumber={phoneNumber} color={color} />
    </Wrapper>
  )
}
