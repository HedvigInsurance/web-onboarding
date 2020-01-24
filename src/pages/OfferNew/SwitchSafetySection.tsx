import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { HedvigSymbol } from 'components/icons/HedvigSymbol'
import * as React from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import {
  Column,
  ColumnSpacing,
  Container,
  Heading,
  PreHeading,
} from './components'

const OuterWrapper = styled.div`
  padding: 3rem 0 5rem 0;
  background-color: ${colorsV2.offwhite};

  @media (min-width: 376px) {
    padding: 5rem 0 10rem 0;
  }
`

const BodyText = styled.p`
  margin: 2rem 0;
`

const NotificationArea = styled.div`
  background-color: ${colorsV2.flamingo300};
  padding: 3rem 1.5rem;
  border-radius: 4px;

  @media (min-width: 376px) {
    padding: 8rem 4rem;
  }
`

interface Showable {
  visible?: boolean
}

const NotificationBody = styled.div`
  @media (min-width: 376px) {
    padding-left: 1.5rem;
  }
`
const NotificationHeading = styled.div`
  font-weight: 600;
  opacity: 0.5;
  padding-bottom: 0.5rem;

  @media (min-width: 376px) {
    font-size: 1.25rem;
    padding-bottom: 0;
  }
`
const NotificationBodyText = styled.div`
  opacity: 0.5;

  @media (min-width: 376px) {
    font-size: 1.25rem;
  }
`
const NotificationTimestamp = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 0.5rem;
  font-weight: 200;
  font-size: 0.75rem;
  opacity: 0;

  @media (min-width: 376px) {
    font-size: 1rem;
  }
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
  opacity: 0;
  padding: 1rem;

  @media (min-width: 376px) {
    padding: 1.5rem;
  }

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
const DesktopNotificationIcon = styled.div<Showable>`
  display: none;
  @media (min-width: 376px) {
    display: flex;
  }
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
const MobileNotificationIcon = styled(DesktopNotificationIcon)`
  display: inline-flex;
  width: 1.75rem;
  height: 1.75rem;
  vertical-align: center;
  border-radius: 5px;
  margin-right: 0.5rem;

  @media (min-width: 376px) {
    display: none;
  }
`
const StyledHedvigSymbol = styled(HedvigSymbol)`
  width: 15px;
  height: 19px;

  @media (min-width: 376px) {
    width: 30px;
    height: 38px;
  }
`

export const SwitchSafetySection: React.FC = () => {
  const textKeys = useTextKeys()
  return (
    <OuterWrapper>
      <Container>
        <Column>
          <PreHeading>
            {textKeys.OFFER_SWITCHER_SAFETY_PRE_HEADING()}
          </PreHeading>
          <Heading>{textKeys.OFFER_SWITCHER_SAFETY_HEADING()}</Heading>

          <BodyText>{textKeys.OFFER_SWITCHER_SAFETY_PARAGRAPH()}</BodyText>

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
                  <DesktopNotificationIcon visible={isVisible}>
                    <StyledHedvigSymbol />
                  </DesktopNotificationIcon>
                  <NotificationTimestamp>
                    {textKeys.OFFER_SWITCHER_SAFETY_NOTIFICATION_TIMESTAMP()}
                  </NotificationTimestamp>
                  <NotificationBody>
                    <NotificationHeading>
                      <MobileNotificationIcon visible={isVisible}>
                        <StyledHedvigSymbol />
                      </MobileNotificationIcon>
                      Hedvig
                    </NotificationHeading>
                    <NotificationBodyText>
                      {textKeys.OFFER_SWITCHER_SAFETY_NOTIFICATION_BODY()}
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
}
