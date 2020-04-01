import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import * as React from 'react'
import { CurrentLocale } from './utils/CurrentLocale'

export const TOP_BAR_Z_INDEX = 1009

interface Props {
  transparent?: boolean
}

const Wrapper = styled.div<Props>`
  width: 100%;
  top: 0;
  height: 5rem;
  background: ${(props) =>
    props.transparent ? `transparent` : colorsV2.white};
  position: absolute;
  z-index: ${TOP_BAR_Z_INDEX};
  ${(props) =>
    !props.transparent && `box-shadow: 0 2px 14px rgba(0, 0, 0, 0.08);`};

  @media (max-width: 375px) {
    height: 4rem;
  }
`

export const TopBarFiller = styled.div`
  height: 5rem;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 80rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 600px) {
    justify-content: center;
  }
`

const LogoLink = styled.a`
  color: inherit;
  display: flex;
`

export const TopBar: React.FC<Props> = ({ transparent }) => (
  <Wrapper transparent={transparent}>
    <Container>
      <CurrentLocale>
        {({ currentLocale }) => (
          <LogoLink href={'/' + currentLocale}>
            <HedvigLogo width={94} />
          </LogoLink>
        )}
      </CurrentLocale>
    </Container>
  </Wrapper>
)
