import { Container } from 'constate'
import * as React from 'react'
import { StorageContainer } from '../../utils/StorageContainer'

export interface Step {
  id: string
  isHedvig: boolean
}

interface State {
  steps: ReadonlyArray<Step>
  initialVisibleSteps: ReadonlyArray<Step>
  name?: string
  lastName?: string
  email?: string
  currentInsurer?: string
  sessionId?: string
  isChatActive: boolean
  selectedPremadeQuestion?: number
}

interface Effects {
  goToStep: (step: Step) => void
  setName: (name: string) => void
  setLastName: (lastName: string) => void
  setEmail: (email: string) => void
  setCurrentInsurer: (currentInsurer: string) => void
  setSessionId: (sessionId: string) => void
  makeChatActive: () => void
  selectPremadeQuestion: (selectedPremadeQuestion: number) => void
}

export const DontPanicContainer: React.FunctionComponent<{
  children: (props: State & Effects) => React.ReactNode
}> = (props) => (
  <StorageContainer>
    {({ dontPanicSession }) => (
      <Container<State, {}, {}, Effects>
        initialState={{
          steps: (dontPanicSession!.getSession() &&
            dontPanicSession!.getSession().steps) || [
            { id: 'initial', isHedvig: true },
          ],
          initialVisibleSteps:
            (dontPanicSession!.getSession() &&
              dontPanicSession!.getSession().steps) ||
            [],
          name:
            dontPanicSession!.getSession() &&
            dontPanicSession!.getSession().name,
          lastName:
            (dontPanicSession!.getSession() &&
              dontPanicSession!.getSession().lastName) ||
            '',
          email:
            (dontPanicSession!.getSession() &&
              dontPanicSession!.getSession().email) ||
            '',
          currentInsurer:
            (dontPanicSession!.getSession() &&
              dontPanicSession!.getSession().currentInsurer) ||
            'NO',
          sessionId:
            dontPanicSession!.getSession() &&
            dontPanicSession!.getSession().sessionId,
          isChatActive:
            dontPanicSession!.getSession() &&
            dontPanicSession!.getSession().isChatActive,
          selectedPremadeQuestion:
            dontPanicSession!.getSession() &&
            dontPanicSession!.getSession().selectedPremadeQuestion,
        }}
        effects={{
          goToStep: (step) => ({ state, setState }) => {
            if (state.steps.find(({ id }) => id === step.id)) {
              return
            }

            const session = dontPanicSession!.getSession() || {}
            dontPanicSession!.setSession({
              ...session,
              steps: [...(state.steps || []), step],
            })
            setState({ steps: [...state.steps, step] })
          },
          setName: (name) => ({ setState }) => {
            dontPanicSession!.setSession({
              ...dontPanicSession!.getSession(),
              name,
            })
            setState({ name })
          },
          setLastName: (lastName) => ({ setState }) => {
            dontPanicSession!.setSession({
              ...dontPanicSession!.getSession(),
              lastName,
            })
            setState({ lastName })
          },
          setEmail: (email) => ({ setState }) => {
            dontPanicSession!.setSession({
              ...dontPanicSession!.getSession(),
              email,
            })
            setState({ email })
          },
          setCurrentInsurer: (currentInsurer) => ({ setState }) => {
            dontPanicSession!.setSession({
              ...dontPanicSession!.getSession(),
              currentInsurer,
            })
            setState({ currentInsurer })
          },
          setSessionId: (sessionId) => ({ setState }) => {
            dontPanicSession!.setSession({
              ...dontPanicSession!.getSession(),
              sessionId,
            })
            setState({ sessionId })
          },
          makeChatActive: () => ({ setState }) => {
            dontPanicSession!.setSession({
              ...dontPanicSession!.getSession(),
              isChatActive: true,
            })
            setState({ isChatActive: true })
          },
          selectPremadeQuestion: (selectedPremadeQuestion) => ({
            setState,
          }) => {
            dontPanicSession!.setSession({
              ...dontPanicSession!.getSession(),
              selectedPremadeQuestion,
            })
            setState({ selectedPremadeQuestion })
          },
        }}
        {...props}
      />
    )}
  </StorageContainer>
)
