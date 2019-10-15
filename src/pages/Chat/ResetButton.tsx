import * as React from 'react'
import styled from 'react-emotion'
import { ChatContainer } from './state'

const Button = styled('button')({
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
})

const Icon = styled('img')({
  width: '1.75rem',
  height: '1.75rem',
  '@media (max-width: 600px)': {
    width: '1.5rem',
    height: '1.5rem',
  },
})

export const ResetButton = () => (
  <ChatContainer>
    {({ reset }) => (
      <Button onClick={reset}>
        <Icon src="/new-member-assets/topbar/reload.svg" />
      </Button>
    )}
  </ChatContainer>
)
