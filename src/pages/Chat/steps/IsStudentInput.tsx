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
  isCurrentMessage,
}) => (
  <UserResponse appear={appear}>
    <ChatContainer>
      {(chatState) => (
        <form
          onSubmit={() => {
            if (true) {
              onSubmit()
            }
          }}
        >
          <UserSelectInput
            onChange={chatState.setIsStudent}
            value={chatState.isStudent}
          >
            <option value="" disabled>
              {' '}
            </option>
            <option value="true">Ja</option>
            <option value="false">Nej</option>
          </UserSelectInput>
          <NextButton disabled={false} hidden={!isCurrentMessage} />
        </form>
      )}
    </ChatContainer>
  </UserResponse>
)
