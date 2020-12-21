import React from 'react'
import styled from '@emotion/styled'
import { TextButton } from 'components/buttons'
import { useTextKeys } from 'utils/textKeys'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const LinkToChat = () => {
  const textKeys = useTextKeys()

  return (
    <Wrapper>
      <TextButton onClick={() => Intercom('show')}>
        {textKeys.CHECKOUT_SIGN_LINK_TO_OPEN_CHAT()}
      </TextButton>
    </Wrapper>
  )
}
