import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import { ChatContainer } from './state'

export const ResetButton = () => (
  <ChatContainer>
    {({ reset }) => (
      <button onClick={reset}>
        <TranslationsConsumer textKey="CHAT_RESET_LABEL">
          {(label) => label}
        </TranslationsConsumer>
      </button>
    )}
  </ChatContainer>
)
