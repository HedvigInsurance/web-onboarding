import React from 'react'
import styled from '@emotion/styled'
import { TextButton } from 'components/buttons'
import { useTextKeys } from 'utils/textKeys'
import { useFeature } from 'utils/hooks/useFeature'
import { Feature } from 'shared/clientConfig'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const LinkToChat = () => {
  const textKeys = useTextKeys()

  const [enabled] = useFeature([Feature.INTERCOM])
  if (!enabled) return null

  return (
    <Wrapper>
      <TextButton onClick={() => Intercom('show')}>
        {textKeys.CHECKOUT_SIGN_LINK_TO_OPEN_CHAT()}
      </TextButton>
    </Wrapper>
  )
}
