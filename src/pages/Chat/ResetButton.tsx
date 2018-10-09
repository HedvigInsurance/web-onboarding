import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import { ChatContainer } from './state'

export const ResetButton = () => (
  <ChatContainer>
    {({ reset }) => (
      <TranslationsConsumer textKey="CHAT_RESET_LABEL">
        {(label) => <button onClick={reset}>{label}</button>}
      </TranslationsConsumer>
    )}
  </ChatContainer>
)
