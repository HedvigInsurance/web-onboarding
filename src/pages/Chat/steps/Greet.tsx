import * as React from 'react'
import { ChatMessage, ChatMessageProps } from '../../../components/hedvig/chat'
import { ChatContainer } from '../state'

export const Greet: React.SFC<ChatMessageProps> = ({ onTyped }) => (
  <ChatContainer>
    {({ step1 }) => (
      <ChatMessage typingDuration={500} onTyped={onTyped}>
        Trevligt att träffas {step1 && step1.firstName} 😄
      </ChatMessage>
    )}
  </ChatContainer>
)
