import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import * as React from 'react'

interface Props {
  transparent?: boolean
}

const Wrapper = styled.div<{ transparent?: boolean }>`
  width: 100%;
  height: 5rem;
  background: ${(props) =>
    props.transparent ? `transparent` : colorsV2.white};

  position: relative;
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
`

const LogoWrapper = styled.div``

export const TopBar: React.FC<Props> = ({ transparent }) => (
  <Wrapper transparent={transparent}>
    <Container>
      <LogoWrapper>
        <HedvigLogo fill={transparent ? colorsV2.white : colorsV2.black} />
      </LogoWrapper>
    </Container>
  </Wrapper>
)
