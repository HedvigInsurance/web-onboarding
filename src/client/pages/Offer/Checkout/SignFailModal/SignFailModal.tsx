import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useTextKeys } from 'utils/textKeys'
import { ErrorModal, ErrorHeading, ErrorText } from 'components/ErrorModal'

type Props = {
  isVisible: boolean
  onClose: () => void
  isManualReviewRequired?: boolean
}

export const SignFailModal = ({
  isVisible,
  onClose,
  isManualReviewRequired,
}: Props) => {
  const textKeys = useTextKeys()

  return (
    <ErrorModal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <ErrorHeading>{textKeys.SIGN_FAIL_ERROR_HEADING()}</ErrorHeading>
      <ErrorText>
        {isManualReviewRequired ? (
          <ReactMarkdown source={textKeys.CHECKOUT_SIGN_FAIL_MANUAL_REVIEW()} />
        ) : (
          <ReactMarkdown source={textKeys.CHECKOUT_SIGN_FAIL_ERROR_TEXT()} />
        )}
      </ErrorText>
    </ErrorModal>
  )
}
