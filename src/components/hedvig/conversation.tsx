import { Container, StateUpdater } from 'constate'
import { always, defaultTo, ifElse } from 'ramda'
import * as React from 'react'
import styled from 'react-emotion'
import Transition, { ENTERED } from 'react-transition-group/Transition'

export const ConversationWrapper = styled('div')({
  maxWidth: 800,
  padding: '0 20px',
  margin: '0 auto',
})

const nextOrNoop = (next: () => void) => (
  currentMessage: number,
  index: number,
) =>
  ifElse(() => currentMessage <= index, always(next), always(always(null)))(
    null,
  )

export interface MessageProps {
  appear?: boolean
  next?: () => void
  delay?: number
  children: (props: { next: () => void; appear: boolean }) => React.ReactNode
}

export const Message: React.SFC<MessageProps> = ({
  children,
  next,
  appear = false,
}) => (
  <>
    {children({
      next: defaultTo(always(null), next),
      appear,
    })}
  </>
)

interface State {
  currentMessage: number
  stateInitialStep: number
}

interface Actions {
  next: () => StateUpdater<State>
}

interface ConversationProps {
  children:
    | React.ReactElement<MessageProps>
    | Array<React.ReactElement<MessageProps>>
  initialStep?: number
}

export const Conversation: React.SFC<ConversationProps> = ({
  children,
  initialStep = 0,
}) => {
  React.Children.forEach(children, (child, index) => {
    if (!React.isValidElement(child)) {
      throw new Error(`Child at index ${index} must be a Message`)
    }
  })
  return (
    <Container<State, Actions>
      initialState={{
        stateInitialStep: initialStep,
        currentMessage: initialStep,
      }}
      actions={{
        next: () => ({ currentMessage }) => ({
          currentMessage:
            currentMessage < React.Children.count(children) - 1
              ? currentMessage + 1
              : undefined,
        }),
      }}
    >
      {({ currentMessage, stateInitialStep, next }) => (
        <ConversationWrapper>
          {React.Children.toArray(children)
            .slice(0, currentMessage + 1)
            .map(
              (child, index) =>
                React.Children.only(child).props.delay &&
                stateInitialStep + 1 <= index ? (
                  <Transition
                    timeout={React.Children.only(child).props.delay}
                    appear
                    in
                    key={defaultTo(undefined, React.Children.only(child).key)}
                  >
                    {(status) =>
                      status === ENTERED ? (
                        React.cloneElement<MessageProps>(
                          React.Children.only(child),
                          {
                            next: nextOrNoop(next)(currentMessage, index),
                            appear: stateInitialStep > index,
                          },
                        )
                      ) : (
                        <div /> // noop but needs to be here for the animation to work
                      )
                    }
                  </Transition>
                ) : (
                  React.cloneElement<MessageProps>(React.Children.only(child), {
                    next: nextOrNoop(next)(currentMessage, index),
                    appear: stateInitialStep > index,
                  })
                ),
            )}
        </ConversationWrapper>
      )}
    </Container>
  )
}
