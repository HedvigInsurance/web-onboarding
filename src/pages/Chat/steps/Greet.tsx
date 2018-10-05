import { ChatMessage, ChatMessageProps } from 'components/hedvig/chat'
import * as React from 'react'
import { ChatContainer } from '../state'

export const Greet: React.SFC<ChatMessageProps> = ({ onTyped, appear }) => (
  <ChatContainer>
    {({ nameAge }) => (
      <ChatMessage appear={appear} typingDuration={500} onTyped={onTyped}>
        Kul att ha dig här {(nameAge && nameAge.firstName) || ''}!<br />
        Hur bor du?
      </ChatMessage>
    )}
  </ChatContainer>
)
