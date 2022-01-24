import React from 'react'

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
      <ErrorHeading>{textKeys.CHECKOUT_SIGN_FAIL_HEADER()}</ErrorHeading>
      <ErrorText>{textKeys.CHECKOUT_SIGN_FAIL_ERROR_TEXT()}</ErrorText>
    </ErrorModal>
  )
}
