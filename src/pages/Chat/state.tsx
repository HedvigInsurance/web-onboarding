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
  currentStep: string
  initialVisibleSteps: string[]
  visibleSteps: string[]
  step1?: Step1State
}

export interface Effects {
  setStep1Prop: <K extends keyof Step1State>(
    prop: K,
    value: Step1State[K],
  ) => void
  reset: () => void
  goToStep: (step: string) => void
}

export const ChatContainer: React.SFC<
  ContainerProps<State, {}, {}, Effects>
> = (props) => (
  <StorageContainer>
    {(storageState) => (
      <Container<State, {}, {}, Effects>
        context="chatConversation"
        {...props}
        initialState={propOr(
          {
            visibleSteps: ['initial'],
            currentStep: 'initial',
            initialVisibleSteps: [],
          },
          'chat',
          storageState.session.getSession(),
        )}
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
                chat: {
                  ...propOr({}, 'chat', storageState.session.getSession()),
                  ...newState,
                },
              })
            },
            reset: () => ({ setState }: EffectProps<State>) => {
              storageState.session.setSession({
                ...storageState.session.getSession(),
                chat: {
                  step1: undefined,
                  currentStep: 'initial',
                  visibleSteps: ['initial'],
                  initialVisibleSteps: [],
                },
              })
              // Force 2 state updates to make sure first step is re-mounted
              setState({
                step1: undefined,
                currentStep: undefined,
                visibleSteps: [],
                initialVisibleSteps: [],
              })
              setTimeout(() => {
                setState({ currentStep: 'initial', visibleSteps: ['initial'] })
              }, 0)
            },
            goToStep: (step: string) => ({
              state,
              setState,
            }: EffectProps<State>) => {
              const newState = {
                currentStep: step,
                visibleSteps: [...state.visibleSteps, step],
              }
              storageState.session.setSession({
                ...storageState.session.getSession(),
                chat: {
                  ...propOr({}, 'chat', storageState.session.getSession()),
                  ...newState,
                  initialVisibleSteps: newState.visibleSteps,
                },
              })
              setState(newState)
            },
          } as any
        }
      />
    )}
  </StorageContainer>
)
