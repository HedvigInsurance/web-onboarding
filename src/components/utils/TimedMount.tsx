import { Container, EffectProps, StateUpdater } from 'constate'
import * as React from 'react'
import { Mount, Unmount } from 'react-lifecycle-components'
import { createTimer, Timer } from '../../utils/timer'

interface State {
  hasFired: boolean
  timer?: Timer
}

interface Effects {
  abort: () => StateUpdater<State>
  initiateTimer: () => (props: EffectProps<State>) => void
}

interface Props {
  duration: number
  children: (props: { hasFired: boolean }) => React.ReactNode
  onFire?: () => void
}

export const TimedMount: React.SFC<Props> = ({
  children,
  duration,
  onFire,
}) => (
  <Container<State, {}, {}, Effects>
    initialState={{ hasFired: !duration }}
    effects={
      {
        abort: () => ({ state }: EffectProps<State>) => {
          if (state.timer) {
            state.timer.abort()
          }
        },
        initiateTimer: () => ({ setState }: EffectProps<State>) => {
          setState(() => ({
            timer: createTimer(duration)(() => {
              if (onFire) {
                onFire()
              }
              setState({ hasFired: true })
            }),
          }))
        },
      } as any // `effects` are incorrectly typed in the lib
    }
  >
    {({ hasFired, initiateTimer, abort }: State & Actions & Effects) => (
      <Mount on={initiateTimer}>
        <Unmount on={abort}>{children({ hasFired })}</Unmount>
      </Mount>
    )}
  </Container>
)
