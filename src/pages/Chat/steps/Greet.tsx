import { ChatMessage, ChatMessageProps } from 'components/hedvig/chat'
import { propOr } from 'ramda'
import * as React from 'react'
import { ChatContainer } from '../state'

export const Greet: React.SFC<ChatMessageProps> = ({ onTyped }) => (
  <ChatContainer>
    {({ step1 }) => (
      <ChatMessage typingDuration={500} onTyped={onTyped}>
        Trevligt att träffas {propOr('', 'firstName', step1)} 😄
      </ChatMessage>
    )}
  </ChatContainer>
)
