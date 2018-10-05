import { ChatMessage } from 'components/hedvig/chat'
import { Conversation, Message } from 'components/hedvig/conversation'
import * as React from 'react'
import { ChatContainer, ChatStep } from './state'
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
              onTyped={() => goToStep(ChatStep.NAME_AGE_INPUT)}
            >
              Hej! Det är jag som är Hedvig! 👋 <br />
              Berätta om dig själv!
            </ChatMessage>
          )}
        </Message>

        <Message delay={500} id={ChatStep.NAME_AGE_INPUT}>
          {({ appear }) => (
            <NameAgeInput
              onSubmit={() => goToStep(ChatStep.GREET)}
              appear={appear}
              isCurrentMessage={currentStep === ChatStep.NAME_AGE_INPUT}
            />
          )}
        </Message>

        <Message id={ChatStep.GREET}>
          {({ appear }) => (
            <Greet
              appear={appear}
              onTyped={() => goToStep(ChatStep.LIVING_SITUATION_INPUT)}
            />
          )}
        </Message>

        <Message id={ChatStep.LIVING_SITUATION_INPUT} delay={300}>
          {({ appear }) => (
            <LivingSituationInput
              appear={appear}
              onSubmit={() => goToStep(ChatStep.CURRENT_INSURANCE_QUESTION)}
              isCurrentMessage={currentStep === ChatStep.LIVING_SITUATION_INPUT}
            />
          )}
        </Message>

        <Message id={ChatStep.CURRENT_INSURANCE_QUESTION}>
          {({ appear }) => (
            <ChatMessage
              appear={appear}
              onTyped={() => goToStep(ChatStep.CURRENT_INSURANCE_INPUT)}
            >
              {livingSituation.numberOfPeople > 1
                ? 'Trevligt! Hoppas ni trivs. Har du någon hemförsäkring redan?'
                : 'Trevligt! Hoppas du trivs. Har du någon hemförsäkring redan?'}
            </ChatMessage>
          )}
        </Message>

        <Message id={ChatStep.CURRENT_INSURANCE_INPUT} delay={300}>
          {({ appear }) => (
            <CurrentInsuranceInput
              appear={appear}
              onSubmit={() => goToStep(ChatStep.SHOW_OFFER)}
            />
          )}
        </Message>

        <Message id={ChatStep.SHOW_OFFER}>{() => 'Visa erbjudande'}</Message>
      </Conversation>
    )}
  </ChatContainer>
)
