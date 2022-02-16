import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { WarningTriangleOutlined } from './icons/WarningTriangle'
import { Modal, ModalProps } from './ModalNew'
import { StyledCloseButton } from './CloseButton/CloseButton'

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
  }

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
  }
`

const StyledErrorModal = styled(Modal)`
  && {
    overflow-x: auto;
    max-width: min(36rem, 100% - 2rem);
    min-height: auto;
  }
  ${StyledCloseButton} {
    width: 1rem;
    height: 1rem;
  }

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    ${StyledCloseButton} {
      width: 2rem;
      height: 2rem;
    }
  }
`

export const ErrorModal = ({ isVisible, onClose, children }: Props) => (
  <StyledErrorModal isVisible={isVisible} onClose={onClose} dynamicHeight>
    <ErrorModalContainer>
      <WarningTriangleWrapper>
        <WarningTriangleOutlined />
      </WarningTriangleWrapper>
      {children}
    </ErrorModalContainer>
  </StyledErrorModal>
)
