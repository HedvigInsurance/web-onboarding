import { Container, ContainerProps, EffectProps } from 'constate'
import { propOr } from 'ramda'
import * as React from 'react'
import { StorageContainer } from '../../utils/StorageContainer'

export enum ApartmentType {
  RENT = 'RENT',
  OWN = 'OWN',
}

export enum Insurer {
  FOLKSAM = 'FOLKSAM',
  TRYGG_HANSA = 'TRYGG_HANSA',
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
export interface CurrentInsuranceState {
  hasCurrentInsurance?: boolean
  currentInsurer?: Insurer
}

export interface State {
  currentStep: string
  initialVisibleSteps: string[]
  visibleSteps: string[]
  nameAge: NameAgeState
  livingSituation: LivingSituationState
  currentInsurance: CurrentInsuranceState
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
    numberOfPeople: 0,
    postalCode: '',
    streetAddress: '',
  },
  currentInsurance: {},
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
  setHasCurrentInsurance: (event: React.ChangeEvent<HTMLSelectElement>) => void
  setCurrentInsurer: (event: React.ChangeEvent<HTMLSelectElement>) => void
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
            setHasCurrentInsurance: (
              event: React.ChangeEvent<HTMLSelectElement>,
            ) => ({ state, setState }: EffectProps<State>) => {
              const getCurrentInsurance = (): CurrentInsuranceState => {
                if (event.target.value === 'yes') {
                  return {
                    hasCurrentInsurance: true,
                    currentInsurer: state.currentInsurance.currentInsurer,
                  }
                }
                if (event.target.value === 'no') {
                  return { hasCurrentInsurance: false }
                }
                return {
                  hasCurrentInsurance: undefined,
                  currentInsurer: undefined,
                }
              }
              const newState: Partial<State> = {
                currentInsurance: getCurrentInsurance(),
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
            setCurrentInsurer: (
              event: React.ChangeEvent<HTMLSelectElement>,
            ) => ({ setState }: EffectProps<State>) => {
              const newState: Partial<State> = {
                currentInsurance: {
                  hasCurrentInsurance: true,
                  currentInsurer:
                    event.target.value === 'select'
                      ? undefined
                      : (event.target.value as Insurer),
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
