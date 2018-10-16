import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { FadeIn } from 'components/animations/appearings'
import { Button } from 'components/buttons'
import * as React from 'react'
import styled from 'react-emotion'
import { SessionContainer } from '../../../containers/SessionContainer'
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
      !sessionToken ? null : (
        <FadeIn>
          <ChatContainer>
            {(chatState) => (
              <OfferCreationSubscription>
                {(subscriptionMaybe) => (
                  <>
                    <CreateOfferContainer>
                      {(createOffer, { called }) => (
                        <Wrapper>
                          <CreateOfferCtaWrapper>
                            <Button
                              background={colors.GREEN}
                              foreground={colors.WHITE}
                              onClick={() =>
                                createOffer(
                                  getCreateOfferVariablesFromChatState(
                                    chatState,
                                  ),
                                )
                              }
                            >
                              <TranslationsConsumer textKey="CHAT_INPUT_CREATE_OFFER">
                                {(text) => text}
                              </TranslationsConsumer>
                            </Button>
                            <div>
                              {subscriptionMaybe
                                ? subscriptionMaybe.offer.status
                                : called || !sessionToken
                                  ? 'loading'
                                  : null}
                            </div>
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
