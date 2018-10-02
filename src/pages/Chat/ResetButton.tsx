import * as React from 'react'
import { ChatContainer } from './state'

export const ResetButton = () => (
  <ChatContainer>
    {({ reset }) => <button onClick={reset}>reset session</button>}
  </ChatContainer>
)
