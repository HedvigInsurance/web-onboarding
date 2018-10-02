import { Container, ContainerProps, EffectProps } from 'constate'
import { propOr } from 'ramda'
import * as React from 'react'
import { StorageContainer } from '../../utils/StorageContainer'

export interface Step1State {
  firstName: string
  lastName: string
  age: number | string
}

export interface State {
  step1?: Step1State
}

export interface Effects {
  setStep1Prop: <K extends keyof Step1State>(
    prop: K,
    value: Step1State[K],
  ) => void
  reset: () => void
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
            setStep1Prop: <K extends keyof Step1State>(
              key: K,
              value: Step1State[K],
            ) => ({ state, setState }: EffectProps<State>) => {
              const newState: Partial<State> = {
                step1: {
                  ...propOr<Step1State, State, Step1State>(
                    { firstName: '', lastName: '', age: '' },
                    'step1',
                    state,
                  ),
                  [key]: value,
                },
              }
              setState(newState)
              storageState.session.setSession({
                ...storageState.session.getSession(),
                chat: newState,
              })
            },
            reset: () => ({ setState }: EffectProps<State>) => {
              setState({ step1: undefined })
              storageState.session.setSession({
                ...storageState.session.getSession(),
                chat: {},
              })
            },
          } as any
        }
      />
    )}
  </StorageContainer>
)
