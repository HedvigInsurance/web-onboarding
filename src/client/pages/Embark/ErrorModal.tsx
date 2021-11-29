import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useHistory } from 'react-router'
import { Modal, ModalProps } from 'components/ModalNew'
import { WarningTriangle } from 'components/icons/WarningTriangle'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { Button } from 'components/buttons'
import { useTextKeys } from 'utils/textKeys'

type Props = ModalProps & {
  children: React.ReactNode
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

export const ErrorHeading = styled.h2`
  color: ${colorsV3.gray900};
  margin: 0;
  margin-bottom: 0.5rem;
  line-height: 1.5rem;
`

export const ErrorText = styled.p`
  color: ${colorsV3.gray700};
  margin: 0;
  line-height: 1.25rem;
  margin-bottom: 1rem;
`

export const ErrorModal = ({ isVisible, onClose, children }: Props) => (
  <Modal isVisible={isVisible} onClose={onClose} dynamicHeight>
    <Container>
      <WarningTriangle />
      {children}
    </Container>
  </Modal>
)

type SetupFailedModalProps = Omit<ModalProps, 'onClose'>

export const SetupFailedModal = (props: SetupFailedModalProps) => {
  const textKeys = useTextKeys()
  const { path: localePath } = useCurrentLocale()
  const history = useHistory()
  const goToLandingPage = () => history.replace(`/${localePath}/new-member`)

  return (
    <ErrorModal {...props} dynamicHeight={true} onClose={goToLandingPage}>
      <ErrorHeading>{textKeys.GENERIC_ERROR_HEADING()}</ErrorHeading>
      <ErrorText>{textKeys.GENERIC_ERROR_TEXT()}</ErrorText>
      <Button onClick={goToLandingPage}>
        {textKeys.GENERIC_ERROR_ACTION()}
      </Button>
    </ErrorModal>
  )
}
