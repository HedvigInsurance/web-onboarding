import React from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import ReactMarkdown from 'react-markdown/with-html'
import { ModalProps } from 'components/ModalNew'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { Button } from 'components/buttons'
import { useTextKeys } from 'utils/textKeys'
import { ErrorModal, ErrorHeading, ErrorText } from 'components/ErrorModal'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 1rem;
`

const HorizontalSpacer = styled.div`
  width: 1rem;
`

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
        <Button onClick={() => onRetry()}>
          {textKeys.GENERIC_ERROR_ACTION_RETRY()}
        </Button>
        <HorizontalSpacer />
        <Button onClick={goToLandingPage}>
          {textKeys.GENERIC_ERROR_ACTION()}
        </Button>
      </ButtonContainer>
    </ErrorModal>
  )
}
