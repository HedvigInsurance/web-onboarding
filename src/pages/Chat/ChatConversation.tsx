import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { Mufflable } from 'components/animations/Mufflable'
import { ChatMessage } from 'components/hedvig/chat'
import { Conversation, Message } from 'components/hedvig/conversation'
import * as React from 'react'
import { ChatContainer, ChatStep } from './state'
import { AddressInput } from './steps/AddressInput'
import { AgeInput } from './steps/AgeInput'
import { CreateOffer } from './steps/CreateOffer'
import { CurrentInsuranceInput } from './steps/CurrentInsuranceInput'
import { Greet } from './steps/Greet'
import { InsuranceTypeInput } from './steps/InsuranceTypeInput'
import { NameInput } from './steps/NameInput'
import { NumberOfPeopleInput } from './steps/NumberOfPeopleInput'

export const ChatConversation: React.SFC = () => (
  <ChatContainer>
    {({
      initialVisibleSteps,
      visibleSteps,
      currentStep,
      goToStep,
      livingSituation,
      currentInsurance,
    }) => (
      <Conversation<ChatStep>
        initialVisibleSteps={initialVisibleSteps}
        visibleSteps={visibleSteps}
        currentStep={currentStep}
      >
        <Message id={ChatStep.INITIAL}>
          {({ appear }) => (
            <Mufflable
              muffled={
                ![
                  ChatStep.INITIAL,
                  ChatStep.NAME_INPUT,
                  ChatStep.AGE_INPUT,
                ].includes(currentStep)
              }
            >
              <ChatMessage
                appear={appear}
                typingDuration={2500}
                onTyped={() => goToStep(ChatStep.NAME_INPUT)}
              >
                <TranslationsConsumer textKey="CHAT_HEDVIG_FIRST_GREET">
                  {(firstGreet) => firstGreet}
                </TranslationsConsumer>
              </ChatMessage>
            </Mufflable>
          )}
        </Message>
        <Message delay={500} id={ChatStep.NAME_INPUT}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.NAME_INPUT}
              direction="right"
            >
              <NameInput
                onSubmit={() => goToStep(ChatStep.AGE_INPUT)}
                appear={appear}
                isCurrentMessage={currentStep === ChatStep.NAME_INPUT}
              />
            </Mufflable>
          )}
        </Message>
        <Message id={ChatStep.AGE_INPUT}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.AGE_INPUT}
              direction="right"
            >
              <AgeInput
                onSubmit={() => goToStep(ChatStep.GREET)}
                appear={appear}
                isCurrentMessage={currentStep === ChatStep.AGE_INPUT}
              />
            </Mufflable>
          )}
        </Message>

        <Message id={ChatStep.GREET}>
          {({ appear }) => (
            <Mufflable
              muffled={
                ![
                  ChatStep.GREET,
                  ChatStep.ADDRESS_INPUT,
                  ChatStep.INSURANCE_TYPE_INPUT,
                  ChatStep.NUMBER_OF_PEOPLE,
                ].includes(currentStep)
              }
            >
              <Greet
                appear={appear}
                onTyped={() => goToStep(ChatStep.ADDRESS_INPUT)}
              />
            </Mufflable>
          )}
        </Message>

        <Message id={ChatStep.ADDRESS_INPUT}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.ADDRESS_INPUT}
              direction="right"
            >
              <AddressInput
                appear={appear}
                isCurrentMessage={currentStep === ChatStep.ADDRESS_INPUT}
                onSubmit={() => goToStep(ChatStep.INSURANCE_TYPE_INPUT)}
              />
            </Mufflable>
          )}
        </Message>
        <Message id={ChatStep.INSURANCE_TYPE_INPUT}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.INSURANCE_TYPE_INPUT}
              direction="right"
            >
              <InsuranceTypeInput
                appear={appear}
                isCurrentMessage={currentStep === ChatStep.INSURANCE_TYPE_INPUT}
                onSubmit={() => goToStep(ChatStep.NUMBER_OF_PEOPLE)}
              />
            </Mufflable>
          )}
        </Message>
        <Message id={ChatStep.NUMBER_OF_PEOPLE}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.NUMBER_OF_PEOPLE}
              direction="right"
            >
              <NumberOfPeopleInput
                appear={appear}
                isCurrentMessage={currentStep === ChatStep.NUMBER_OF_PEOPLE}
                onSubmit={() => goToStep(ChatStep.CURRENT_INSURANCE_QUESTION)}
              />
            </Mufflable>
          )}
        </Message>

        <Message id={ChatStep.CURRENT_INSURANCE_QUESTION}>
          {({ appear }) => (
            <Mufflable
              muffled={
                ![
                  ChatStep.CURRENT_INSURANCE_QUESTION,
                  ChatStep.CURRENT_INSURANCE_INPUT,
                ].includes(currentStep)
              }
            >
              <ChatMessage
                appear={appear}
                onTyped={() => goToStep(ChatStep.CURRENT_INSURANCE_INPUT)}
              >
                <TranslationsConsumer
                  textKey={
                    livingSituation.numberOfPeople > 1
                      ? 'CHAT_HEDVIG_CURRENT_INSURANCE_QUESTION_PLURAL'
                      : 'CHAT_HEDVIG_CURRENT_INSURANCE_QUESTION_SINGULAR'
                  }
                >
                  {(t) => t}
                </TranslationsConsumer>
              </ChatMessage>
            </Mufflable>
          )}
        </Message>
        <Message id={ChatStep.CURRENT_INSURANCE_INPUT} delay={300}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.CURRENT_INSURANCE_INPUT}
              direction="right"
            >
              <CurrentInsuranceInput
                appear={appear}
                onSubmit={() => goToStep(ChatStep.SHOW_OFFER_QUESTION)}
                isCurrentMessage={
                  currentStep === ChatStep.CURRENT_INSURANCE_INPUT
                }
              />
            </Mufflable>
          )}
        </Message>

        <Message id={ChatStep.SHOW_OFFER_QUESTION}>
          {({ appear }) => (
            <Mufflable
              muffled={
                ![ChatStep.SHOW_OFFER_QUESTION, ChatStep.SHOW_OFFER].includes(
                  currentStep,
                )
              }
            >
              <ChatMessage
                appear={appear}
                onTyped={() => goToStep(ChatStep.SHOW_OFFER)}
              >
                <TranslationsConsumer
                  textKey={
                    currentInsurance.hasCurrentInsurance
                      ? 'CHAT_HEDVIG_SHOW_OFFER_HAS_INSURANCE'
                      : 'CHAT_HEDVIG_SHOW_OFFER_NO_INSURANCE'
                  }
                >
                  {(t) => t}
                </TranslationsConsumer>
              </ChatMessage>
            </Mufflable>
          )}
        </Message>
        <Message id={ChatStep.SHOW_OFFER} delay={500}>
          {() => (
            <Mufflable
              muffled={currentStep !== ChatStep.SHOW_OFFER}
              direction="right"
            >
              <CreateOffer />
            </Mufflable>
          )}
        </Message>
      </Conversation>
    )}
  </ChatContainer>
)
