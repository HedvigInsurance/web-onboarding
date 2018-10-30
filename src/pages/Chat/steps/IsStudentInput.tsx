import { FadeIn } from 'components/animations/appearings'
import {
  InputValidationError,
  UserResponse,
  UserSelectInput,
} from 'components/userInput/UserResponse'
import * as React from 'react'
import { qualifiesForStudentInsurance } from 'utils/insuranceDomainUtils'
import { NextButton } from '../components/NextButton'
import { ChatContainer, State as ChatState } from '../state'
import { Focusable } from './base'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'

interface IsStudentInputProps {
  appear?: boolean
  onSubmit?: () => void
  isCurrentMessage?: boolean
}

const isInvalidStudentInput = (chatState: ChatState) =>
  !qualifiesForStudentInsurance({
    squareMeters: Number(chatState.livingSituation.size),
    age: Number(chatState.nameAge.age),
    numberOfPeople: chatState.livingSituation.numberOfPeople,
  }) && chatState.isStudent === 'true'

export const isIsStudentInputDone = (chatState: ChatState) => {
  const isQualified = qualifiesForStudentInsurance({
    numberOfPeople: chatState.livingSituation.numberOfPeople,
    age: Number(chatState.nameAge.age),
    squareMeters: Number(chatState.livingSituation.size),
  })
  const hasFilledInStudent =
    chatState.isStudent === 'true' || chatState.isStudent === 'false'

  if (isInvalidStudentInput(chatState)) {
    return false
  }
  if (!isQualified) {
    return true
  }

  return hasFilledInStudent
}

export const IsStudentInput: React.SFC<IsStudentInputProps & Focusable> = ({
  appear,
  onSubmit = () => {
    /* noop */
  },
  onFocus = () => {
    /* noop */
  },
  onBlur = () => {
    /* noop */
  },
  isCurrentMessage,
}) => (
  <UserResponse appear={appear}>
    <ChatContainer>
      {(chatState) => (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (chatState.isStudent !== '' && onSubmit) {
              onSubmit()
            }
          }}
        >
          <UserSelectInput
            onChange={chatState.setIsStudent}
            value={chatState.isStudent}
            onFocus={onFocus}
            onBlur={onBlur}
            hasError={isInvalidStudentInput(chatState)}
          >
            <option value="" disabled>
              {' '}
            </option>
            <option value="true">Ja</option>
            <option value="false">Nej</option>
          </UserSelectInput>
          {isInvalidStudentInput(chatState) && (
            <FadeIn>
              <InputValidationError>
                <TranslationsConsumer textKey="CHAT_INPUT_IS_STUDENT_INVALID">
                  {(t) => t}
                </TranslationsConsumer>
              </InputValidationError>
            </FadeIn>
          )}
          <NextButton
            disabled={chatState.isStudent === ''}
            hidden={!isCurrentMessage || !isIsStudentInputDone(chatState)}
          />
        </form>
      )}
    </ChatContainer>
  </UserResponse>
)
