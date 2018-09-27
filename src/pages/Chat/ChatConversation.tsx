import { ChatMessage } from 'components/hedvig/chat'
import { Conversation, Message } from 'components/hedvig/conversation'
import * as React from 'react'
import { Greet } from './steps/Greet'
import { NameAgeInput } from './steps/NameAgeInput'

export const ChatConversation: React.SFC = () => (
  <Conversation>
    <Message>
      {(next) => (
        <ChatMessage typingDuration={2500} onTyped={next}>
          Hej! Det är jag som är Hedvig! 👋
        </ChatMessage>
      )}
    </Message>
    <Message>
      {(next) => (
        <ChatMessage typingDuration={1500} onTyped={next}>
          Berätta lite om dig själv...
        </ChatMessage>
      )}
    </Message>

    <Message delay={500}>{(next) => <NameAgeInput onSubmit={next} />}</Message>

    <Message>{(next) => <Greet onTyped={next} />}</Message>
    <Message>
      {(_) => (
        <ChatMessage typingDuration={500}>
          Och berätta lite om hur du bor...
        </ChatMessage>
      )}
    </Message>
  </Conversation>
)
