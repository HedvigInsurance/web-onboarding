import { defaultTo } from 'ramda'
import * as React from 'react'
import styled from 'react-emotion'
import Transition, { ENTERED } from 'react-transition-group/Transition'

export const ConversationWrapper = styled('div')({
  maxWidth: 800,
  padding: '0 20px',
  margin: '0 auto',
})

const getId = (child: React.ReactChild) => React.Children.only(child).props.id

export interface MessageProps {
  id: string
  appear?: boolean
  delay?: number
  children: (props: { appear: boolean; id: string }) => React.ReactNode
}

export const Message: React.SFC<MessageProps> = ({
  children,
  id,
  appear = false,
}) => <>{children({ appear, id })}</>

interface ConversationProps {
  children:
    | React.ReactElement<MessageProps>
    | Array<React.ReactElement<MessageProps>>
  currentStep?: string
  visibleSteps?: string[]
  initialVisibleSteps?: string[]
}

export const Conversation: React.SFC<ConversationProps> = ({
  children,
  visibleSteps = [],
  initialVisibleSteps = [],
}) => {
  React.Children.forEach(children, (child, index) => {
    if (!React.isValidElement(child)) {
      throw new Error(`Child at index ${index} must be a Message`)
    }
  })
  return (
    <ConversationWrapper>
      {React.Children.toArray(children)
        .filter((message) => visibleSteps.includes(getId(message)))
        .map(
          (message) =>
            React.Children.only(message).props.delay &&
            !initialVisibleSteps.includes(getId(message)) ? (
              <Transition
                timeout={React.Children.only(message).props.delay}
                appear
                in
                key={defaultTo(undefined, React.Children.only(message).key)}
              >
                {(status) =>
                  status === ENTERED ? (
                    React.cloneElement<MessageProps>(
                      React.Children.only(message),
                      {
                        appear: false,
                      },
                    )
                  ) : (
                    <div /> // noop but needs to be here for the animation to work
                  )
                }
              </Transition>
            ) : (
              React.cloneElement<MessageProps>(React.Children.only(message), {
                appear: initialVisibleSteps.includes(getId(message)),
              })
            ),
        )}
    </ConversationWrapper>
  )
}
