import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { FadeIn } from 'components/animations/appearings'
import { Button } from 'components/buttons'
import { SessionContainer } from 'containers/SessionContainer'
import * as React from 'react'
import styled from 'react-emotion'
import { Update } from 'react-lifecycle-components'
import { qualifiesForStudentInsurance } from 'utils/insuranceDomainUtils'
import {
  InputValidationError,
  UserCheckbox,
} from '../../../components/userInput/UserResponse'
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
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
})
const CreateOfferCtaWrapperRow = styled('div')({
  paddingBottom: 20,
  maxWidth: '50%',
  textAlign: 'right',
})

const GdprWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 20,
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
                          {(chatScreenState) => {
                            const isQualifiedStudent = qualifiesForStudentInsurance(
                              {
                                numberOfPeople:
                                  chatState.livingSituation.numberOfPeople,
                                age: Number(chatState.nameAge.age),
                                squareMeters: Number(
                                  chatState.livingSituation.size,
                                ),
                              },
                            )
                            return (
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
                                    {(isQualifiedStudent ||
                                      chatState.isStudent !== undefined) && (
                                      <CreateOfferCtaWrapperRow>
                                        <UserCheckbox
                                          onChange={chatState.setIsStudent}
                                          checked={Boolean(
                                            isQualifiedStudent &&
                                              chatState.isStudent,
                                          )}
                                          disabled={!isQualifiedStudent}
                                          id="is-student-input"
                                        >
                                          <TranslationsConsumer textKey="CHAT_INPUT_IS_STUDENT_CHECKBOX_LABEL">
                                            {(t) => t}
                                          </TranslationsConsumer>
                                        </UserCheckbox>
                                        {!isQualifiedStudent &&
                                          chatState.isStudent && (
                                            <FadeIn>
                                              <InputValidationError>
                                                <TranslationsConsumer textKey="CHAT_INPUT_IS_STUDENT_INVALID">
                                                  {(t) => t}
                                                </TranslationsConsumer>
                                              </InputValidationError>
                                            </FadeIn>
                                          )}
                                      </CreateOfferCtaWrapperRow>
                                    )}
                                    <CreateOfferCtaWrapperRow>
                                      <Button
                                        background={colors.GREEN}
                                        foreground={colors.WHITE}
                                        size="lg"
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
                                    </CreateOfferCtaWrapperRow>
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
                            )
                          }}
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
