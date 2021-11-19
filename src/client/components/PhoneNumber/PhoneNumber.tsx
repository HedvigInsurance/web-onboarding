import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { format as formatDate } from 'date-fns'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
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

export const PhoneNumber: React.FC<Props> = ({ color }) => {
  const textKeys = useTextKeys()
  const currentLocale = useCurrentLocale()
  const { phoneNumber } = currentLocale

  const currentTime = formatDate(new Date(), 'HH')

  const isPhoneOpen = (): boolean => {
    if (!phoneNumber) {
      return false
    }

    const { opensAt, closesAt } = phoneNumber
    return currentTime >= opensAt && currentTime >= closesAt
  }

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
      {isPhoneOpen() ? (
        <Text color={color}>
          {textKeys.PHONE_OPEN_TODAY()} {phoneNumber?.opensAt}-
          {phoneNumber?.closesAt}
        </Text>
      ) : (
        <Text color={color}>
          {textKeys.PHONE_CLOSED_UNTIL()} {phoneNumber?.opensAt}
        </Text>
      )}
    </Wrapper>
  )
}
