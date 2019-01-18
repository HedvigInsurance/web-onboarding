import { Container, ContainerProps } from 'constate'
import * as React from 'react'
import { InsuranceType } from 'utils/insuranceDomainUtils'
import { notNullable } from '../../utils/nullables'
import { StorageContainer } from '../../utils/StorageContainer'

export enum ChatStep {
  INITIAL_NAME = 'INITIAL_NAME',
  NUMBER_OF_PEOPLE = 'NUMBER_OF_PEOPLE',
  INITIAL = 'INITIAL',
  NAME_INPUT = 'NAME_INPUT',
  AGE_INPUT = 'AGE_INPUT',
  GREET = 'GREET',
  ADDRESS_INPUT = 'ADDRESS_INPUT',
  INSURANCE_TYPE_INPUT = 'INSURANCE_TYPE_INPUT',
  CURRENT_INSURANCE_QUESTION = 'CURRENT_INSURANCE_QUESTION',
  CURRENT_INSURANCE_INPUT = 'CURRENT_INSURANCE_INPUT',
  SHOW_OFFER_QUESTION = 'SHOW_OFFER_QUESTION',
  SHOW_OFFER = 'SHOW_OFFER',
}

export enum Insurer {
  IF = 'if',
  FOLKSAM = 'Folksam',
  TRYGG_HANSA = 'Trygg-Hansa',
  LANSFORSAKRINGAR = 'Länsförsäkringar',
  MODERNA = 'Moderna',
  ICA = 'ICA',
  GJENSIDIGE = 'Gjensidige',
  VARDIA = 'Vardia',
  OTHER = 'OTHER',
}

export interface NameAgeState {
  firstName: string
  lastName: string
  age: number | string
}
export interface LivingSituationState {
  streetAddress: string
  postalNumber: string
  insuranceType?: InsuranceType
  size: number | string
  numberOfPeople: number
}
export interface CurrentInsuranceState {
  hasCurrentInsurance?: boolean
  currentInsurer?: Insurer
  otherInsurer?: string
}

export interface State {
  currentStep: ChatStep
  currentlyPeeking?: ChatStep
  initialVisibleSteps: ChatStep[]
  visibleSteps: ChatStep[]
  nameAge: NameAgeState
  livingSituation: LivingSituationState
  isStudent?: boolean
  currentInsurance: CurrentInsuranceState
}

export const initialState = ({
  initialFirstName,
  initialInsurer,
}: {
  initialFirstName?: string
  initialInsurer?: Insurer
} = {}): State => ({
  visibleSteps: [initialFirstName ? ChatStep.INITIAL_NAME : ChatStep.INITIAL],
  currentStep: initialFirstName ? ChatStep.INITIAL_NAME : ChatStep.INITIAL,
  initialVisibleSteps: [],
  nameAge: {
    firstName: initialFirstName || '',
    age: '',
    lastName: '',
  },
  livingSituation: {
    size: 0,
    numberOfPeople: 0,
    postalNumber: '',
    streetAddress: '',
  },
  isStudent: undefined,
  currentInsurance: Object.values(Insurer).includes(initialInsurer)
    ? {
        hasCurrentInsurance: true,
        currentInsurer: initialInsurer,
      }
    : {},
})

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
  setOtherInsurer: (event: React.ChangeEvent<HTMLInputElement>) => void
  setIsStudent: (event: React.ChangeEvent<HTMLInputElement>) => void
  reset: () => void
  goToStep: (step: ChatStep) => void
  peekStep: (step: ChatStep) => void
  unpeek: () => void
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
          initialState()
        }
        effects={{
          setNameAgeProp: <K extends keyof NameAgeState>(
            key: K,
            value: NameAgeState[K],
          ) => ({ state, setState }) => {
            const newState: Partial<State> = {
              nameAge: {
                ...(state.nameAge || initialState().nameAge),
                [key]: value,
              },
            }
            setState(newState)
            storageState.session.setSession({
              ...storageState.session.getSession(),
              chat: {
                ...((storageState.session.getSession() &&
                  notNullable(storageState.session.getSession()).chat) ||
                  initialState()),
                ...newState,
              },
            })
          },
          setLivingSituationProp: <K extends keyof LivingSituationState>(
            key: K,
            value: LivingSituationState[K],
          ) => ({ state, setState }) => {
            const newState: Partial<State> = {
              livingSituation: {
                ...(state.livingSituation || initialState().livingSituation),
                [key]: value,
              },
            }
            setState(newState)
            storageState.session.setSession({
              ...storageState.session.getSession(),
              chat: {
                ...((storageState.session.getSession() &&
                  notNullable(storageState.session.getSession()).chat) ||
                  initialState()),
                ...newState,
              },
            })
          },
          setHasCurrentInsurance: (event) => ({ state, setState }) => {
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
                  initialState()),
                ...newState,
              },
            })
          },
          setCurrentInsurer: (event) => ({ setState }) => {
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
                  initialState()),
                ...newState,
              },
            })
          },
          setIsStudent: (event) => ({ setState }) => {
            const newState: Partial<State> = {
              isStudent: event.target.checked,
            }
            setState(newState)
            storageState.session.setSession({
              ...storageState.session.getSession(),
              chat: {
                ...((storageState.session.getSession() &&
                  notNullable(storageState.session.getSession()).chat) ||
                  initialState()),
                ...newState,
              },
            })
          },
          setOtherInsurer: (event) => ({ setState }) => {
            const newState: Partial<State> = {
              currentInsurance: {
                hasCurrentInsurance: true,
                currentInsurer: Insurer.OTHER,
                otherInsurer: event.target.value,
              },
            }

            setState(newState)
            storageState.session.setSession({
              ...storageState.session.getSession(),
              chat: {
                ...((storageState.session.getSession() &&
                  notNullable(storageState.session.getSession()).chat) ||
                  initialState()),
                ...newState,
              },
            })
          },
          reset: () => ({ setState }) => {
            storageState.session.setSession({
              ...storageState.session.getSession(),
              chat: initialState(),
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
          goToStep: (step) => ({ state, setState }) => {
            if (state.visibleSteps.includes(step)) {
              return
            }
            const newState = {
              currentStep: step,
              visibleSteps: [...state.visibleSteps, step],
            }
            storageState.session.setSession({
              ...storageState.session.getSession(),
              chat: {
                ...((storageState.session.getSession() &&
                  notNullable(storageState.session.getSession()).chat) ||
                  initialState()),
                ...newState,
                initialVisibleSteps: newState.visibleSteps,
              },
            })
            setState(newState)
          },
          peekStep: (step) => ({ setState }) => {
            setState({ currentlyPeeking: step })
          },
          unpeek: () => ({ setState }) => {
            setState({ currentlyPeeking: undefined })
          },
        }}
      />
    )}
  </StorageContainer>
)
