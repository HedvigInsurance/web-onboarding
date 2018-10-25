import * as React from 'react'
import styled from 'react-emotion'
import { ChatContainer } from './state'

const Wrapper = styled('div')({
  marginRight: 26,
  textAlign: 'right',
})

const Button = styled('button')({
  appearence: 'none',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
})

const Icon = styled('img')({
  width: '2em',
  height: '2em',
})

export const ResetButton = () => (
  <ChatContainer>
    {({ reset }) => (
      <Wrapper>
        <Button onClick={reset}>
          <Icon src="/assets/topbar/reload.svg" />
        </Button>
      </Wrapper>
    )}
  </ChatContainer>
)
