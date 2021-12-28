import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Modal } from 'components/ModalNew'
import { WarningTriangle } from 'components/icons/WarningTriangle'

interface Props {
  onClose: () => void
  isVisible: boolean
  headerText: string
  contentText: string
}

const Container = styled.div`
  padding: 3rem;
  padding-left: 5rem;
  max-width: 36rem;
  position: relative;

  svg {
    position: absolute;
    left: 3rem;
  }
`

const Header = styled.h2`
  color: ${colorsV3.gray900};
  margin: 0;
  margin-bottom: 0.5rem;
  line-height: 1.5rem;
`
const Content = styled.p`
  color: ${colorsV3.gray700};
  margin: 0;
  line-height: 1.25rem;
`

const CustomModal = styled(Modal)`
  overflow-x: auto;
  max-width: 36rem;
`

export const SignFailModal = ({
  isVisible,
  onClose,
  headerText,
  contentText,
}: Props) => {
  return (
    <CustomModal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <Container>
        <WarningTriangle />
        <Header>{headerText}</Header>
        <Content>{contentText}</Content>
      </Container>
    </CustomModal>
  )
}
