import styled from '@emotion/styled'
import { Modal } from 'components/ModalNew'
import { Button } from 'new-components/buttons'
import React from 'react'
import { useHistory } from 'react-router'
import { useTextKeys } from 'utils/hooks/useTextKeys'

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
