import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import * as React from 'react'
import { CurrentLanguage } from '../components/utils/CurrentLanguage'

interface Props {
  transparent?: boolean
}

const Wrapper = styled.div<Props>`
  width: 100%;
  top: 0;
  height: 5rem;
  background: ${(props) =>
    props.transparent ? `transparent` : colorsV2.white};
  position: fixed;
  z-index: 1000;
  ${(props) =>
    !props.transparent && `box-shadow: 0 2px 14px rgba(0, 0, 0, 0.08);`}
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
  display: flex;
`

export const TopBar: React.FC<Props> = ({ transparent }) => (
  <Wrapper transparent={transparent}>
    <Container>
      <CurrentLanguage>
        {({ currentLanguage }) => (
          <LogoLink href={'/' + currentLanguage}>
            <HedvigLogo fill={transparent ? colorsV2.white : colorsV2.black} />
          </LogoLink>
        )}
      </CurrentLanguage>
    </Container>
  </Wrapper>
)
