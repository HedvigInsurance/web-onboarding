import { TranslationsPlaceholderConsumer } from '@hedviginsurance/textkeyfy'
import { ChatMessage, ChatMessageProps } from 'components/hedvig/chat'
import * as React from 'react'
import { ChatContainer } from '../state'

export const Greet: React.SFC<ChatMessageProps> = ({ onTyped, appear }) => (
  <ChatContainer>
    {({ nameAge }) => (
      <ChatMessage appear={appear} typingDuration={500} onTyped={onTyped}>
        <TranslationsPlaceholderConsumer
          textKey="CHAT_HEDVIG_GREET"
          replacements={{
            name: nameAge.firstName,
          }}
        >
          {(text) => text}
        </TranslationsPlaceholderConsumer>
      </ChatMessage>
    )}
  </ChatContainer>
)
