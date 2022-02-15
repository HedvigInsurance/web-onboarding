import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { WarningTriangleOutlined } from './icons/WarningTriangle'
import { Modal, ModalProps } from './ModalNew'
import { StyledCloseButton } from './CloseButton/CloseButton'

type Props = ModalProps & {
  children: React.ReactNode
}

const ErrorModalContainer = styled.div`
  padding: 3rem;
  padding-left: 5rem;
  position: relative;

  @media (max-width: 500px) {
    padding: 2rem 1rem 1rem 3rem;
  }
`

const WarningTriangleWrapper = styled.div`
  position: absolute;
  left: 2.5rem;
  top: 3.25rem;

  svg {
    fill: ;
  }

  @media (max-width: 500px) {
    left: 1rem;
    top: 2.25rem;
  }
`

export const ErrorHeading = styled.h2`
  color: ${colorsV3.gray900};
  margin: 0;
  margin-bottom: 0.5rem;
  line-height: 2rem;

  @media (max-width: 500px) {
    font-size: 1.25rem;
  }
`

export const ErrorText = styled.div`
  color: ${colorsV3.gray700};
  margin: 0;
  line-height: 1.5rem;
  // Prevent setting unintended margin on markdown children
  p {
    margin: 0;
  }

  @media (max-width: 500px) {
    font-size: 0.875rem;
  }
`

const StyledErrorModal = styled(Modal)`
  && {
    overflow-x: auto;
    max-width: min(36rem, 100% - 2rem);
    min-height: auto;
  }

  @media (max-width: 500px) {
    ${StyledCloseButton} {
      width: 1rem;
      height: 1rem;
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
