import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
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

const MEDIA_MIN_WIDTH = '@media (min-width: 550px)'

const OuterWrapper = styled.div`
  padding: 3rem 0 5rem 0;
  background-color: ${colorsV3.gray100};

  ${MEDIA_MIN_WIDTH} {
    padding: 5rem 0 10rem 0;
  }
`

const BodyText = styled.p`
  margin: 2rem 0;
  color: ${colorsV3.gray700};
`

const NotificationArea = styled.div`
  background-color: #c9abf5;
  padding: 3rem 1.5rem;
  border-radius: 8px;

  ${MEDIA_MIN_WIDTH} {
    padding: 8rem 4rem;
  }
`

interface Showable {
  visible?: boolean
}

const NotificationBody = styled.div`
  ${MEDIA_MIN_WIDTH} {
    padding-left: 1.5rem;
  }
`
const NotificationHeading = styled.div`
  font-weight: 600;
  opacity: 0.5;
  padding-bottom: 0.5rem;

  ${MEDIA_MIN_WIDTH} {
    font-size: 1.25rem;
    padding-bottom: 0;
  }
`
const NotificationBodyText = styled.div`
  opacity: 0.5;

  ${MEDIA_MIN_WIDTH} {
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

  ${MEDIA_MIN_WIDTH} {
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

  ${MEDIA_MIN_WIDTH} {
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
  border-radius: 8px;
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
  ${MEDIA_MIN_WIDTH} {
    display: flex;
  }
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 4.5rem;
  height: 4.5rem;
  background: ${colorsV3.gray900};
  color: ${colorsV3.white};
  border-radius: 8px;

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
  border-radius: 3px;
  margin-right: 0.5rem;
  background: ${colorsV3.gray900};
  color: ${colorsV3.white};

  ${MEDIA_MIN_WIDTH} {
    display: none;
  }
`
const StyledHedvigSymbol = styled(HedvigSymbol)`
  width: 15px;
  height: 19px;

  ${MEDIA_MIN_WIDTH} {
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
                    <StyledHedvigSymbol size="60%" />
                  </DesktopNotificationIcon>
                  <NotificationTimestamp>
                    {textKeys.OFFER_SWITCHER_SAFETY_NOTIFICATION_TIMESTAMP()}
                  </NotificationTimestamp>
                  <NotificationBody>
                    <NotificationHeading>
                      <MobileNotificationIcon visible={isVisible}>
                        <StyledHedvigSymbol size="60%" />
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
