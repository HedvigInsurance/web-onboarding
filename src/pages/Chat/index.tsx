import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { TopBar, TopBarFiller } from '../../components/TopBar'
import { ChatConversation } from './ChatConversation'
import { LoadingScreen } from './components/LoadingScreen'
import {
  ChatScreenContainer,
  LoadingState,
} from './containers/ChatScreenContainer'
import { ResetButton } from './ResetButton'
import { Redirect } from 'react-router-dom'

export const Chat: React.SFC = () => (
  <>
    <TranslationsConsumer textKey="CHAT_PAGE_TITLE">
      {(title) => <Helmet>{<title>{title}</title>}</Helmet>}
    </TranslationsConsumer>

    <TopBar progress={0} showButton={false} />
    <TopBarFiller />
    <ResetButton />
    <ChatConversation />
    <ChatScreenContainer>
      {(state) => {
        if (
          state.offerCreationDebounceState === LoadingState.LOADING ||
          state.offerCreationLoadingState === LoadingState.LOADING
        ) {
          return <LoadingScreen />
        }

        if (
          state.offerCreationDebounceState === LoadingState.COMPLETED &&
          state.offerCreationLoadingState === LoadingState.COMPLETED
        ) {
          return <Redirect to="/offer" />
        }

        return null
      }}
    </ChatScreenContainer>
  </>
)
