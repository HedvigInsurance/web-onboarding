import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { HedvigSymbol } from 'components/icons/HedvigSymbol'
import * as React from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import {
  Column,
  ColumnSpacing,
  Container,
  Heading,
  PreHeading,
} from './components'

const OuterWrapper = styled.div`
  background-color: ${colorsV2.offwhite};
  padding: 5rem 0;
`

const BodyText = styled.p`
  margin: 2rem 0;
`

const NotificationArea = styled.div`
  background-color: ${colorsV2.flamingo300};
  padding: 8rem 4rem;
  border-radius: 4px;
`

interface Showable {
  visible?: boolean
}

const NotificationBody = styled.div`
  padding-left: 1.5rem;
`
const NotificationHeading = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  opacity: 0.5;
`
const NotificationBodyText = styled.div`
  font-size: 1.25rem;
  opacity: 0.5;
`
const NotificationTimestamp = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 0.5rem;
  font-weight: 200;
  opacity: 0;
`

const fadeIn = (opacityStart: number = 0, opacityEnd: number = 1) => keyframes`
  from {
    opacity: ${opacityStart};
  }
  to {
    opacity: ${opacityEnd};
  }
`

const fadeSlideIn = (
  opacityStart: number = 0,
  opacityEnd: number = 1,
) => keyframes`
  from {
    opacity: ${opacityStart};
    transform: translateY(50%) scale(.95);
  }
  to {
    opacity: ${opacityEnd};
    transform: translateY(0) scale(1);
  }
`
const Notification = styled.div<Showable>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  opacity: 0;
  ${({ visible }) =>
    visible
      ? css`
          animation: ${fadeSlideIn()} 700ms forwards;

          ${NotificationTimestamp} {
            animation: ${fadeIn(0, 0.5)} 500ms forwards;
            animation-delay: 1200ms;
          }

          ${NotificationHeading} {
            animation: ${fadeIn(0.5, 1)} 300ms forwards;
            animation-delay: 750ms;
          }

          ${NotificationBodyText} {
            animation: ${fadeIn(0.5, 1)} 300ms forwards;
            animation-delay: 800ms;
          }
        `
      : ''};
  animation-delay: 500ms;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 1.5rem;
`
const zoomIn = keyframes`
  from {
    opacity: 0.5;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`
const NotificationIcon = styled.div<Showable>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 4.5rem;
  height: 4.5rem;
  background: #fff;
  border-radius: 18px;

  opacity: 0.5;
  transform: scale(0.9);
  ${({ visible }) =>
    visible
      ? css`
          animation: ${zoomIn} 400ms forwards;
        `
      : ''};
  animation-delay: 1000ms;
`
const StyledHedvigSymbol = styled(HedvigSymbol)`
  width: 30px;
  height: 38px;
`

export const SwitchSafetySection: React.FC = () => (
  <OuterWrapper>
    <Container>
      <Column>
        <PreHeading>Byt till Hedvig</PreHeading>
        <Heading>Enkelt och tryggt att flytta hit din hemförsäkring</Heading>

        <BodyText>
          Det tar bara någon minut med BankID och din nya hemförsäkring hos
          Hedvig börjar såklart gälla automatiskt samma dag som din gamla löper
          ut.
        </BodyText>

        <ReactVisibilitySensor
          onChange={() => {
            /* noop */
          }}
          offset={{ bottom: 150 }}
          partialVisibility
        >
          {({ isVisible }) => (
            <NotificationArea>
              <Notification visible={isVisible}>
                <NotificationIcon visible={isVisible}>
                  <StyledHedvigSymbol />
                </NotificationIcon>
                <NotificationTimestamp>Just nu</NotificationTimestamp>
                <NotificationBody>
                  <NotificationHeading>Hedvig</NotificationHeading>
                  <NotificationBodyText>
                    Din hemförsäkring hos Hedvig är nu aktiv. Välkommen!
                  </NotificationBodyText>
                </NotificationBody>
              </Notification>
            </NotificationArea>
          )}
        </ReactVisibilitySensor>
      </Column>
      <ColumnSpacing />
    </Container>
  </OuterWrapper>
)
