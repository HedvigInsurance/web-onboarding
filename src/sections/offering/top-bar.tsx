import * as React from 'react'
import styled from 'react-emotion'
import { colors } from '@hedviginsurance/brand'

const Container = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

const Bar = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '20px',
  marginRight: '20px',
  backgroundColor: colors.WHITE,
  justifyContent: 'space-between',
  borderBottom: '1px solid ' + colors.LIGHT_GRAY
})

const Logo = styled('img')({
  height: '26px',
  marginTop: '25px',
  marginBottom: '25px',
  marginLeft: '40px',
})

const Refresh = styled('img')({
  height: '40px',
  marginRight: '40px',
})

export const TopBar = () => (
  <Container>
    <Bar>
      <Logo src="/assets/offering/logo.png" />
      <Refresh src="/assets/offering/restart.png"/>
    </Bar>
  </Container>
)
