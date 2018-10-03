import { ChatMessage } from 'components/hedvig/chat'
import { Conversation, Message } from 'components/hedvig/conversation'
import * as React from 'react'
import { ChatContainer } from './state'
import { Greet } from './steps/Greet'
import { NameAgeInput } from './steps/NameAgeInput'

export const ChatConversation: React.SFC = () => (
  <ChatContainer>
    {({ initialVisibleSteps, visibleSteps, currentStep, goToStep }) => (
      <Conversation
        initialVisibleSteps={initialVisibleSteps}
        visibleSteps={visibleSteps}
        currentStep={currentStep}
      >
        <Message id="initial">
          {({ appear }) => (
            <ChatMessage
              appear={appear}
              typingDuration={2500}
              onTyped={() => goToStep('initial-2')}
            >
              Hej! Det är jag som är Hedvig! 👋
            </ChatMessage>
          )}
        </Message>
        <Message id="initial-2">
          {({ appear }) => (
            <ChatMessage
              appear={appear}
              typingDuration={1500}
              onTyped={() => goToStep('name-age-input')}
            >
              Berätta lite om dig själv...
            </ChatMessage>
          )}
        </Message>

        <Message delay={500} id="name-age-input">
          {({ appear }) => (
            <NameAgeInput
              onSubmit={() => goToStep('greet-1')}
              appear={appear}
            />
          )}
        </Message>

        <Message id="greet-1">
          {({ appear }) => (
            <Greet appear={appear} onTyped={() => goToStep('greet-2')} />
          )}
        </Message>
        <Message id="greet-2">
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
