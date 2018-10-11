import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { ChatConversation } from './ChatConversation'
import { ResetButton } from './ResetButton'

export const Chat: React.SFC = () => (
  <>
    <TranslationsConsumer textKey="CHAT_PAGE_TITLE">
      {(title) => <Helmet>{<title>{title}</title>}</Helmet>}
    </TranslationsConsumer>

    <ResetButton />
    <ChatConversation />
  </>
)
