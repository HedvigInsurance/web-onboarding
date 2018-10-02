import { ActionMap, Container, EffectMap } from 'constate'
import { defaultTo, filter, pathOr, pipe, propOr } from 'ramda'
import * as React from 'react'

export type EventListener = (payload: any) => void

interface ListenerMap {
  [event: string]: EventListener[]
}

interface PubSubHubState {
  listeners: ListenerMap
}

interface PubSubHubActions {
  addListener: (event: string, listener: EventListener) => void
  removeListener: (event: string, listener: EventListener) => void
}

interface PubSubHubEffects {
  fire: (event: string, payload: any) => void
}

export interface PubSubHubChildProps {
  addListener: PubSubHubActions['addListener']
  removeListener: PubSubHubActions['removeListener']
  fire: PubSubHubEffects['fire']
}

interface PubSubHubProps {
  context?: string
  children: (props: PubSubHubChildProps) => React.ReactNode
}

// Using a class to get the component generic
export class PubSubHub extends React.PureComponent<PubSubHubProps> {
  public render() {
    return (
      <Container<
        PubSubHubState,
        ActionMap<PubSubHubState, PubSubHubActions>,
        {},
        EffectMap<PubSubHubState, PubSubHubEffects>
      >
        initialState={{ listeners: {} }}
        actions={{
          addListener: (event, listener) => ({ listeners }) => ({
            listeners: {
              ...listeners,
              [event]: [
                ...propOr<EventListener[], ListenerMap, EventListener[]>(
                  [],
                  event,
                  listeners,
                ),
                listener,
              ],
            },
          }),
          removeListener: (event, listenerToRemove) => ({ listeners }) => ({
            listeners: {
              ...listeners,
              [event]: pipe<ListenerMap, EventListener[], EventListener[]>(
                propOr([], event),
                filter(
                  (listener: EventListener) => listener !== listenerToRemove,
                ),
              )(listeners),
            },
          }),
        }}
        effects={
          // tslint:disable-next-line no-object-literal-type-assertion
          ({
            fire: (event, payload) => ({ state }) => {
              ;(pathOr<EventListener[]>(
                [],
                ['listeners', event],
                state,
              ) as EventListener[]).forEach((listener) => listener(payload))
            },
          } as EffectMap<PubSubHubState, PubSubHubEffects>) as any
        }
        context={defaultTo('pubSub', this.props.context)}
      >
        {({ addListener, removeListener, fire }) =>
          this.props.children({ addListener, removeListener, fire })
        }
      </Container>
    )
  }
}
