import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { ChatMessage } from 'components/hedvig/chat'
import { Conversation, Message } from 'components/hedvig/conversation'
import * as React from 'react'
import { ChatContainer, ChatStep } from './state'
import { AddressInput } from './steps/AddressInput'
import { AgeInput } from './steps/AgeInput'
import { ApartmentTypeInput } from './steps/ApartmentTypeInput'
import { CreateOffer } from './steps/CreateOffer'
import { CurrentInsuranceInput } from './steps/CurrentInsuranceInput'
import { Greet } from './steps/Greet'
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
    }) => (
      <Conversation<ChatStep>
        initialVisibleSteps={initialVisibleSteps}
        visibleSteps={visibleSteps}
        currentStep={currentStep}
      >
        <Message id={ChatStep.INITIAL}>
          {({ appear }) => (
            <ChatMessage
              appear={appear}
              typingDuration={2500}
              onTyped={() => goToStep(ChatStep.NAME_INPUT)}
            >
              <TranslationsConsumer textKey="CHAT_HEDVIG_FIRST_GREET">
                {(firstGreet) => firstGreet}
              </TranslationsConsumer>
            </ChatMessage>
          )}
        </Message>
        <Message delay={500} id={ChatStep.NAME_INPUT}>
          {({ appear }) => (
            <NameInput
              onSubmit={() => goToStep(ChatStep.AGE_INPUT)}
              appear={appear}
              isCurrentMessage={currentStep === ChatStep.NAME_INPUT}
            />
          )}
        </Message>
        <Message id={ChatStep.AGE_INPUT}>
          {({ appear }) => (
            <AgeInput
              onSubmit={() => goToStep(ChatStep.GREET)}
              appear={appear}
              isCurrentMessage={currentStep === ChatStep.AGE_INPUT}
            />
          )}
        </Message>

        <Message id={ChatStep.GREET}>
          {({ appear }) => (
            <Greet
              appear={appear}
              onTyped={() => goToStep(ChatStep.ADDRESS_INPUT)}
            />
          )}
        </Message>

        <Message id={ChatStep.ADDRESS_INPUT}>
          {({ appear }) => (
            <AddressInput
              appear={appear}
              isCurrentMessage={currentStep === ChatStep.ADDRESS_INPUT}
              onSubmit={() => goToStep(ChatStep.APARTMENT_TYPE_INPUT)}
            />
          )}
        </Message>
        <Message id={ChatStep.APARTMENT_TYPE_INPUT}>
          {({ appear }) => (
            <ApartmentTypeInput
              appear={appear}
              isCurrentMessage={currentStep === ChatStep.APARTMENT_TYPE_INPUT}
              onSubmit={() => goToStep(ChatStep.NUMBER_OF_PEOPLE)}
            />
          )}
        </Message>
        <Message id={ChatStep.NUMBER_OF_PEOPLE}>
          {({ appear }) => (
            <NumberOfPeopleInput
              appear={appear}
              isCurrentMessage={currentStep === ChatStep.NUMBER_OF_PEOPLE}
              onSubmit={() => goToStep(ChatStep.CURRENT_INSURANCE_QUESTION)}
            />
          )}
        </Message>

        <Message id={ChatStep.CURRENT_INSURANCE_QUESTION}>
          {({ appear }) => (
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
          )}
        </Message>
        <Message id={ChatStep.CURRENT_INSURANCE_INPUT} delay={300}>
          {({ appear }) => (
            <CurrentInsuranceInput
              appear={appear}
              onSubmit={() => goToStep(ChatStep.SHOW_OFFER)}
              isCurrentMessage={
                currentStep === ChatStep.CURRENT_INSURANCE_INPUT
              }
            />
          )}
        </Message>
        <Message id={ChatStep.SHOW_OFFER}>{() => <CreateOffer />}</Message>
      </Conversation>
    )}
  </ChatContainer>
)
