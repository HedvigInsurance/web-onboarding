import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Telephone } from '../icons/Telephone'

type Props = {
  color?: 'black' | 'white'
}

const Wrapper = styled.div<Props>`
  color: ${(props) =>
    props.color === 'black' ? colorsV3.black : colorsV3.white};
`

const PhoneLink = styled.a`
  text-decoration: none;
  color: inherit;
`

const Text = styled.p<Props>`
  color: ${(props) =>
    props.color === 'black' ? colorsV3.gray800 : colorsV3.gray600};
  font-size: 0.8rem;
`

export const PhoneNumber: React.FC<Props> = ({ color }: Props) => {
  return (
    <Wrapper color={color}>
      <Telephone />
      <PhoneLink href="081230000">08 123 00 00</PhoneLink>
      <Text>Open today 09-20</Text>
    </Wrapper>
  )
}
