import * as React from 'react'
import { Mount } from 'react-lifecycle-components'
import { Redirect } from 'react-router-dom'
import { OfferContainer } from '../../../containers/OfferContainer'
import { StorageContainer } from '../../../utils/StorageContainer'
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
        return (
          <OfferContainer>
            {(offer, { refetch }) => {
              if (offer && offer.insurance.type) {
                return <Redirect to="/new-member/offer" />
              }

              return (
                <Mount
                  on={() => {
                    refetch()
                  }}
                >
                  <LoadingScreen appear />
                </Mount>
              )
            }}
          </OfferContainer>
        )
      }

      return (
        <StorageContainer>
          {(storage) => {
            if (
              storage.session.getSession() &&
              storage.session.getSession()!.token
            ) {
              return (
                <OfferContainer>
                  {(offer) => {
                    if (offer && offer.insurance.type) {
                      return <Redirect to="/new-member/offer" />
                    }

                    return null
                  }}
                </OfferContainer>
              )
            }

            return null
          }}
        </StorageContainer>
      )
    }}
  </ChatScreenContainer>
)
