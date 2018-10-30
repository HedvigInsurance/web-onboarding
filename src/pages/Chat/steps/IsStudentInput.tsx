import {
  UserResponse,
  UserSelectInput,
} from 'components/userInput/UserResponse'
import * as React from 'react'
import { NextButton } from '../components/NextButton'
import { ChatContainer } from '../state'
import { Focusable } from './base'

interface IsStudentInputProps {
  appear?: boolean
  onSubmit?: () => void
  isCurrentMessage?: boolean
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
          >
            <option value="" disabled>
              {' '}
            </option>
            <option value="true">Ja</option>
            <option value="false">Nej</option>
          </UserSelectInput>
          <NextButton
            disabled={chatState.isStudent === ''}
            hidden={!isCurrentMessage || chatState.isStudent === ''}
          />
        </form>
      )}
    </ChatContainer>
  </UserResponse>
)
