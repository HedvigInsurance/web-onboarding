import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import * as React from 'react'

export const TOP_BAR_HEIGHT = 70

const Wrapper = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

const Bar = styled('div')({
  height: TOP_BAR_HEIGHT,
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: colors.WHITE,
  zIndex: 5,
  boxShadow: '0 1px 11px 1px rgba(0,0,0,.15)',
})

const LogoWrapper = styled('div')({
  height: '100%',
  width: '20%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: 4,
  paddingLeft: 20,
  '@media (max-width: 850px)': {
    width: '33%',
  },
  '@media (max-width: 600px)': {
    width: '55%',
  },
  '@media (max-width: 350px)': {
    paddingLeft: 10,
  },
})

const EscapeLink = styled('a')<{ disable?: boolean }>(
  ({ disable = false }) => ({
    display: 'flex',
    cursor: disable ? 'default' : 'cursor',
  }),
)

const Logo = styled('img')({})

const EmptyBar = styled(Bar)({
  justifyContent: 'space-between',
})

const ProceedComponentWrapper = styled('div')({
  marginRight: 20,
  '@media (max-width: 350px)': {
    marginRight: 10,
  },
})

interface EmptyTopBarProps {
  proceedComponent?: React.ReactNode
  partner?: string
}

export const EmptyTopBar: React.FC<EmptyTopBarProps> = ({
  proceedComponent = <div />,
  partner,
}) => (
  <Wrapper>
    <EmptyBar>
      <LogoWrapper>
        <EscapeLink
          href="/"
          onClick={(event) => partner === 'dreams' && event.preventDefault()}
          disable={partner === 'dreams'}
        >
          <Logo
            src={`/new-member-assets/topbar/hedvig-wordmark-${partner ||
              'solid'}.svg`}
          />
        </EscapeLink>
      </LogoWrapper>
      <div />
      <ProceedComponentWrapper>{proceedComponent}</ProceedComponentWrapper>
    </EmptyBar>
  </Wrapper>
)
