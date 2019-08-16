import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as queryString from 'querystring'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import { LanguageSwitcher } from '../../components/LanguageSwitcher'
import { TopBar, TopBarFiller } from '../../components/TopBar'
import { CurrentLanguage } from '../../components/utils/CurrentLanguage'
import { StorageContainer } from '../../utils/StorageContainer'
import { ChatConversation } from './ChatConversation'
import { OfferCreationHandler } from './components/OfferCreationHandler'
import { ResetButton } from './ResetButton'
import { initialState, Insurer } from './state'

export const Chat: React.ComponentType = withRouter(({ location }) => {
  const query = queryString.parse(location.search.replace(/^\?/, ''))
  if (query.firstName || query.lastName || query.code || query.initialInsurer) {
    return (
      <StorageContainer>
        {({ session }) => {
          session.setSession({
            chat: initialState({
              initialFirstName: query.firstName as string,
              initialLastName: query.lastName as string,
              initialInsurer: (query.initialInsurer as string) as Insurer,
            }),
            code: query.code as string,
          })

          return (
            <CurrentLanguage>
              {({ currentLanguage }) => (
                <Redirect
                  to={`/${currentLanguage &&
                    currentLanguage + '/'}new-member/hedvig`}
                />
              )}
            </CurrentLanguage>
          )
        }}
      </StorageContainer>
    )
  }

  return (
    <>
      <TranslationsConsumer textKey="CHAT_PAGE_TITLE">
        {(title) => <Helmet>{<title>{title}</title>}</Helmet>}
      </TranslationsConsumer>

      <TopBar
        progress={0}
        button={
          <>
            <LanguageSwitcher />
            <ResetButton />
          </>
        }
      />
      <TopBarFiller />
      <ChatConversation />
      <OfferCreationHandler />
    </>
  )
})
