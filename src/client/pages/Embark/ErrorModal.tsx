import React from 'react'
import { useHistory } from 'react-router'
import ReactMarkdown from 'react-markdown/with-html'
import { ModalProps } from 'components/ModalNew'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import {
  ErrorModal,
  ErrorHeading,
  ErrorText,
  ButtonContainer,
  ButtonFilled,
  ButtonOutlined,
} from 'components/ErrorModal'

type SetupFailedModalProps = Omit<ModalProps, 'onClose'> & {
  onRetry: () => void
}

export const SetupFailedModal = ({
  onRetry,
  ...props
}: SetupFailedModalProps) => {
  const textKeys = useTextKeys()
  const { path: localePath } = useCurrentLocale()
  const history = useHistory()
  const goToLandingPage = () => history.replace(`/${localePath}/new-member`)

  return (
    <ErrorModal {...props} dynamicHeight={true} onClose={goToLandingPage}>
      <ErrorHeading>{textKeys.GENERIC_ERROR_HEADING()}</ErrorHeading>
      <ErrorText>
        <ReactMarkdown source={textKeys.GENERIC_ERROR_TEXT()} />
      </ErrorText>
      <ButtonContainer>
        <ButtonFilled onClick={() => onRetry()}>
          {textKeys.GENERIC_ERROR_ACTION_RETRY()}
        </ButtonFilled>
        <ButtonOutlined onClick={goToLandingPage}>
          {textKeys.GENERIC_ERROR_ACTION()}
        </ButtonOutlined>
      </ButtonContainer>
    </ErrorModal>
  )
}
