import { ChatMessage } from 'components/hedvig/chat'
import { Conversation, Message } from 'components/hedvig/conversation'
import { isNil, not, path, prop } from 'ramda'
import * as React from 'react'
import { ChatContainer, State as ChatState } from './state'
import { Greet } from './steps/Greet'
import { NameAgeInput } from './steps/NameAgeInput'

const getInitialStep = (steps: ChatState) => {
  if (
    not(isNil(prop('step1', steps))) &&
    not(isNil(path(['step1', 'firstName'], steps))) &&
    not(isNil(path(['step1', 'lastName'], steps))) &&
    not(isNil(path(['step1', 'age'], steps)))
  ) {
    return 6
  }

  return 0
}

const getShouldQuickRender = (step: number) => (initialStep: number) =>
  step < initialStep

export const ChatConversation: React.SFC = () => (
  <ChatContainer>
    {(chatState) => (
      <Conversation initialStep={getInitialStep(chatState)}>
        <Message appear={getShouldQuickRender(0)(getInitialStep(chatState))}>
          {({ next, appear }) => (
            <ChatMessage appear={appear} typingDuration={2500} onTyped={next}>
              Hej! Det är jag som är Hedvig! 👋
            </ChatMessage>
          )}
        </Message>
        <Message appear={getShouldQuickRender(1)(getInitialStep(chatState))}>
          {({ next, appear }) => (
            <ChatMessage appear={appear} typingDuration={1500} onTyped={next}>
              Berätta lite om dig själv...
            </ChatMessage>
          )}
        </Message>

        <Message
          delay={500}
          appear={getShouldQuickRender(3)(getInitialStep(chatState))}
        >
          {({ next, appear }) => (
            <NameAgeInput onSubmit={next} appear={appear} />
          )}
        </Message>

        <Message appear={getShouldQuickRender(4)(getInitialStep(chatState))}>
          {({ next, appear }) => <Greet appear={appear} onTyped={next} />}
        </Message>
        <Message appear={getShouldQuickRender(5)(getInitialStep(chatState))}>
          {({ appear }) => (
            <ChatMessage appear={appear} typingDuration={500}>
              Och berätta lite om hur du bor...
            </ChatMessage>
          )}
        </Message>
      </Conversation>
    )}
  </ChatContainer>
)
