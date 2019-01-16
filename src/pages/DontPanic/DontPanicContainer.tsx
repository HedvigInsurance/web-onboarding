import { StorageContainer } from '../../utils/StorageContainer'
import { Container } from 'constate'
import * as React from 'react'

export interface Step {
  id: string
  isHedvig: boolean
}

interface State {
  steps: ReadonlyArray<Step>
  initialVisibleSteps: ReadonlyArray<Step>
  name?: string
  currentInsurer?: string
  sessionId?: string
}

interface Effects {
  goToStep: (step: Step) => void
  setName: (name: string) => void
  setCurrentInsurer: (currentInsurer: string) => void
  setSessionId: (sessionId: string) => void
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
          currentInsurer:
            (dontPanicSession!.getSession() &&
              dontPanicSession!.getSession().currentInsurer) ||
            'NO',
          sessionId:
            dontPanicSession!.getSession() &&
            dontPanicSession!.getSession().sessionId,
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
        }}
        {...props}
      />
    )}
  </StorageContainer>
)
