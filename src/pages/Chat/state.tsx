import { Container, ContainerProps, EffectProps } from 'constate'
import * as React from 'react'
import { notNullable } from '../../utils/nullables'
import { StorageContainer } from '../../utils/StorageContainer'

export enum ChatStep {
  INITIAL = 'INITIAL',
  NAME_INPUT = 'NAME_INPUT',
  AGE_INPUT = 'AGE_INPUT',
  GREET = 'GREET',
  LIVING_SITUATION_INPUT = 'LIVING_SITUATION_INPUT',
  CURRENT_INSURANCE_QUESTION = 'CURRENT_INSURANCE_QUESTION',
  CURRENT_INSURANCE_INPUT = 'CURRENT_INSURANCE_INPUT',
  SHOW_OFFER = 'SHOW_OFFER',
}

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
  currentStep: ChatStep
  initialVisibleSteps: ChatStep[]
  visibleSteps: ChatStep[]
  nameAge: NameAgeState
  livingSituation: LivingSituationState
  currentInsurance: CurrentInsuranceState
}

const initialState: State = {
  visibleSteps: [ChatStep.INITIAL],
  currentStep: ChatStep.INITIAL,
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
  goToStep: (step: ChatStep) => void
}

export const ChatContainer: React.SFC<
  ContainerProps<State, {}, {}, Effects>
> = (props) => (
  <StorageContainer>
    {(storageState) => (
      <Container<State, {}, {}, Effects>
        context="chatConversation"
        {...props}
        initialState={
          (storageState.session.getSession() &&
            notNullable(storageState.session.getSession()).chat) ||
          initialState
        }
        effects={
          {
            setNameAgeProp: <K extends keyof NameAgeState>(
              key: K,
              value: NameAgeState[K],
            ) => ({ state, setState }: EffectProps<State>) => {
              const newState: Partial<State> = {
                nameAge: {
                  ...(state.nameAge || initialState.nameAge),
                  [key]: value,
                },
              }
              setState(newState)
              storageState.session.setSession({
                ...storageState.session.getSession(),
                chat: {
                  ...((storageState.session.getSession() &&
                    notNullable(storageState.session.getSession()).chat) ||
                    initialState),
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
                  ...(state.livingSituation || initialState.livingSituation),
                  [key]: value,
                },
              }
              setState(newState)
              storageState.session.setSession({
                ...storageState.session.getSession(),
                chat: {
                  ...((storageState.session.getSession() &&
                    notNullable(storageState.session.getSession()).chat) ||
                    initialState),
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
                  ...((storageState.session.getSession() &&
                    notNullable(storageState.session.getSession()).chat) ||
                    initialState),
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
                  ...((storageState.session.getSession() &&
                    notNullable(storageState.session.getSession()).chat) ||
                    initialState),
                  ...newState,
                },
              })
            },
            reset: () => ({ setState }: EffectProps<State>) => {
              storageState.session.setSession({
                ...storageState.session.getSession(),
                chat: initialState,
                token: undefined,
              })
              // Force 2 state updates to make sure first step is re-mounted
              setState({
                ...initialState,
                currentStep: undefined,
                visibleSteps: [],
              })
              storageState.setToken(undefined)
              setTimeout(() => {
                setState({
                  currentStep: ChatStep.INITIAL,
                  visibleSteps: [ChatStep.INITIAL],
                })
              }, 0)
            },
            goToStep: (step: ChatStep) => ({
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
                  ...((storageState.session.getSession() &&
                    notNullable(storageState.session.getSession()).chat) ||
                    initialState),
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
