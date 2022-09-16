import React from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import ReactMarkdown from 'react-markdown/with-html'
import {
  ErrorModal,
  ErrorHeading,
  ErrorText,
  ButtonContainer,
  ButtonFilled,
  ButtonOutlined,
} from 'components/ErrorModal'
import { TextButton } from 'components/buttons'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { ModalProps } from 'components/ModalNew'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { openIntercomChat } from 'utils/intercom.helpers'

const InlineTextButton = styled(TextButton)`
  display: inline;
  font-size: inherit;
`

type SetupFailedModalProps = Omit<ModalProps, 'onClose'> & {
  onRetry: () => void
  isManualReviewRequired: boolean
}

export const onRetry = () => {
  window.location.reload()
  return false
}

export const CheckoutErrorModal = ({
  onRetry,
  isManualReviewRequired,
  ...props
}: SetupFailedModalProps) => {
  const textKeys = useTextKeys()
  const { path: localePath } = useCurrentLocale()
  const history = useHistory()
  const { quoteCartId } = useQuoteCartIdFromUrl()

  const goToOfferPage = () =>
    history.replace(`/${localePath}/new-member/offer/${quoteCartId}`)

  return (
    <ErrorModal {...props}>
      <ErrorHeading>{textKeys.GENERIC_ERROR_HEADING()}</ErrorHeading>
      <ErrorText>
        {isManualReviewRequired ? (
          <ReactMarkdown source={textKeys.CHECKOUT_SIGN_FAIL_MANUAL_REVIEW()} />
        ) : (
          <>
            {textKeys.CHECKOUT_ERROR_TEXT_PART_1()}{' '}
            <InlineTextButton onClick={openIntercomChat}>
              {textKeys.CHECKOUT_ERROR_TEXT_PART_2()}
            </InlineTextButton>{' '}
            <ReactMarkdown source={textKeys.CHECKOUT_ERROR_TEXT_PART_3()} />
          </>
        )}
      </ErrorText>

      <ButtonContainer>
        <ButtonFilled onClick={() => onRetry()}>
          {textKeys.GENERIC_ERROR_ACTION_RETRY()}
        </ButtonFilled>
        <ButtonOutlined onClick={goToOfferPage}>
          {textKeys.GENERIC_ERROR_ACTION()}
        </ButtonOutlined>
      </ButtonContainer>
    </ErrorModal>
  )
}

export const ThreeDSErrorModal = ({ onClose, ...props }: ModalProps) => {
  const textKeys = useTextKeys()

  return (
    <ErrorModal {...props}>
      <ErrorHeading>{textKeys['3D_SECURE_ERROR_HEADING']()}</ErrorHeading>
      <ErrorText>{textKeys['3D_SECURE_ERROR_DESCRIPTION']()}</ErrorText>

      <ButtonContainer>
        <ButtonFilled onClick={onClose}>
          {textKeys['3D_SECURE_ERROR_BUTTON']()}
        </ButtonFilled>
      </ButtonContainer>
    </ErrorModal>
  )
}
