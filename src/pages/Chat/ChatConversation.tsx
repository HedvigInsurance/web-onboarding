import { Container, Provider, StateUpdater } from 'constate'
import { always, ifElse } from 'ramda'
import * as React from 'react'
import { ChatMessage } from '../../components/hedvig/chat'
import { TimedMount } from '../../components/utils/TimedMount'
import { Greet } from './steps/Greet'
import { NameAgeInput } from './steps/NameAgeInput'
import { ChatWrapper } from './styles'

export type MessageRenderer = (next: () => void) => React.ReactNode

export interface Message {
  render: MessageRenderer
  delay?: number
  key?: string | number
}

export const chatMessages = (): Message[] => [
  {
    render: (next) => (
      <ChatMessage typingDuration={2500} onTyped={next} key="hello">
        Hej! Det är jag som är Hedvig! 👋
      </ChatMessage>
    ),
  },
  {
    render: (next) => (
      <ChatMessage typingDuration={1500} onTyped={next} key="hello-2">
        Berätta lite om dig själv...
      </ChatMessage>
    ),
  },
  {
    delay: 500,
    key: 'hello-response',
    render: (next) => <NameAgeInput onSubmit={next} />,
  },
  {
    delay: 500,
    key: 'greet',
    render: (next) => <Greet onTyped={next} />,
  },
  {
    render: () => (
      <ChatMessage typingDuration={500} key="ask-living">
        Och berätta lite om hur du bor...
      </ChatMessage>
    ),
  },
]

interface WithMessagesProps {
  messages: Message[]
}

interface State {
  currentMessage: number
}

interface Actions {
  next: () => StateUpdater<State>
}

const nextOrNoop = (next: () => void) => (
  currentMessage: number,
  index: number,
) => ifElse(() => currentMessage <= index, always(next), always(null))(null)
export const ChatConversation: React.SFC<WithMessagesProps> = ({
  messages,
}) => (
  <Provider>
    <Container<State, Actions>
      initialState={{ currentMessage: 0 }}
      actions={{
        next: () => ({ currentMessage }) => ({
          currentMessage:
            currentMessage < messages.length - 1
              ? currentMessage + 1
              : undefined,
        }),
      }}
    >
      {({ currentMessage, next }) => (
        <ChatWrapper>
          {messages.slice(0, currentMessage + 1).map(
            (message, index) =>
              message.delay ? (
                <TimedMount duration={message.delay} key={message.key}>
                  {({ hasFired }) =>
                    hasFired &&
                    message.render(nextOrNoop(next)(currentMessage, index))
                  }
                </TimedMount>
              ) : (
                message.render(nextOrNoop(next)(currentMessage, index))
              ),
          )}
        </ChatWrapper>
      )}
    </Container>
  </Provider>
)
