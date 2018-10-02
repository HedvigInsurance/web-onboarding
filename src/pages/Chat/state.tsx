import { Container, ContainerProps, StateUpdater } from 'constate'
import * as React from 'react'

export interface State {
  step1?: {
    firstName: string
    lastName: string
    age: number
  }
}

export interface Actions {
  setStep1: (
    firstName: string,
    lastName: string,
    age: number,
  ) => StateUpdater<State>
}

export const ChatContainer: React.SFC<ContainerProps<State, Actions>> = (
  props,
) => (
  <Container<State, Actions>
    context="chatConversation"
    {...props}
    initialState={{}}
    actions={{
      setStep1: (firstName, lastName, age) => (_) => ({
        step1: { firstName, lastName, age },
      }),
    }}
  />
)
