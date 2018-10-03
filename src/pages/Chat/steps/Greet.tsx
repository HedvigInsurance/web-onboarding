import { ChatMessage, ChatMessageProps } from 'components/hedvig/chat'
import { propOr } from 'ramda'
import * as React from 'react'
import { ChatContainer } from '../state'

export const Greet: React.SFC<ChatMessageProps> = ({ onTyped, appear }) => (
  <ChatContainer>
    {({ nameAge }) => (
      <ChatMessage appear={appear} typingDuration={500} onTyped={onTyped}>
        Trevligt att träffas {propOr('', 'firstName', nameAge)} 😄
      </ChatMessage>
    )}
  </ChatContainer>
)
