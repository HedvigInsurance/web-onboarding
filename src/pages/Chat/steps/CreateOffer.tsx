import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { FadeIn } from 'components/animations/appearings'
import { Button } from 'components/buttons'
import * as React from 'react'
import styled from 'react-emotion'
import { Unmount, Update } from 'react-lifecycle-components'
import { SessionContainer } from '../../../containers/SessionContainer'
import {
  ChatScreenContainer,
  LoadingState,
} from '../containers/ChatScreenContainer'
import {
  CreateOfferContainer,
  getCreateOfferVariablesFromChatState,
} from '../containers/CreateOfferContainer'
import { OfferCreationSubscription } from '../containers/OfferCreationSubscription'
import { ChatContainer } from '../state'

const Wrapper = styled('div')({
  paddingTop: 60,
})
const CreateOfferCtaWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
})
const GdprWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})
const GdprLink = styled('a')({
  color: colors.PURPLE,
  textDecoration: 'none',
  fontSize: 12,
})

export const CreateOffer: React.SFC = () => (
  <SessionContainer>
    {(sessionToken) =>
      !sessionToken ? (
        <div />
      ) : (
        <FadeIn>
          <ChatContainer>
            {(chatState) => (
              <OfferCreationSubscription>
                {(subscriptionMaybe) => (
                  <>
                    <CreateOfferContainer>
                      {(createOffer, createOfferProps) => (
                        <ChatScreenContainer>
                          {(chatScreenState) => (
                            <Update
                              watched={{
                                called: createOfferProps.called,
                                data: subscriptionMaybe,
                                hasSessionToken: Boolean(sessionToken),
                              }}
                              was={(_, newWatched) => {
                                if (
                                  newWatched.called &&
                                  newWatched.data &&
                                  newWatched.data.offer.status === 'SUCCESS'
                                ) {
                                  chatScreenState.createOfferSuccess()
                                }

                                if (
                                  newWatched.called &&
                                  !newWatched.data &&
                                  chatScreenState.offerCreationDebounceState !==
                                    LoadingState.LOADING
                                ) {
                                  chatScreenState.beginDebounce()
                                  return
                                }
                              }}
                            >
                              <Unmount
                                on={() => {
                                  chatScreenState.abortDebounce()
                                }}
                              >
                                <Wrapper>
                                  <CreateOfferCtaWrapper>
                                    <Button
                                      background={colors.GREEN}
                                      foreground={colors.WHITE}
                                      disabled={
                                        chatScreenState.offerCreationDebounceState ===
                                          LoadingState.LOADING ||
                                        chatScreenState.offerCreationLoadingState ===
                                          LoadingState.LOADING
                                      }
                                      onClick={() => {
                                        chatScreenState.beginDebounce()
                                        createOffer(
                                          getCreateOfferVariablesFromChatState(
                                            chatState,
                                          ),
                                        )
                                      }}
                                    >
                                      <TranslationsConsumer textKey="CHAT_INPUT_CREATE_OFFER">
                                        {(text) => text}
                                      </TranslationsConsumer>
                                    </Button>
                                  </CreateOfferCtaWrapper>
                                  <GdprWrapper>
                                    <TranslationsConsumer textKey="CHAT_INPUT_PERSONAL_DATA_LINK">
                                      {(link) => (
                                        <GdprLink href={link} target="_blank">
                                          <TranslationsConsumer textKey="CHAT_INPUT_PERSONAL_DATA_LABEL">
                                            {(t) => t}
                                          </TranslationsConsumer>
                                        </GdprLink>
                                      )}
                                    </TranslationsConsumer>
                                  </GdprWrapper>
                                </Wrapper>
                              </Unmount>
                            </Update>
                          )}
                        </ChatScreenContainer>
                      )}
                    </CreateOfferContainer>
                  </>
                )}
              </OfferCreationSubscription>
            )}
          </ChatContainer>
        </FadeIn>
      )
    }
  </SessionContainer>
)
