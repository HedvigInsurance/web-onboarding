import { TranslationsPlaceholderConsumer } from '@hedviginsurance/textkeyfy'
import { ChatMessage, ChatMessageProps } from 'components/hedvig/chat'
import * as React from 'react'
import { ChatContainer } from '../state'

export const Greet: React.SFC<ChatMessageProps> = ({
  onTyped,
  appear,
  isCurrentMessage,
}) => (
  <ChatContainer>
    {({ nameAge }) => (
      <ChatMessage
        appear={appear}
        typingDuration={500}
        onTyped={onTyped}
        isCurrentMessage={isCurrentMessage}
      >
        <TranslationsPlaceholderConsumer
          textKey="CHAT_HEDVIG_GREET"
          replacements={{
            name: <span data-hj-supress>{nameAge.firstName}</span>,
          }}
        >
          {(text) => text}
        </TranslationsPlaceholderConsumer>
      </ChatMessage>
    )}
  </ChatContainer>
)
