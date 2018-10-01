import { Container, ContainerProps, EffectProps } from 'constate'
import { propOr } from 'ramda'
import * as React from 'react'
import { StorageContainer } from '../../utils/StorageContainer'

export interface State {
  step1?: {
    firstName: string
    lastName: string
    age: number
  }
}

export interface Effects {
  setStep1: (firstName: string, lastName: string, age: number) => void
}

export const ChatContainer: React.SFC<
  ContainerProps<State, {}, {}, Effects>
> = (props) => (
  <StorageContainer>
    {(storageState) => (
      <Container<State, {}, {}, Effects>
        context="chatConversation"
        {...props}
        initialState={propOr({}, 'chat', storageState.session.getSession())}
        effects={
          {
            setStep1: (firstName: string, lastName: string, age: number) => ({
              setState,
            }: EffectProps<State>) => {
              const newState = {
                step1: { firstName, lastName, age },
              }
              setState(newState)
              storageState.session.setSession({
                ...storageState.session.getSession(),
                chat: newState,
              })
            },
          } as any
        }
      />
    )}
  </StorageContainer>
)
