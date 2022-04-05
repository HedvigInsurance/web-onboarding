import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useHistory } from 'react-router'
import ReactMarkdown from 'react-markdown/with-html'
import { ErrorModal, ErrorHeading, ErrorText } from 'components/ErrorModal'
import { Button, TextButton } from 'components/buttons'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { ModalProps } from 'components/ModalNew'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { openIntercomChat } from 'utils/intercom.helpers'

const { gray900, white } = colorsV3

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 1rem;
  gap: 0.875rem;
`

const ButtonOutlined = styled(Button)`
  border: 1px solid ${gray900};
  background: ${white};
  color: ${gray900};
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;

  &:hover,
  &:focus {
    color: ${gray900};
  }

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
    padding: 0.75rem 2rem;
  }
`

const ButtonFilled = styled(Button)`
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
    padding: 0.75rem 2rem;
  }
`
const InlineTextButton = styled(TextButton)`
  display: inline;
  font-size: 1rem;
`

type SetupFailedModalProps = Omit<ModalProps, 'onClose'> & {
  onRetry: () => void
}

export const CheckoutErrorModal = ({
  onRetry,
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
        {textKeys.CHECKOUT_ERROR_TEXT_PART_1()}{' '}
        <InlineTextButton onClick={openIntercomChat}>
          {textKeys.CHECKOUT_ERROR_TEXT_PART_2()}
        </InlineTextButton>{' '}
        <ReactMarkdown source={textKeys.CHECKOUT_ERROR_TEXT_PART_3()} />
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
