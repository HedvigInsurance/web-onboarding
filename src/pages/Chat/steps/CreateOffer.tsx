import * as React from 'react'
import { SessionContainer } from '../../../containers/SessionContainer'
import {
  CreateOfferContainer,
  getCreateOfferVariablesFromChatState,
} from '../containers/CreateOfferContainer'
import { OfferCreationSubscription } from '../containers/OfferCreationSubscription'
import { ChatContainer } from '../state'

export const CreateOffer: React.SFC = () => (
  <SessionContainer>
    {(sessionToken) =>
      !sessionToken ? (
        'loading'
      ) : (
        <ChatContainer>
          {(chatState) => (
            <OfferCreationSubscription>
              {(subscriptionMaybe) => (
                <>
                  <CreateOfferContainer>
                    {(createOffer, { called }) => (
                      <>
                        <button
                          onClick={() =>
                            createOffer(
                              getCreateOfferVariablesFromChatState(chatState),
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
        </ChatContainer>
      )
    }
  </SessionContainer>
)
