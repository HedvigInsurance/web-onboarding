import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { ChatMessage } from 'components/hedvig/chat'
import { Conversation, Message } from 'components/hedvig/conversation'
import * as React from 'react'
import { ChatContainer } from './state'
import { CurrentInsuranceInput } from './steps/CurrentInsuranceInput'
import { Greet } from './steps/Greet'
import { LivingSituationInput } from './steps/LivingSituationInput'
import { NameAgeInput } from './steps/NameAgeInput'

export const ChatConversation: React.SFC = () => (
  <ChatContainer>
    {({
      initialVisibleSteps,
      visibleSteps,
      currentStep,
      goToStep,
      livingSituation,
    }) => (
      <Conversation
        initialVisibleSteps={initialVisibleSteps}
        visibleSteps={visibleSteps}
        currentStep={currentStep}
      >
        <Message id="initial">
          {({ appear }) => (
            <ChatMessage
              appear={appear}
              typingDuration={2500}
              onTyped={() => goToStep('name-age-input')}
            >
              <TranslationsConsumer textKey="CHAT_FIRST_GREET">
                {(firstGreet) => firstGreet}
              </TranslationsConsumer>
            </ChatMessage>
          )}
        </Message>

        <Message delay={500} id="name-age-input">
          {({ appear }) => (
            <NameAgeInput
              onSubmit={() => goToStep('greet')}
              appear={appear}
              isCurrentMessage={currentStep === 'name-age-input'}
            />
          )}
        </Message>

        <Message id="greet">
          {({ appear }) => (
            <Greet
              appear={appear}
              onTyped={() => goToStep('living-situation-input')}
            />
          )}
        </Message>

        <Message id="living-situation-input" delay={300}>
          {({ appear }) => (
            <LivingSituationInput
              appear={appear}
              onSubmit={() => goToStep('current-insurance-question')}
              isCurrentMessage={currentStep === 'living-situation-input'}
            />
          )}
        </Message>

        <Message id="current-insurance-question">
          {({ appear }) => (
            <ChatMessage
              appear={appear}
              onTyped={() => goToStep('current-insurance-input')}
            >
              {livingSituation.numberOfPeople > 1
                ? 'Trevligt! Hoppas ni trivs. Har du någon hemförsäkring redan?'
                : 'Trevligt! Hoppas du trivs. Har du någon hemförsäkring redan?'}
            </ChatMessage>
          )}
        </Message>

        <Message id="current-insurance-input" delay={300}>
          {({ appear }) => (
            <CurrentInsuranceInput
              appear={appear}
              onSubmit={() => goToStep('show-offer')}
            />
          )}
        </Message>

        <Message id="show-offer">{() => 'Visa erbjudande'}</Message>
      </Conversation>
    )}
  </ChatContainer>
)
