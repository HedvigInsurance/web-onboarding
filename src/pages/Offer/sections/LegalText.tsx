import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'

interface Props {
  legalText: string
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: colors.OFF_WHITE,
  paddingBottom: '70px',
})

const LegalText = styled('div')({
  color: colors.DARK_GRAY,
  fontSize: '14px',
  textAlign: 'center',
  maxWidth: '400px',
})

export const Legal: React.SFC<Props> = (props) => (
  <Container>
    <LegalText>{props.legalText}</LegalText>
  </Container>
)
