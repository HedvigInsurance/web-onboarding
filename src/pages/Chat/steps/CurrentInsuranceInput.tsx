import {
  UserResponse,
  UserSelectInput,
} from 'components/userInput/UserResponse'
import { always, cond, equals } from 'ramda'
import * as React from 'react'
import { ChatContainer } from '../state'

interface CurrentInsuranceInputProps {
  appear?: boolean
}

export const CurrentInsuranceInput: React.SFC<CurrentInsuranceInputProps> = ({
  appear,
}) => (
  <UserResponse appear={appear}>
    <ChatContainer>
      {(chatState) => (
        <div>
          <UserSelectInput
            onChange={chatState.setHasCurrentInsurance}
            value={cond([
              [equals(undefined), always('select')],
              [equals(false), always('no')],
              [equals(true), always('yes')],
            ])(chatState.currentInsurance.hasCurrentInsurance)}
          >
            <option value="select" disabled />
            <option value="yes">Ja</option>
            <option value="no">Nej</option>
          </UserSelectInput>

          {cond([
            [equals(undefined), always(null)],
            [equals(false), always(null)],
            [equals(true), () => 'it works'],
          ])(chatState.currentInsurance.hasCurrentInsurance)}
        </div>
      )}
    </ChatContainer>
  </UserResponse>
)
