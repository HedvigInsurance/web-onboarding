import { ChatMessage } from 'components/hedvig/chat'
import { Conversation, Message } from 'components/hedvig/conversation'
import { Container } from 'constate'
import { allPass, isNil, not, path, pipe, prop } from 'ramda'
import * as React from 'react'
import { Mount } from 'react-lifecycle-components'
import { ChatContainer, State as ChatState } from './state'
import { Greet } from './steps/Greet'
import { NameAgeInput } from './steps/NameAgeInput'

interface InitialStepState {
  hasSetInitialStep: boolean
}

interface InitialStepActions {
  setInitialStep: () => void
}

const step1PropIsntNil = (step1Prop: string) => (steps: ChatState) =>
  pipe(
    path(['step1', step1Prop]),
    isNil,
    not,
  )(steps)

const getInitialStep = (steps: ChatState) => {
  if (
    allPass([
      pipe(
        prop('step1'),
        isNil,
        not,
      ),
      step1PropIsntNil('firstName'),
      step1PropIsntNil('lastName'),
      step1PropIsntNil('age'),
    ])(steps)
  ) {
    return 5
  }

  return 0
}

export const ChatConversation: React.SFC = () => (
  <Container<InitialStepState, InitialStepActions>
    initialState={{ hasSetInitialStep: false }}
    actions={{ setInitialStep: () => (_) => ({ hasSetInitialStep: true }) }}
  >
    {({ hasSetInitialStep, setInitialStep }) => (
      <Mount on={setInitialStep}>
        <ChatContainer>
          {(chatState) => (
            <Conversation
              initialStep={hasSetInitialStep ? 0 : getInitialStep(chatState)}
            >
              <Message>
                {({ next, appear }) => (
                  <ChatMessage
                    appear={appear}
                    typingDuration={2500}
                    onTyped={next}
                  >
                    Hej! Det är jag som är Hedvig! 👋
                  </ChatMessage>
                )}
              </Message>
              <Message>
                {({ next, appear }) => (
                  <ChatMessage
                    appear={appear}
                    typingDuration={1500}
                    onTyped={next}
                  >
                    Berätta lite om dig själv...
                  </ChatMessage>
                )}
              </Message>

              <Message delay={500}>
                {({ next, appear }) => (
                  <NameAgeInput onSubmit={next} appear={appear} />
                )}
              </Message>

              <Message>
                {({ next, appear }) => <Greet appear={appear} onTyped={next} />}
              </Message>
              <Message>
                {({ appear }) => (
                  <ChatMessage appear={appear} typingDuration={500}>
                    Och berätta lite om hur du bor...
                  </ChatMessage>
                )}
              </Message>
            </Conversation>
          )}
        </ChatContainer>
      </Mount>
    )}
  </Container>
)
