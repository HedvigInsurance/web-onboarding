import * as React from 'react'
import { ChatConversation } from './ChatConversation'
import { ResetButton } from './ResetButton'

export const Chat: React.SFC = () => (
  <>
    <ResetButton />
    <ChatConversation />
  </>
)
