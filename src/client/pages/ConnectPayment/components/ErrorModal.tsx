import styled from '@emotion/styled'
import React from 'react'
import { useHistory } from 'react-router'
import { Button } from 'components/buttons'
import { Modal } from 'components/ModalNew'
import { useTextKeys } from 'utils/textKeys'

const ErrorMessage = styled('div')`
  padding: 2rem 1rem;
`

export const ErrorModal: React.FC = () => {
  const textKeys = useTextKeys()
  const history = useHistory()

  return (
    <Modal
      isVisible={history.location.search.includes('error=yes')}
      onClose={() => history.replace(history.location.pathname)}
      dynamicHeight
    >
      <ErrorMessage>
        <h3>{textKeys.CONNECT_PAYMENT_ERROR_HEADLINE()}</h3>
        <p>{textKeys.CONNECT_PAYMENT_ERROR_PARAGRAPH()}</p>
        <Button onClick={() => history.replace(history.location.pathname)}>
          {textKeys.CONNECT_PAYMENT_ERROR_BUTTON()}
        </Button>
      </ErrorMessage>
    </Modal>
  )
}
