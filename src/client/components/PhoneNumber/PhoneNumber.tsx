import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
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
  margin-right: 0.4rem;
  display: flex;
  align-items: center;
`

const PhoneLink = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 0.875rem;
`

const Text = styled.p<Props>`
  color: ${(props) =>
    props.color === 'black' ? colorsV3.gray800 : colorsV3.gray600};
  font-size: 0.75rem;
  margin: 0.2rem 0 0 1.4rem;
`

export const PhoneNumber: React.FC<Props> = ({ color }: Props) => {
  const textKeys = useTextKeys()
  const currentLocale = useCurrentLocale()

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
      <Text>{textKeys.PHONE_OPENING_HOURS()}</Text>
    </Wrapper>
  )
}
