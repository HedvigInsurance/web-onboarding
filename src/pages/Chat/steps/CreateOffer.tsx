import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { FadeIn } from 'components/animations/appearings'
import { Button } from 'components/buttons'
import { SessionContainer } from 'containers/SessionContainer'
import * as React from 'react'
import styled from 'react-emotion'
import { Update } from 'react-lifecycle-components'
import {
  ChatScreenContainer,
  LoadingState,
} from '../containers/ChatScreenContainer'
import {
  CreateOfferContainer,
  getCreateOfferVariablesFromChatState,
} from '../containers/CreateOfferContainer'
import { OfferCreationSubscription } from '../containers/OfferCreationSubscription'
import { ChatContainer, State as ChatState } from '../state'
import { isAddressDone } from './AddressInput'
import { isAgeDone } from './AgeInput'
import { isCurrentInsuranceDone } from './CurrentInsuranceInput'
import { isInsuranceTypeDone } from './InsuranceTypeInput'
import { isNameDone } from './NameInput'
import { isNumberOfPeopleDone } from './NumberOfPeopleInput'

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

const canSubmit = (chatState: ChatState) =>
  isAddressDone(chatState.livingSituation) &&
  isAgeDone(chatState.nameAge) &&
  isCurrentInsuranceDone(chatState.currentInsurance) &&
  isInsuranceTypeDone(chatState.livingSituation) &&
  isNameDone(chatState.nameAge) &&
  isNumberOfPeopleDone(chatState.livingSituation)

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
                              }}
                              was={(_, newWatched) => {
                                if (
                                  newWatched.called &&
                                  newWatched.data &&
                                  newWatched.data.offer.status === 'SUCCESS'
                                ) {
                                  chatScreenState.createOfferSuccess()
                                }
                              }}
                            >
                              <Wrapper>
                                <CreateOfferCtaWrapper>
                                  <Button
                                    background={colors.GREEN}
                                    foreground={colors.WHITE}
                                    disabled={
                                      !canSubmit(chatState) ||
                                      chatScreenState.offerCreationDebounceState ===
                                        LoadingState.LOADING ||
                                      chatScreenState.offerCreationLoadingState ===
                                        LoadingState.LOADING
                                    }
                                    onClick={() => {
                                      if (!canSubmit(chatState)) {
                                        return
                                      }
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
