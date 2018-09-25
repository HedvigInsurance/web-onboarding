import * as React from 'react'
import { ChatConversation, chatMessages } from './ChatConversation'

export const Chat: React.SFC = () => (
  <ChatConversation messages={chatMessages()} />
)
