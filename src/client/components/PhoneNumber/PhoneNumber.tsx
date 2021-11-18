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
  color: ${(props) =>
    props.color === 'black' ? colorsV3.black : colorsV3.white};
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
    color: ${colorsV3.gray600};
  }
`

const Text = styled.p<Props>`
  color: ${(props) =>
    props.color === 'black' ? colorsV3.gray800 : colorsV3.gray500};
  font-size: 0.75rem;
  && {
    margin: 0.2rem 0 0 1.4rem;
  }
`

export const PhoneNumber: React.FC<Props> = ({ color }) => {
  const textKeys = useTextKeys()
  const currentLocale = useCurrentLocale()

  const currentTime = formatDate(new Date(), 'HH')

  const isPhoneOpen = (): boolean => {
    if (
      (currentLocale.phoneNumber &&
        currentTime < currentLocale.phoneNumber?.closesAt) ||
      (currentLocale.phoneNumber &&
        currentTime > currentLocale.phoneNumber?.opensAt)
    ) {
      return true
    } else return false
  }

  return (
    <Wrapper color={color}>
      <InnerWrapper>
        <IconWrapper>
          <Telephone size="1rem" />
        </IconWrapper>
        <PhoneLink href={currentLocale.phoneNumber?.hrefNumber}>
          {currentLocale.phoneNumber?.displayNumber}
        </PhoneLink>
      </InnerWrapper>
      {isPhoneOpen() ? (
        <Text color={color}>
          {textKeys.PHONE_OPEN_TODAY()} {currentLocale.phoneNumber?.opensAt}-
          {currentLocale.phoneNumber?.closesAt}
        </Text>
      ) : (
        <Text color={color}>
          {textKeys.PHONE_CLOSED_UNTIL()} {currentLocale.phoneNumber?.opensAt}
        </Text>
      )}
    </Wrapper>
  )
}
