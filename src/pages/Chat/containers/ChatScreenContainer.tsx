import { ActionMap, Container } from 'constate'
import * as React from 'react'

const DEBOUNCE_DELAY = 5000

export enum LoadingState {
  NOT_LOADING,
  LOADING,
  COMPLETED,
}

interface State {
  debounceLoadingTimer?: number
  offerCreationDebounceState: LoadingState
  offerCreationLoadingState: LoadingState
}
interface Actions {
  beginCreateOffer: () => void
  createOfferSuccess: () => void
}
interface Effects {
  beginDebounce: () => void
  abortDebounce: () => void
}

export type ChatState = State & Actions & Effects

export interface ChatContainerProps {
  children: (state: ChatState) => React.ReactNode
}

export const ChatScreenContainer: React.SFC<ChatContainerProps> = ({
  children,
}) => (
  <Container<State, ActionMap<State, Actions>, {}, Effects>
    initialState={{
      offerCreationDebounceState: LoadingState.NOT_LOADING,
      offerCreationLoadingState: LoadingState.NOT_LOADING,
    }}
    actions={{
      beginCreateOffer: () => ({
        offerCreationLoadingState: LoadingState.LOADING,
      }),
      createOfferSuccess: () => ({
        offerCreationLoadingState: LoadingState.COMPLETED,
      }),
    }}
    effects={{
      beginDebounce: () => ({ setState }) => {
        const debounceLoadingTimer = window.setTimeout(() => {
          setState({
            offerCreationDebounceState: LoadingState.COMPLETED,
            debounceLoadingTimer: undefined,
          })
        }, DEBOUNCE_DELAY)
        setState({
          debounceLoadingTimer,
          offerCreationDebounceState: LoadingState.LOADING,
        })
      },
      abortDebounce: () => ({ state, setState }) => {
        if (!state.debounceLoadingTimer) {
          return
        }
        clearTimeout(state.debounceLoadingTimer)
        setState({
          debounceLoadingTimer: undefined,
          offerCreationDebounceState: LoadingState.NOT_LOADING,
        })
      },
    }}
    context="chatScreen"
    children={children}
  />
)
