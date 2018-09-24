import { Container, EffectProps, StateUpdater } from 'constate'
import * as React from 'react'
import { Mount, Unmount } from 'react-lifecycle-components'
import { createTimer, Timer } from './timer'

interface State {
  hasFired: boolean
  timer?: Timer
}
interface Actions {
  abort: () => StateUpdater<State>
}

interface Effects {
  initiateTyping: () => (props: EffectProps<State>) => void
}

interface Props {
  duration: number
  children: (props: { hasFired: boolean }) => React.ReactNode
}

export const TimedMount: React.SFC<Props> = ({ children, duration }) => (
  <Container<State, Actions, {}, Effects>
    initialState={{ hasFired: !duration }}
    actions={{
      abort: () => (state) => {
        if (state.timer) {
          state.timer.abort()
        }
        return {}
      },
    }}
    effects={
      {
        initiateTyping: () => ({ setState }: EffectProps<State>) => {
          setState(() => ({
            timer: createTimer(duration)(() => setState({ hasFired: true })),
          }))
        },
      } as any
    }
  >
    {({ hasFired, initiateTyping, abort }: State & Actions & Effects) => (
      <Mount on={initiateTyping}>
        <Unmount on={abort}>{children({ hasFired })}</Unmount>
      </Mount>
    )}
  </Container>
)
