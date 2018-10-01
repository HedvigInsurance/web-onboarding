import { Container, ContainerProps, StateUpdater } from 'constate'
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
  <StorageContainer>
    {(storageState) => (
      <Container<State, Actions>
        context="chatConversation"
        onUpdate={({ state }) => {
          storageState.session.setSession({
            ...storageState.session.getSession(),
            chat: state,
          })
        }}
        {...props}
        initialState={propOr({}, 'chat', storageState.session.getSession())}
        actions={{
          setStep1: (firstName, lastName, age) => (_) => ({
            step1: { firstName, lastName, age },
          }),
        }}
      />
    )}
  </StorageContainer>
)
