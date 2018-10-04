import { Container, ContainerProps, EffectProps } from 'constate'
import { propOr } from 'ramda'
import * as React from 'react'
import { StorageContainer } from '../../utils/StorageContainer'

export enum ApartmentType {
  RENT = 'RENT',
  OWN = 'OWN',
}

export interface NameAgeState {
  firstName: string
  lastName: string
  age: number | string
}
export interface LivingSituationState {
  streetAddress: string
  postalCode: string
  apartmentType?: ApartmentType
  size: number | string
  numberOfPeople: number
}

export interface State {
  currentStep: string
  initialVisibleSteps: string[]
  visibleSteps: string[]
  nameAge: NameAgeState
  livingSituation: LivingSituationState
}

const initialState: State = {
  visibleSteps: ['initial'],
  currentStep: 'initial',
  initialVisibleSteps: [],
  nameAge: {
    firstName: '',
    age: '',
    lastName: '',
  },
  livingSituation: {
    size: '',
    numberOfPeople: 1,
    postalCode: '',
    streetAddress: '',
  },
}

export interface Effects {
  setNameAgeProp: <K extends keyof NameAgeState>(
    prop: K,
    value: NameAgeState[K],
  ) => void
  setLivingSituationProp: <K extends keyof LivingSituationState>(
    prop: K,
    value: LivingSituationState[K],
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
          initialState,
          'chat',
          storageState.session.getSession(),
        )}
        effects={
          {
            setNameAgeProp: <K extends keyof NameAgeState>(
              key: K,
              value: NameAgeState[K],
            ) => ({ state, setState }: EffectProps<State>) => {
              const newState: Partial<State> = {
                nameAge: {
                  ...propOr<NameAgeState, State, NameAgeState>(
                    initialState.nameAge,
                    'nameAge',
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
            setLivingSituationProp: <K extends keyof LivingSituationState>(
              key: K,
              value: LivingSituationState[K],
            ) => ({ state, setState }: EffectProps<State>) => {
              const newState: Partial<State> = {
                livingSituation: {
                  ...propOr<LivingSituationState, State, LivingSituationState>(
                    initialState.livingSituation,
                    'livingSituation',
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
                chat: initialState,
              })
              // Force 2 state updates to make sure first step is re-mounted
              setState({
                ...initialState,
                currentStep: undefined,
                visibleSteps: [],
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
