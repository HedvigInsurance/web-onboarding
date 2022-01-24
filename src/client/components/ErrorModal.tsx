import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { WarningTriangle } from './icons/WarningTriangle'
import { Modal, ModalProps } from './ModalNew'

type Props = ModalProps & {
  children: React.ReactNode
}

const Container = styled.div`
  padding: 3rem;
  padding-left: 5rem;
  position: relative;

  svg {
    position: absolute;
    left: 3rem;
  }
`

export const ErrorHeading = styled.h2`
  color: ${colorsV3.gray900};
  margin: 0;
  margin-bottom: 0.5rem;
  line-height: 1.5rem;
`

export const ErrorText = styled.div`
  color: ${colorsV3.gray700};
  margin: 0;
  line-height: 1.25rem;
  margin-bottom: 1rem;
`

const CustomModal = styled(Modal)`
  overflow-x: auto;
  max-width: 36rem;
`

export const ErrorModal = ({ isVisible, onClose, children }: Props) => (
  <CustomModal isVisible={isVisible} onClose={onClose} dynamicHeight>
    <Container>
      <WarningTriangle />
      {children}
    </Container>
  </CustomModal>
)
