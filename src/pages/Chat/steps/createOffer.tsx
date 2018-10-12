import * as React from 'react'
import {
  CreateOfferContainer,
  getCreateOfferVariablesFromChatState,
} from '../containers/CreateOfferContainer'
import { OfferCreationSubscription } from '../containers/OfferCreationSubscription'
import { mockState } from '../utils/test-utils'
import { SessionContainer } from '../../../containers/SessionContainer'

export const CreateOffer: React.SFC = () => (
  <SessionContainer>
    {(sessionToken) => (
      <OfferCreationSubscription>
        {(subscriptionMaybe) => (
          <>
            <CreateOfferContainer>
              {(createOffer, { called }) => (
                <>
                  <button
                    onClick={() =>
                      createOffer(
                        getCreateOfferVariablesFromChatState(mockState()),
                      )
                    }
                  />
                  <div>
                    {subscriptionMaybe
                      ? subscriptionMaybe.offer.status
                      : called || !sessionToken
                        ? 'loading'
                        : null}
                  </div>
                </>
              )}
            </CreateOfferContainer>
          </>
        )}
      </OfferCreationSubscription>
    )}
  </SessionContainer>
)
