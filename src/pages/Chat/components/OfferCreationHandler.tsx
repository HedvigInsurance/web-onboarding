import * as React from 'react'
import { Redirect } from 'react-router-dom'
import {
  ChatScreenContainer,
  LoadingState,
} from '../containers/ChatScreenContainer'
import { LoadingScreen } from './LoadingScreen'

export const OfferCreationHandler = () => (
  <ChatScreenContainer>
    {(state) => {
      if (
        state.offerCreationDebounceState === LoadingState.LOADING ||
        state.offerCreationLoadingState === LoadingState.LOADING
      ) {
        return <LoadingScreen />
      }

      if (
        state.offerCreationDebounceState === LoadingState.COMPLETED &&
        state.offerCreationLoadingState === LoadingState.COMPLETED
      ) {
        return <Redirect to="/offer" />
      }

      return null
    }}
  </ChatScreenContainer>
)
