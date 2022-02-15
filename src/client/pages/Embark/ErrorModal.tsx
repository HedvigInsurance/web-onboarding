import React from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import ReactMarkdown from 'react-markdown/with-html'
import { colorsV3 } from '@hedviginsurance/brand'
import { ModalProps } from 'components/ModalNew'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { Button } from 'components/buttons'
import { useTextKeys } from 'utils/textKeys'
import { ErrorModal, ErrorHeading, ErrorText } from 'components/ErrorModal'

const { gray900, white } = colorsV3

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
`

const ButtonOutlined = styled(Button)`
  border: 1px solid ${gray900};
  background: ${white};
  color: ${gray900};
  margin-left: 0.875rem;

  &:hover,
  &:focus {
    color: ${gray900};
  }

  @media (max-width: 500px) {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  }
`

const ButtonFilled = styled(Button)`
  @media (max-width: 500px) {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  }
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
