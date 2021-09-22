import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Modal } from 'components/ModalNew'
import { useTextKeys } from 'utils/textKeys'
import { WarningTriangle } from 'components/icons/WarningTriangle'

interface Props {
  onClose: () => void
  isVisible: boolean
}

const Container = styled.div`
  padding: 3rem;
  max-width: 36rem;
  position: relative;

  svg {
    position: absolute;
    left: 1.125rem;
  }
`

const Header = styled.h2`
  color: ${colorsV3.gray900};
  margin: 0;
  line-height: 24px;
`
const Content = styled.p`
  color: ${colorsV3.gray700};
  margin: 0;
  margin-top: 0.5rem;
  line-height: 20px;
`

export const SignFailModal = ({ isVisible, onClose }: Props) => {
  const textKeys = useTextKeys()

  return (
    <Modal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <Container>
        <WarningTriangle />
        <Header> {textKeys.CHECKOUT_SIGN_FAIL_HEADER()}</Header>
        <Content>{textKeys.CHECKOUT_SIGN_FAIL_CONTENT()}</Content>
      </Container>
    </Modal>
  )
}
