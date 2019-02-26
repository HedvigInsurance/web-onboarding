import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { Mufflable } from 'components/animations/Mufflable'
import { ChatMessage } from 'components/hedvig/chat'
import { Conversation, Message } from 'components/hedvig/conversation'
import * as React from 'react'
import {
  ApplicationSpecificEvents,
  getUtmParamsFromCookie,
  TrackAction,
} from 'utils/tracking'
import {
  getTrafficSource,
  TrafficSourceConsumer,
} from '../../utils/storage/trafficSource'
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
      peekStep,
      unpeek,
      currentlyPeeking,
      goToStep,
      nameAge,
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
                isCurrentMessage={[
                  ChatStep.INITIAL,
                  ChatStep.NAME_INPUT,
                  ChatStep.AGE_INPUT,
                ].includes(currentStep)}
                onTyped={() => goToStep(ChatStep.NAME_INPUT)}
              >
                <TrafficSourceConsumer>
                  {({ trafficSourceStorage }) => (
                    <TranslationsConsumer
                      textKey={
                        getTrafficSource(trafficSourceStorage!) === 'Minut'
                          ? 'CHAT_HEDVIG_FIRST_GREET_MINUT'
                          : 'CHAT_HEDVIG_FIRST_GREET'
                      }
                    >
                      {(firstGreet) => firstGreet}
                    </TranslationsConsumer>
                  )}
                </TrafficSourceConsumer>
              </ChatMessage>
            </Mufflable>
          )}
        </Message>

        <Message id={ChatStep.INITIAL_NAME}>
          {({ appear }) => (
            <Mufflable
              muffled={
                ![
                  ChatStep.INITIAL_NAME,
                  ChatStep.NAME_INPUT,
                  ChatStep.AGE_INPUT,
                ].includes(currentStep)
              }
            >
              <ChatMessage
                appear={appear}
                typingDuration={2500}
                isCurrentMessage={[
                  ChatStep.INITIAL_NAME,
                  ChatStep.NAME_INPUT,
                  ChatStep.AGE_INPUT,
                ].includes(currentStep)}
                onTyped={() => goToStep(ChatStep.NAME_INPUT)}
              >
                <TranslationsPlaceholderConsumer
                  textKey="CHAT_HEDVIG_FIRST_GREET_NAME"
                  replacements={{ name: nameAge.firstName }}
                >
                  {(t) => t}
                </TranslationsPlaceholderConsumer>
              </ChatMessage>
            </Mufflable>
          )}
        </Message>

        <Message delay={500} id={ChatStep.NAME_INPUT}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.NAME_INPUT}
              unMuffled={currentlyPeeking === ChatStep.NAME_INPUT}
              unMufflable
              direction="right"
            >
              <TrackAction
                event={{
                  name: ApplicationSpecificEvents.COMPLETED,
                  properties: {
                    category: 'web-onboarding-steps',
                    label: 'name',
                    ...getUtmParamsFromCookie(),
                  },
                }}
              >
                {({ track }) => (
                  <NameInput
                    onSubmit={() => {
                      track()
                      goToStep(ChatStep.AGE_INPUT)
                    }}
                    appear={appear}
                    isCurrentMessage={currentStep === ChatStep.NAME_INPUT}
                    onFocus={() => peekStep(ChatStep.NAME_INPUT)}
                    onBlur={() => unpeek()}
                  />
                )}
              </TrackAction>
            </Mufflable>
          )}
        </Message>
        <Message id={ChatStep.AGE_INPUT}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.AGE_INPUT}
              unMuffled={currentlyPeeking === ChatStep.AGE_INPUT}
              unMufflable
              direction="right"
            >
              <TrackAction
                event={{
                  name: ApplicationSpecificEvents.COMPLETED,
                  properties: {
                    category: 'web-onboarding-steps',
                    label: 'age',
                    ...getUtmParamsFromCookie(),
                  },
                }}
              >
                {({ track }) => (
                  <AgeInput
                    onSubmit={() => {
                      track()
                      goToStep(ChatStep.GREET)
                    }}
                    appear={appear}
                    isCurrentMessage={currentStep === ChatStep.AGE_INPUT}
                    onFocus={() => peekStep(ChatStep.AGE_INPUT)}
                    onBlur={() => unpeek()}
                  />
                )}
              </TrackAction>
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
                isCurrentMessage={[
                  ChatStep.GREET,
                  ChatStep.ADDRESS_INPUT,
                  ChatStep.INSURANCE_TYPE_INPUT,
                  ChatStep.NUMBER_OF_PEOPLE,
                ].includes(currentStep)}
                onTyped={() => goToStep(ChatStep.ADDRESS_INPUT)}
              />
            </Mufflable>
          )}
        </Message>

        <Message id={ChatStep.ADDRESS_INPUT}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.ADDRESS_INPUT}
              unMuffled={currentlyPeeking === ChatStep.ADDRESS_INPUT}
              unMufflable
              direction="right"
            >
              <TrackAction
                event={{
                  name: ApplicationSpecificEvents.COMPLETED,
                  properties: {
                    category: 'web-onboarding-steps',
                    label: 'address',
                    ...getUtmParamsFromCookie(),
                  },
                }}
              >
                {({ track }) => (
                  <AddressInput
                    appear={appear}
                    isCurrentMessage={currentStep === ChatStep.ADDRESS_INPUT}
                    onSubmit={() => {
                      track()
                      goToStep(ChatStep.INSURANCE_TYPE_INPUT)
                    }}
                    onFocus={() => peekStep(ChatStep.ADDRESS_INPUT)}
                    onBlur={() => unpeek()}
                  />
                )}
              </TrackAction>
            </Mufflable>
          )}
        </Message>
        <Message id={ChatStep.INSURANCE_TYPE_INPUT}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.INSURANCE_TYPE_INPUT}
              unMuffled={currentlyPeeking === ChatStep.INSURANCE_TYPE_INPUT}
              unMufflable
              direction="right"
            >
              <TrackAction
                event={{
                  name: ApplicationSpecificEvents.COMPLETED,
                  properties: {
                    category: 'web-onboarding-steps',
                    label: 'insurance-type',
                    ...getUtmParamsFromCookie(),
                  },
                }}
              >
                {({ track }) => (
                  <InsuranceTypeInput
                    appear={appear}
                    isCurrentMessage={
                      currentStep === ChatStep.INSURANCE_TYPE_INPUT
                    }
                    onSubmit={() => {
                      track()
                      goToStep(ChatStep.NUMBER_OF_PEOPLE)
                    }}
                    onFocus={() => peekStep(ChatStep.INSURANCE_TYPE_INPUT)}
                    onBlur={() => unpeek()}
                  />
                )}
              </TrackAction>
            </Mufflable>
          )}
        </Message>
        <Message id={ChatStep.NUMBER_OF_PEOPLE}>
          {({ appear }) => (
            <Mufflable
              muffled={currentStep !== ChatStep.NUMBER_OF_PEOPLE}
              unMuffled={currentlyPeeking === ChatStep.NUMBER_OF_PEOPLE}
              unMufflable
              direction="right"
            >
              <TrackAction
                event={{
                  name: ApplicationSpecificEvents.COMPLETED,
                  properties: {
                    category: 'web-onboarding-steps',
                    label: 'number-of-people',
                    ...getUtmParamsFromCookie(),
                  },
                }}
              >
                {({ track }) => (
                  <NumberOfPeopleInput
                    appear={appear}
                    isCurrentMessage={currentStep === ChatStep.NUMBER_OF_PEOPLE}
                    onSubmit={() => {
                      track()
                      goToStep(ChatStep.CURRENT_INSURANCE_QUESTION)
                    }}
                    onFocus={() => peekStep(ChatStep.NUMBER_OF_PEOPLE)}
                    onBlur={() => unpeek()}
                  />
                )}
              </TrackAction>
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
                isCurrentMessage={[
                  ChatStep.CURRENT_INSURANCE_QUESTION,
                  ChatStep.CURRENT_INSURANCE_INPUT,
                ].includes(currentStep)}
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
              unMuffled={currentlyPeeking === ChatStep.CURRENT_INSURANCE_INPUT}
              unMufflable
              direction="right"
            >
              <TrackAction
                event={{
                  name: ApplicationSpecificEvents.COMPLETED,
                  properties: {
                    category: 'web-onboarding-steps',
                    label: 'has-current-insurance',
                    ...getUtmParamsFromCookie(),
                  },
                }}
              >
                {({ track }) => (
                  <CurrentInsuranceInput
                    appear={appear}
                    onSubmit={() => {
                      track()
                      goToStep(ChatStep.SHOW_OFFER_QUESTION)
                    }}
                    onFocus={() => peekStep(ChatStep.CURRENT_INSURANCE_INPUT)}
                    onBlur={() => unpeek()}
                    isCurrentMessage={
                      currentStep === ChatStep.CURRENT_INSURANCE_INPUT
                    }
                  />
                )}
              </TrackAction>
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
                isCurrentMessage={[
                  ChatStep.SHOW_OFFER_QUESTION,
                  ChatStep.SHOW_OFFER,
                ].includes(currentStep)}
              >
                <TranslationsPlaceholderConsumer
                  textKey={
                    currentInsurance.hasCurrentInsurance
                      ? 'CHAT_HEDVIG_SHOW_OFFER_HAS_INSURANCE'
                      : 'CHAT_HEDVIG_SHOW_OFFER_NO_INSURANCE'
                  }
                  replacements={{
                    firstName: <span data-hj-supress>{nameAge.firstName}</span>,
                  }}
                >
                  {(t) => t}
                </TranslationsPlaceholderConsumer>
              </ChatMessage>
            </Mufflable>
          )}
        </Message>
        <Message id={ChatStep.SHOW_OFFER} delay={500}>
          {() => <CreateOffer />}
        </Message>
      </Conversation>
    )}
  </ChatContainer>
)
