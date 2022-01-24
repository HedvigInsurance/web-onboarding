import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useTextKeys } from 'utils/textKeys'
import { ErrorModal, ErrorHeading, ErrorText } from 'components/ErrorModal'

interface Props {
  onClose: () => void
  isVisible: boolean
}

export const SignFailModal = ({ isVisible, onClose }: Props) => {
  const textKeys = useTextKeys()

  return (
    <ErrorModal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <ErrorHeading>{textKeys.SIGN_FAIL_ERROR_HEADING()}</ErrorHeading>
      <ErrorText>
        <ReactMarkdown source={textKeys.CHECKOUT_SIGN_FAIL_ERROR_TEXT()} />
      </ErrorText>
    </ErrorModal>
  )
}
