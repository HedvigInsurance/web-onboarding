import * as React from 'react'
import styled from 'react-emotion'
import { ChatContainer } from './state'

const Wrapper = styled('div')({
  marginRight: 26,
  textAlign: 'right',
  width: '20%',
  '@media (max-width: 850px)': {
    width: '33%',
  },
  '@media (max-width: 600px)': {
    width: '50%',
  },
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
