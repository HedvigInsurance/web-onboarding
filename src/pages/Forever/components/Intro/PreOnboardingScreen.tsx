import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist/colors'
import { LinkButton } from 'components/buttons'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { fadeIn, TextContent } from './components'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 1.5rem;
  bottom: 2.5rem;
  left: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 800px) {
    justify-content: center;
  }
`

const AnimatingTextContent = styled(TextContent)`
  opacity: 0;
  animation: ${fadeIn} 2000ms forwards;

  @media (min-width: 800px) {
    flex: 0;
  }
`

export const slideIn = keyframes`
  from {
    transform: translateY(50%);
  }
  to {
    transform: translateY(0);
  }
`

const ButtonWrapper = styled.div`
  opacity: 0;
  animation: ${slideIn} 1200ms forwards, ${fadeIn} 1000ms forwards;
  animation-delay: 1000ms;
  flex: 0;
  width: 100%;

  @media (min-width: 800px) {
    max-width: 22rem;
    margin: 1rem auto 0;
  }
`
export const PreOnboardingScreenComponent: React.FC<RouteComponentProps<{
  locale: string
}>> = ({ match }) => {
  return (
    <Wrapper>
      <div />
      <AnimatingTextContent>Redo?</AnimatingTextContent>
      <ButtonWrapper>
        <LinkButton
          to={`/${match.params.locale}/new-member`}
          foreground={colorsV3.gray900}
          background={colorsV3.purple500}
          size="lg"
          fullWidth
        >
          Ja, ge mig ett prisförslag
        </LinkButton>
      </ButtonWrapper>
    </Wrapper>
  )
}

export const PreOnboardingScreen = withRouter(PreOnboardingScreenComponent)
