import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { WarningTriangleOutlined } from './icons/WarningTriangle'
import { Modal, ModalProps } from './ModalNew'
import { Button } from './buttons'

type Props = ModalProps & {
  children: React.ReactNode
}

const ErrorModalContainer = styled.div`
  padding: 2rem 1rem 1rem 3rem;

  position: relative;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    padding: 3rem;
    padding-left: 5rem;
  }
`

const WarningTriangleWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 2.25rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    left: 2.5rem;
    top: 3.25rem;
  }
`

export const ErrorHeading = styled.h2`
  color: ${colorsV3.gray900};
  margin: 0;
  margin-bottom: 0.5rem;
  line-height: 2rem;
  font-size: 1.25rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
  }
`

export const ErrorText = styled.div`
  color: ${colorsV3.gray700};
  margin: 0;
  line-height: 1.5rem;
  font-size: 0.875rem;
  // Prevent setting unintended margin on markdown children
  p {
    margin: 0;
    display: inline;
  }

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
  }
`

const ErrorModalWrapper = styled(Modal)`
  && {
    overflow-x: auto;
    max-width: min(36rem, 100% - 2rem);
    min-height: auto;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 1rem;
  gap: 0.875rem;
`

export const ButtonOutlined = styled(Button)`
  border: 1px solid ${colorsV3.gray900};
  background: ${colorsV3.white};
  color: ${colorsV3.gray900};
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;

  &:hover,
  &:focus {
    color: ${colorsV3.gray900};
  }

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
    padding: 0.75rem 2rem;
  }
`

export const ButtonFilled = styled(Button)`
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
    padding: 0.75rem 2rem;
  }
`

export const ErrorModal = ({ isVisible, onClose, children }: Props) => (
  <ErrorModalWrapper isVisible={isVisible} onClose={onClose} dynamicHeight>
    <ErrorModalContainer>
      <WarningTriangleWrapper>
        <WarningTriangleOutlined />
      </WarningTriangleWrapper>
      {children}
    </ErrorModalContainer>
  </ErrorModalWrapper>
)
