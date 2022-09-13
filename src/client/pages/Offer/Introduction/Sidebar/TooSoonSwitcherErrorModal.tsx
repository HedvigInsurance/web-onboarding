import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  ButtonContainer,
  ButtonOutlined,
  ErrorHeading,
  ErrorModal,
  ErrorText,
} from 'components/ErrorModal'
import { useTextKeys } from 'utils/textKeys'

type TooSoonSwitcherErrorModalProps = {
  isVisible: boolean
  onClose: () => void
}

export const TooSoonSwitcherErrorModal = ({
  isVisible,
  onClose,
}: TooSoonSwitcherErrorModalProps) => {
  const textKeys = useTextKeys()
  return (
    <ErrorModal isVisible={isVisible} onClose={onClose}>
      <ErrorHeading>{textKeys.CAR_SWITCHER_TOO_SOON_HEADING()}</ErrorHeading>
      <ErrorText>
        <ReactMarkdown source={textKeys.CAR_SWITCHER_TOO_SOON_BODY()} />
      </ErrorText>
      <ButtonContainer>
        <ButtonOutlined onClick={onClose}>
          {textKeys.CAR_SWITCHER_TOO_SOON_CONFIRM()}
        </ButtonOutlined>
      </ButtonContainer>
    </ErrorModal>
  )
}
